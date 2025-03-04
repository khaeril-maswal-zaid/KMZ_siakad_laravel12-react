<?php

namespace App\Http\Controllers;

use App\Models\ProgramAngkatan;
use App\Http\Requests\StoreProgramAngkatanRequest;
use App\Http\Requests\UpdateProgramAngkatanRequest;
use Inertia\Inertia;


class ProgramAngkatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('prodi/programangkatan');
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
