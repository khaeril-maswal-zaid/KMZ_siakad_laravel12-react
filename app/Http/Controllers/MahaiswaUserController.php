<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MahaiswaUserController extends Controller
{

    public function index()
    {
        return Inertia::render('prodi/mahasiswa');
    }


    /**
     * Display a listing of the resource.
     */
    public function show(): Response
    {
        return Inertia::render('mahasiswa/index');
    }
}
