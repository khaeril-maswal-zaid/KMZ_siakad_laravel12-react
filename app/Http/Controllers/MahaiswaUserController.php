<?php

namespace App\Http\Controllers;

use App\Models\MahasiswaUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class MahaiswaUserController extends Controller
{

    public function index()
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari Admin yang sedang Login
        $prodiIdAdminLogin = $user->adminProdi->program_studi_id;

        $data = [
            'mahasiswas' => MahasiswaUser::select(['nim', 'kelas', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'no_hp'])->where('program_studi_id', $prodiIdAdminLogin)->get(),
        ];

        return Inertia::render('prodi/mahasiswa', $data);
    }


    /**
     * Display a listing of the resource.
     */
    public function show(): Response
    {
        return Inertia::render('mahasiswa/index');
    }
}
