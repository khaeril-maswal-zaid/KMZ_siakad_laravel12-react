<?php

namespace App\Http\Controllers;

use App\Models\ProgramAngkatan;
use App\Http\Requests\StoreProgramAngkatanRequest;
use App\Http\Requests\UpdateProgramAngkatanRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProgramAngkatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($angkatan = null)
    {
        if ($angkatan === null) {
            $angkatan = date('Y'); // Set default jika tidak ada parameter
        }

        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $programAngkatan =   ProgramAngkatan::select(['id', 'angkatan', 'mata_kuliah_id', 'semester'])
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('angkatan', $angkatan)
            ->with([
                'mataKuliah:id,nama_matkul,kode_matkul,sks'
            ]);

        $data = [
            'prolan' => ProgramAngkatan::select(['angkatan'])
                ->where('program_studi_id', $prodiFromAdmin)
                ->orderBy('angkatan', 'desc')
                ->limit(7)
                ->distinct()
                ->get(),

            'details' =>  $programAngkatan->get(),

            'totalSks' => $programAngkatan
                ->get()
                ->sum(fn($item) => $item->mataKuliah->sks ?? 0),

            'jumlahMatkul' =>  $programAngkatan->count(),
            'angkatan' => $angkatan
        ];

        return Inertia::render('prodi/programangkatan', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramAngkatanRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProgramAngkatan $programAngkatan)
    {
        //
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramAngkatan $programAngkatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramAngkatanRequest $request, ProgramAngkatan $programAngkatan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramAngkatan $programAngkatan)
    {
        //
    }
}
