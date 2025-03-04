<?php

namespace App\Http\Controllers;

use App\Models\JadwalMatkul;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JadwalMatkulController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function index()
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $programStudiId = $user->adminProdi->program_studi_id;

        // Ambil matkul berdasarkan program_studi_id
        $matkul = MataKuliah::select('nama_matkul')->where('program_studi_id', $programStudiId)->get();

        // Ambil jadwal berdasarkan program_studi_id
        $jadwal = JadwalMatkul::where('program_studi_id', $programStudiId)->get();

        return Inertia::render('prodi/jadwalperkuliahan');
    }
}
