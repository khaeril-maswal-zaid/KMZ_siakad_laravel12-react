<?php

namespace App\Http\Controllers;

use App\Models\KeuanganUser;
use App\Http\Requests\StoreKeuanganUserRequest;
use App\Http\Requests\UpdateKeuanganUserRequest;
use Inertia\Inertia;
use Inertia\Response;

class KeuanganUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('prodi/index');
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
    public function store(StoreKeuanganUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KeuanganUser $keuangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KeuanganUser $keuangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKeuanganUserRequest $request, KeuanganUser $keuangan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KeuanganUser $keuangan)
    {
        //
    }
}
