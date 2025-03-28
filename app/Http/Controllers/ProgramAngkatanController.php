<?php

namespace App\Http\Controllers;

use App\Models\ProgramAngkatan;
use App\Http\Requests\StoreProgramAngkatanRequest;
use App\Http\Requests\UpdateProgramAngkatanRequest;
use App\Models\MataKuliah;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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
            ])
            ->orderBy('semester', 'asc');

        $data = [
            'prolan' => ProgramAngkatan::select(['angkatan'])
                ->where('program_studi_id', $prodiFromAdmin)
                ->orderBy('angkatan', 'desc')
                ->limit(10)
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
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        $data = [
            'mataKuliahs' => MataKuliah::select(['id', 'kode_matkul', 'nama_matkul', 'singkatan_matkul', 'sks'])
                ->where('program_studi_id', $prodiFromAdmin)
                ->orderBy('nama_matkul', 'asc')
                ->get()
        ];

        return Inertia::render('prodi/programangkatancreate', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        // Validasi input dari request
        $validated = $request->validate(
            [
                'angkatan'                      => 'required|integer|unique:program_angkatans,angkatan',
                'selectedMatkul'                => 'required|array',
                'selectedMatkul.*.id'           => 'required|integer|exists:mata_kuliahs,id',
                'selectedMatkul.*.semester'     => 'required|integer', // misalnya nilai A, B, dst.
            ],
            [
                'selectedMatkul.*.id.required'       => 'Wajib memilih mata kuliah!',
                'angkatan.required'       => 'Wajib memilih mata angkatan!',
                'angkatan.unique'       => 'Program Akademik Angkatan ' . $request['angkatan'] . ' telah tersediah',
            ]
        );

        foreach ($validated['selectedMatkul'] as $item) {
            ProgramAngkatan::create([
                'program_studi_id' => $prodiFromAdmin,
                'mata_kuliah_id' => $item['id'],
                'semester' => $item['semester'],
                'angkatan' => $validated['angkatan'],
            ],);
        }

        $request->session()->flash('message', "Program akademik berhasil dibuat untuk angkatan " . $validated['angkatan']);
        return redirect()->route('programangkatan.index');
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
