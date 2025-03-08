<?php

namespace App\Http\Controllers;

use App\Models\DosenUser;
use App\Models\JadwalMatkul;
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
    public function index()
    {
        // Ambil jadwal berdasarkan program_studi_id
        $jadwal = JadwalMatkul::where('program_studi_id', $this->prodiFromAdmin)->get();

        return Inertia::render('prodi/jadwalperkuliahan');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $angkatanReq = $request->query('angkatan');
        $semesterReq = $request->query('semester');

        $data = [
            // Ambil matkul & dosen berdasarkan program_studi_id
            'fakultasProdi' => ProgramStudi::select(['fakultas_id', 'nama_prodi'])
                ->with('fakultas:id,nama_fakultas')
                ->where('id', $this->prodiFromAdmin)
                ->first(),

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

        return Inertia::render('prodi/jadwalperkuliahanadd', $data);
    }
}
