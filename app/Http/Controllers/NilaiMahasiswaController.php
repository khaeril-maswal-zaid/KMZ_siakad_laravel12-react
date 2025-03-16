<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class NilaiMahasiswaController extends Controller
{
    public function create()
    {
        return Inertia::render('dosen/nilaiMahasiswa');
    }
}
