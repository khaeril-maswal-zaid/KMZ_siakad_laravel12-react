<?php

namespace App\Http\Controllers;

use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MataKuliahController extends Controller
{
    public function index()
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $data = [
            'mataKuliahs' => MataKuliah::select(['id', 'kode_matkul', 'nama_matkul', 'singkatan_matkul', 'sks'])
                ->where('program_studi_id', $prodiFromAdmin)
                ->get()
        ];
        return Inertia::render('prodi/matakuliah', $data);
    }
}
