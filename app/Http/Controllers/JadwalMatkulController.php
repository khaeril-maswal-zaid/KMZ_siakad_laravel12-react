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
    protected $prodiFromAdmin;

    public function __construct()
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $this->prodiFromAdmin = $user->adminProdi->program_studi_id;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function index(Request $request)
    {
        $angkatanReq = $request->query('angkatan');
        $semesterReq = $request->query('semester');

        $data = [
            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $this->prodiFromAdmin)
                ->first(),

            'tahunAjaran' => Konfigurasi::select(['tahun_ajar', 'semester'])->first(),

            'dosens' => DosenUser::select(['user_id', 'nidn'])
                ->with('user:id,name')
                ->where('program_studi_id', $this->prodiFromAdmin)
                ->get(),

            'resulstApiMatkuls' => ProgramAngkatan::select('mata_kuliah_id')
                ->with('mataKuliah:id,sks,nama_matkul')
                ->where('program_studi_id', $this->prodiFromAdmin)
                ->where('angkatan', $angkatanReq)
                ->where('semester', $semesterReq)
                ->get(),
        ];

        return Inertia::render('prodi/jadwalperkuliahan', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $semesterReq = $request->query('semester');

        $matkulProgram = ProgramAngkatan::select(['id', 'mata_kuliah_id'])
            ->with('mataKuliah:id,sks,nama_matkul')
            ->where('program_studi_id', $this->prodiFromAdmin)
            ->where('semester', $semesterReq);

        // Ambil tahun terbaru
        $tahunTerbaru = $matkulProgram->max('angkatan');

        $data = [
            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $this->prodiFromAdmin)
                ->first(),

            'tahunAjaran' => Konfigurasi::select(['tahun_ajar', 'semester'])->first(),

            'dosens' => DosenUser::select(['id', 'user_id', 'nidn'])
                ->with('user:id,name')
                ->where('program_studi_id', $this->prodiFromAdmin)
                ->get(),

            'resultApiMatkuls' =>  $matkulProgram->where('angkatan', $tahunTerbaru)->get(),
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
}
