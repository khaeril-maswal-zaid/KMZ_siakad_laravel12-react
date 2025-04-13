<?php

namespace App\Http\Controllers;

use App\Models\MahasiswaUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class MahaiswaUserController extends Controller
{

    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari Admin yang sedang Login
        $prodiIdAdminLogin = $user->adminProdi->program_studi_id;
        $query = MahasiswaUser::with('user:id,name,email')
            ->select(['nim', 'angkatan', 'kelas', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'no_hp', 'user_id'])
            ->where(function ($query) use ($request) {
                $query->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'LIKE', "%{$request->abboya}%");
                })
                    ->orWhere('nik', 'LIKE', "%{$request->abboya}%")
                    ->orWhere('nim', 'LIKE', "%{$request->abboya}%");
            });


        $query->where('program_studi_id', $prodiIdAdminLogin);

        // Hanya tambahkan filter angkatan jika parameter tersebut ada
        if ($request->has('angkatan')) {
            $query->where('angkatan', $request->angkatan);
        }

        $data = [
            'mahasiswas' => $query->orderBy('nim', 'asc')->paginate(15)
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
