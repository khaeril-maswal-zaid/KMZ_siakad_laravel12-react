<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDosenUserRequest;
use App\Http\Requests\UpdateDosenUserRequest;
use App\Models\DosenUser;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class DosenUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = [
            //'route' => Auth::user()->role
        ];

        return Inertia::render('dosen/index', $data);
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
    public function store(StoreDosenUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DosenUser $dosen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DosenUser $dosen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDosenUserRequest $request, DosenUser $dosen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DosenUser $dosen)
    {
        //
    }
}
