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
                ->orderBy('kode_matkul', 'asc')
                ->get()
        ];
        return Inertia::render('prodi/matakuliah', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode'  => 'required|unique:mata_kuliahs,kode_matkul',
            'nama' => 'required',
            'singkatan' => 'required',
            'sks' => 'required|numeric',
        ], [
            'kode.unique' => "Kode mata kuliah telah digunakan sebelumnya"
        ]);

        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        MataKuliah::create([
            'program_studi_id' => $prodiFromAdmin,
            'kode_matkul' => $validated['kode'],
            'nama_matkul' => $validated['nama'],
            'singkatan_matkul' => $validated['singkatan'],
            'sks' => $validated['sks'],
        ]);

        $request->session()->flash('message', 'Entri mata kuliah baru berhasil !');
        return redirect()->route('matakuliah.index');
    }
}
