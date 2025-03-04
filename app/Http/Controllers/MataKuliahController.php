<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MataKuliahController extends Controller
{
    public function index()
    {
        return Inertia::render('prodi/matakuliah');
    }
}
