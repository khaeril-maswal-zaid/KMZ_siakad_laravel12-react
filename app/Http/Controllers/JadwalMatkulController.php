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
    private $tahunAjaran;

    public function __construct()
    {
        $tahunAjaran = Konfigurasi::select(['tahun_ajar'])->first();
        $this->tahunAjaran = $tahunAjaran->tahun_ajar;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function index(Request $request)
    {
        $request->session()->forget(['redAngkatan']);

        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $data = [
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

        //--------------------------------------------------------------------------------
        $semester = $request->query('semester');

        list($tahunAwal, $tahunAkhir) = explode('/', $this->tahunAjaran);
        $tahunAwal = (int)$tahunAwal;

        $angkatan = ($semester <= 2) ? $tahunAwal : $tahunAwal - ceil(($semester - 2) / 2);
        $request->session()->put('redAngkatan', $angkatan);
        //-----------------------------------------------------------------------------

        $data = [
            'angkatan' =>  $angkatan,
            'dosens' => DosenUser::select(['id', 'user_id', 'nidn'])
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->get(),

            'resultApiMatkuls' =>  ProgramAngkatan::select(['id', 'mata_kuliah_id'])
                ->with('mataKuliah:id,sks,nama_matkul')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan',  $angkatan)
                ->where('semester', $request->query('semester'))
                ->get(),


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
                ->where('tahun_ajaran', $this->tahunAjaran)
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

            // Validasi kombinasi unik
            'schedules.*' => [
                function ($attribute, $value, $fail) {
                    $exists = JadwalMatkul::where('program_angkatan_id', $value['program_angkatan_id'])
                        ->where('tahun_ajaran', $this->tahunAjaran)
                        ->where('kelas', $value['kelas'])
                        ->exists();

                    if ($exists) {
                        $fail("Jadwal dengan program angkatan {$value['program_angkatan_id']}, tahun ajaran {$this->tahunAjaran}, dan kelas {$value['kelas']} sudah ada.");
                    }
                }
            ]
        ], [
            'schedules.*.dosen.required'       => 'Wajib menentukan dosen !',
            'schedules.*.hari.required'       => 'Wajib memilih hari !',
            'schedules.*.waktu.required'       => 'Waktu mengajar wajib diisi !',
            'schedules.*.ruangan.required'       => 'Ruangan  mengajar wajib diisi !',
            'schedules.*.kelas.required'       => 'Wajib menentukan kelas !',
        ]);

        foreach ($validatedData['schedules'] as $schedule) {
            JadwalMatkul::create([
                'dosen_user_id' => $schedule['dosen'],
                'program_angkatan_id' => $schedule['program_angkatan_id'],
                'hari' => $schedule['hari'],
                'waktu' => $schedule['waktu'],
                'ruangan' => $schedule['ruangan'],
                'kelas' => $schedule['kelas'],
                'tahun_ajaran' => $this->tahunAjaran,
            ]);
        }

        $request->session()->flash('message', 'Entri jadwal perkuliahan berhasil !');
        return redirect()->route('jadwalperkuliahan.index', "angkatan=" . $request->session()->get('redAngkatan') . "&kelas=" . $schedule['kelas']);
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
        ], [
            'schedules.*.dosen.required'       => 'Wajib menentukan dosen saat update !',
            'schedules.*.hari.required'       => 'Wajib memilih hari !',
            'schedules.*.waktu.required'       => 'Waktu mengajar wajib diisi !',
            'schedules.*.ruangan.required'       => 'Ruangan  mengajar wajib diisi !',
            'schedules.*.kelas.required'       => 'Wajib menentukan kelas !',
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

    public function mengajar(Request $request)
    {
        $request->session()->forget(['paramNilaiSession', 'paramAbsensiSession']);

        $data = [
            'jadwalMengajar' => JadwalMatkul::select(['id', 'program_angkatan_id', 'hari', 'waktu', 'ruangan', 'kelas'])
                ->with([
                    'programAngkatan:id,mata_kuliah_id,angkatan',
                    'programAngkatan.mataKuliah:id,nama_matkul,sks',
                ])
                ->where('dosen_user_id', Auth::user()->dosen->id)
                ->where('tahun_ajaran', $this->tahunAjaran)
                ->get(),
        ];

        return Inertia::render('dosen/jadwalMengajar', $data);
    }


    public function berlansung($key)
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $tahunAjaran = Konfigurasi::select(['tahun_ajar'])->first()->tahun_ajar;

        $data = [
            'berlansung' => JadwalMatkul::select(['dosen_user_id', 'program_angkatan_id', 'kelas', 'id'])
                ->whereHas('programAngkatan', function ($query) use ($prodiFromAdmin) {
                    $query->where('program_studi_id', $prodiFromAdmin);
                })
                ->where('tahun_ajaran', $tahunAjaran)
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id,semester,angkatan',
                    'programAngkatan.mataKuliah:id,nama_matkul,sks',
                ])
                ->get(),
            'key' => $key //untuk control button
        ];

        return Inertia::render('prodi/dataNilai', $data);
    }
}
