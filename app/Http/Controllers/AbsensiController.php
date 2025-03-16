<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\MahasiswaUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AbsensiController extends Controller
{
    public function create(Request $request)
    {
        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $prodiFromAdmin = $user->dosen->program_studi_id;

        $data = [
            'mahasiswas' => MahasiswaUser::select('id', 'user_id', 'nim')
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $request->angkatan)
                ->where('kelas', $request->kelas)
                ->get()
        ];
        return Inertia::render('dosen/absensiPerkuliahan', $data);
    }

    function store(Request $request)
    {
        $validated = $request->validate([
            'jadwal_matkuls_id' => 'required|exists:jadwal_matkuls,id',
            'absensi' => 'required|array',
            'absensi.*.id' => 'required|exists:mahasiswa_users,id', // Sesuaikan dengan tabel mahasiswa
            'absensi.*.pertemuan' => 'required|array',
        ]);

        foreach ($validated['absensi'] as $absen) {
            $mahasiswa_id = $absen['id'];

            foreach ($absen['pertemuan'] as $pertemuan => $keterangan) {
                Absensi::updateOrCreate(
                    [
                        'jadwal_matkuls_id' => $validated['jadwal_matkuls_id'],
                        'mahasiswa_user_id' => $absen['id'],
                        'pertemuan' => $pertemuan,
                    ],
                    [
                        'keterangan' => $keterangan
                    ]
                );
            }
        }
    }
}
