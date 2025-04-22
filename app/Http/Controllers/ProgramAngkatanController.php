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

        $show =   ProgramAngkatan::select(['id', 'angkatan', 'mata_kuliah_id', 'semester'])
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('angkatan', $angkatan)
            ->with([
                'mataKuliah:id,nama_matkul,kode_matkul,sks'
            ])
            ->orderBy('semester', 'asc');

        // 1) Ambil data Eloquent
        $programAngkatan = ProgramAngkatan::select(['id', 'angkatan', 'mata_kuliah_id'])
            ->where('program_studi_id', $prodiFromAdmin) // <- sesuaikan dengan variable
            ->orderBy('angkatan', 'desc')
            ->with([
                'mataKuliah:id,sks' // minimal kita butuh kolom 'sks'
            ])
            ->get();

        // 2) Kelompokkan berdasarkan 'angkatan'
        $grouped = $programAngkatan->groupBy('angkatan')->map(function ($items, $angkatan) {
            return [
                'angkatan'      => $angkatan,
                'jumlahMatkul' => $items->count(),
                'totalSks'     => $items->sum(function ($item) {
                    return $item->mataKuliah->sks;
                }),
            ];
        });

        $data = [
            'prolan' => $grouped->values(),

            'details' =>  $show->get(),

            'totalSks' => $show
                ->get()
                ->sum(fn($item) => $item->mataKuliah->sks ?? 0),

            'jumlahMatkul' =>  $show->count(),
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
    public function store(StoreProgramAngkatanRequest $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->adminProdi->program_studi_id;

        foreach ($request['selectedMatkul'] as $item) {
            ProgramAngkatan::create([
                'program_studi_id' => $prodiFromAdmin,
                'mata_kuliah_id' => $item['id'],
                'semester' => $item['semester'],
                'angkatan' => $request['angkatan'],
            ],);
        }

        $request->session()->flash('message', "Program akademik berhasil dibuat untuk angkatan " . $request['angkatan']);
        return redirect()->route('programangkatan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $program = ProgramAngkatan::select(['id', 'semester', 'mata_kuliah_id'])
            ->where('program_studi_id', Auth::user()->mahasiswa->program_studi_id)
            ->where('angkatan', Auth::user()->mahasiswa->angkatan)
            ->with([
                'mataKuliah:id,sks,kode_matkul,nama_matkul'
            ])
            ->orderBy('semester', 'asc')
            ->get();

        return Inertia::render('mahasiswa/program', ['program' => $program]);
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
