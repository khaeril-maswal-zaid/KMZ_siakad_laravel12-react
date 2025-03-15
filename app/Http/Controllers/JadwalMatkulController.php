<?php

namespace App\Http\Controllers;

use App\Models\DosenUser;
use App\Models\JadwalMatkul;
use App\Models\Konfigurasi;
use App\Models\ProgramAngkatan;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalMatkulController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $data = [
            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $prodiFromAdmin)
                ->first(),

            'tahunAjaran' => Konfigurasi::select(['tahun_ajar', 'semester'])->first(),

            'resulstApiJadwal' => JadwalMatkul::select(['program_angkatan_id', 'dosen_user_id', 'hari', 'waktu', 'ruangan', 'kelas'])
                ->whereHas('programAngkatan', function ($query) use ($request, $prodiFromAdmin) {
                    $query->where('program_studi_id', $prodiFromAdmin)->where('angkatan', $request->angkatan);
                })
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id', // formalitas
                ])
                ->where('kelas', $request->kelas)
                ->get(),

            'programAngkatan' => ProgramAngkatan::select(['id', 'mata_kuliah_id', 'semester'])
                ->with('mataKuliah:id,nama_matkul,sks')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $request->angkatan)
                ->orderBy('semester', 'asc')
                ->get()
        ];

        return Inertia::render('prodi/jadwalperkuliahan', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $matkulProgram = ProgramAngkatan::select(['id', 'mata_kuliah_id'])
            ->with('mataKuliah:id,sks,nama_matkul')
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('semester', $request->query('semester'));

        // Ambil tahun terbaru
        $tahunTerbaru = $matkulProgram->max('angkatan');

        $data = [
            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $prodiFromAdmin)
                ->first(),

            'tahunAjaran' => Konfigurasi::select(['tahun_ajar', 'semester'])->first(),

            'dosens' => DosenUser::select(['id', 'user_id', 'nidn'])
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->get(),

            'resultApiMatkuls' =>  $matkulProgram->where('angkatan', $tahunTerbaru)->get(),

            'resultApijadwalMatkul' => JadwalMatkul::select(['id', 'program_angkatan_id', 'dosen_user_id', 'hari', 'waktu', 'ruangan', 'kelas'])
                ->whereHas('programAngkatan', function ($query) use ($request, $prodiFromAdmin) {
                    $query->where('program_studi_id', $prodiFromAdmin)->where('semester', $request->query('semester'));
                })
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('tahun_ajaran', $request->tahunAjaran)
                ->where('kelas', $request->kelas)
                ->get(),
        ];

        return Inertia::render('prodi/jadwalperkuliahanadd', $data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'schedules' => 'required|array',
            'schedules.*.dosen' => 'required|integer|exists:dosen_users,id',
            'schedules.*.program_angkatan_id' => 'required|integer|exists:program_angkatans,id',
            'schedules.*.hari' => 'required|string',
            'schedules.*.waktu' => 'required|string',
            'schedules.*.ruangan' => 'required|string',
            'schedules.*.kelas' => 'required|string',
            'schedules.*.tahun_ajaran' => 'required|string',

            // Validasi kombinasi unik
            'schedules.*' => [
                function ($attribute, $value, $fail) {
                    $exists = JadwalMatkul::where('program_angkatan_id', $value['program_angkatan_id'])
                        ->where('tahun_ajaran', $value['tahun_ajaran'])
                        ->where('kelas', $value['kelas'])
                        ->exists();

                    if ($exists) {
                        $fail("Jadwal dengan program angkatan {$value['program_angkatan_id']}, tahun ajaran {$value['tahun_ajaran']}, dan kelas {$value['kelas']} sudah ada.");
                    }
                }
            ]
        ]);

        foreach ($validatedData['schedules'] as $schedule) {
            JadwalMatkul::create([
                'dosen_user_id' => $schedule['dosen'],
                'program_angkatan_id' => $schedule['program_angkatan_id'],
                'hari' => $schedule['hari'],
                'waktu' => $schedule['waktu'],
                'ruangan' => $schedule['ruangan'],
                'kelas' => $schedule['kelas'],
                'tahun_ajaran' => $schedule['tahun_ajaran'],
            ]);
        }

        return to_route('jadwalperkuliahan.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'schedules' => 'required|array',
            'schedules.*.id' => 'required|integer|exists:jadwal_matkuls,id',
            'schedules.*.dosen' => 'required|integer|exists:dosen_users,id',
            'schedules.*.program_angkatan_id' => 'required|integer|exists:program_angkatans,id',
            'schedules.*.hari' => 'required|string',
            'schedules.*.waktu' => 'required|string',
            'schedules.*.ruangan' => 'required|string',
            'schedules.*.kelas' => 'required|string',
            'schedules.*.tahun_ajaran' => 'required|string',
        ]);

        foreach ($validatedData['schedules'] as $schedule) {
            JadwalMatkul::where('id', $schedule['id'])
                ->update([
                    'dosen_user_id' => $schedule['dosen'],
                    'program_angkatan_id' => $schedule['program_angkatan_id'],
                    'hari' => $schedule['hari'],
                    'waktu' => $schedule['waktu'],
                    'ruangan' => $schedule['ruangan'],
                    'kelas' => $schedule['kelas'],
                    'tahun_ajaran' => $schedule['tahun_ajaran'],
                ]);
        }

        return to_route('jadwalperkuliahan.index');
    }

    public function mengajar()
    {
        $tahunAjaran = Konfigurasi::select(['tahun_ajar', 'semester'])->first();

        $data = [
            'jadwalMengajar' => JadwalMatkul::select(['program_angkatan_id', 'hari', 'waktu', 'ruangan', 'kelas'])
                ->with([
                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('dosen_user_id', Auth::user()->dosen->id)
                ->where('tahun_ajaran', $tahunAjaran->tahun_ajar)
                ->get(),
        ];

        return Inertia::render('dosen/jadwalMengajar', $data);
    }
}
