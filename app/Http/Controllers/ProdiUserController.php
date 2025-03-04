<?php

namespace App\Http\Controllers;

use App\Models\ProdiUser;
use App\Http\Requests\StoreProdiUserRequest;
use App\Http\Requests\UpdateProdiUserRequest;
use App\Models\ProgramStudi;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ProdiUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Ambil program_studi_id dari Admin yang sedang Login
        $prodiIdAdminLogin = $user->adminProdi->program_studi_id;

        $data = [
            'namaProdi' => ProgramStudi::select('nama_prodi')->where('id', $prodiIdAdminLogin)->first()->nama_prodi
        ];

        return Inertia::render('prodi/index', $data);
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
    public function store(StoreProdiUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProdiUser $prodi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProdiUser $prodi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProdiUserRequest $request, ProdiUser $prodi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProdiUser $prodi)
    {
        //
    }
}
