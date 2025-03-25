<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\JadwalMatkul;
use App\Models\MahasiswaUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AbsensiController extends Controller
{
    public function paramAbsensiSession(Request $request)
    {
        $request->session()->put('paramAbsensiSession', $request->all());

        return redirect()->route('absensi.index');
    }

    public function index(Request $request)
    {
        // Ambil data dari session
        $paramAbsensiSession = $request->session()->get('paramAbsensiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramAbsensiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        // Ambil user yang sedang login
        switch (Auth::user()->role) {
            case 'dosen':
                $prodiFromAdmin = Auth::user()->dosen->program_studi_id;
                break;

            case 'prodi':
                $prodiFromAdmin = Auth::user()->adminProdi->program_studi_id;
                break;
        }

        $data = [
            'jadwalMatkul' => JadwalMatkul::select('dosen_user_id', 'program_angkatan_id', 'kelas')
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('id', $paramAbsensiSession['idJadwal'])
                ->first(),

            'mahasiswas' => MahasiswaUser::select('id', 'user_id', 'nim')
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $paramAbsensiSession['angkatan'])
                ->where('kelas', $paramAbsensiSession['kelas'])
                ->get(),

            'absensi' => Absensi::select(['pertemuan', 'mahasiswa_user_id', 'keterangan', 'jadwal_matkuls_id'])
                ->where('jadwal_matkuls_id', $paramAbsensiSession['idJadwal'])
                ->get(),

            'paramAbsensiSession' => $paramAbsensiSession
        ];

        return Inertia::render('dosen/absensiPerkuliahan', $data);
    }

    public function create(Request $request)
    {
        // Ambil data dari session
        $paramAbsensiSession = $request->session()->get('paramAbsensiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramAbsensiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        // Ambil user yang sedang login
        $user = Auth::user();

        // Ambil program_studi_id dari relasi adminProdi
        $prodiFromAdmin = $user->dosen->program_studi_id;

        $data = [
            'jadwalMatkul' => JadwalMatkul::select('dosen_user_id', 'program_angkatan_id', 'kelas')
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('id', $paramAbsensiSession['idJadwal'])
                ->first(),

            'mahasiswas' => MahasiswaUser::select('id', 'user_id', 'nim')
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $paramAbsensiSession['angkatan'])
                ->where('kelas', $paramAbsensiSession['kelas'])
                ->get(),

            'absensi' => Absensi::select(['pertemuan', 'mahasiswa_user_id', 'keterangan', 'jadwal_matkuls_id'])
                ->where('jadwal_matkuls_id', $paramAbsensiSession['idJadwal'])
                ->get(),

            'paramAbsensiSession' => $paramAbsensiSession
        ];

        return Inertia::render('dosen/absensiPerkuliahanAdd', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'jadwal_matkuls_id' => 'required|exists:jadwal_matkuls,id',
            'absensi' => 'required|array',
            'absensi.*.id' => 'required|exists:mahasiswa_users,id', // Sesuaikan dengan tabel mahasiswa
            'absensi.*.pertemuan' => 'required|array',
        ]);

        // Ambil data dari session
        $paramAbsensiSession = $request->session()->get('paramAbsensiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramAbsensiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        if ($paramAbsensiSession['idJadwal'] != $validated['jadwal_matkuls_id']) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        foreach ($validated['absensi'] as $absen) {
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

        $request->session()->flash('message', 'Entri absensi mahasiswa berhasil !');
        return redirect()->route('absensi.index');
    }
}
