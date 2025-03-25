<?php

namespace App\Http\Controllers;

use App\Models\JadwalMatkul;
use App\Models\Konfigurasi;
use App\Models\MahasiswaUser;
use App\Models\NilaiMahasiswa;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NilaiMahasiswaController extends Controller
{
    public function paramNilaiSession(Request $request)
    {
        $request->session()->put('paramNilaiSession', $request->all());
        return redirect()->route('nilaimahasiswa.index');
    }

    public function index(Request $request)
    {
        // Ambil data dari session
        $paramNilaiSession = $request->session()->get('paramNilaiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramNilaiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

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
                ->where('id', $paramNilaiSession['idJadwal'])
                ->first(),

            'mahasiswas' => MahasiswaUser::select('id', 'user_id', 'nim')
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $paramNilaiSession['angkatan'])
                ->where('kelas', $paramNilaiSession['kelas'])
                ->orderBy('nim', 'asc')
                ->get(),

            'paramNilaiSession' => $paramNilaiSession,

            'nilaiSaved' => NilaiMahasiswa::select('mahasiswa_user_id', 'nilai')
                ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
                ->get()
        ];

        return Inertia::render('dosen/nilaiMahasiswa', $data);
    }

    public function create(Request $request)
    {
        // Ambil data dari session
        $paramNilaiSession = $request->session()->get('paramNilaiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramNilaiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->dosen->program_studi_id;

        $data = [
            'jadwalMatkul' => JadwalMatkul::select('dosen_user_id', 'program_angkatan_id', 'kelas')
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('id', $paramNilaiSession['idJadwal'])
                ->first(),

            'mahasiswas' => MahasiswaUser::select('id', 'user_id', 'nim')
                ->with('user:id,name')
                ->where('program_studi_id', $prodiFromAdmin)
                ->where('angkatan', $paramNilaiSession['angkatan'])
                ->where('kelas', $paramNilaiSession['kelas'])
                ->orderBy('nim', 'asc')
                ->get(),

            'paramNilaiSession' => $paramNilaiSession,

            'nilaiSaved' => NilaiMahasiswa::select('mahasiswa_user_id', 'nilai')
                ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
                ->get()
        ];

        return Inertia::render('dosen/nilaiMahasiswaAdd', $data);
    }

    public function store(Request $request)
    {
        // Validasi input dari request
        $validated = $request->validate([
            'jadwal_matkuls_id'         => 'required|integer|exists:jadwal_matkuls,id',
            'nilai'                     => 'required|array',
            'nilai.*.mahasiswa_user_id' => 'required|integer|exists:users,id',
            'nilai.*.nilai'             => 'required|string|max:1', // misalnya nilai A, B, dst.
        ], [
            'nilai.*.nilai.required'       => 'Wajib mengisikan nilai mahasiswa !'
        ]);

        // Ambil data dari session
        $paramNilaiSession = $request->session()->get('paramNilaiSession');

        // Jika session tidak ada, redirect ke halaman lain
        if (!$paramNilaiSession) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }

        if ($paramNilaiSession['idJadwal'] != $validated['jadwal_matkuls_id']) {
            return redirect()->route('jadwalperkuliahan.mengajar');
        }


        foreach ($validated['nilai'] as $item) {
            NilaiMahasiswa::updateOrCreate(
                [
                    'jadwal_matkuls_id' => $validated['jadwal_matkuls_id'],
                    'mahasiswa_user_id' => $item['mahasiswa_user_id'],
                ],
                [
                    'nilai' => $item['nilai'],
                ]
            );
        }

        $request->session()->flash('message', 'Entri nilai mahasiswa berhasil !');
        return redirect()->route('nilaimahasiswa.index');
    }
}
