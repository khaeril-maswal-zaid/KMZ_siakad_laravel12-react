<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
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

        // Query data mahasiswa
        $mahasiswas = MahasiswaUser::select('id', 'user_id', 'nim')
            ->with('user:id,name')
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('angkatan', $paramNilaiSession['angkatan'])
            ->where('kelas', $paramNilaiSession['kelas'])
            ->orderBy('nim', 'asc')
            ->get();

        // Query data nilai final (misalnya huruf: A, B, C, dst)
        $nilaiSaved = NilaiMahasiswa::select('mahasiswa_user_id', 'nilai')
            ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
            ->get();

        // Query data absensi
        $absensis = Absensi::select('mahasiswa_user_id', 'keterangan', 'jadwal_matkuls_id')
            ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
            ->get();

        // Buat mapping nilai: key = mahasiswa_user_id, value = nilai (huruf)
        $nilaiMap = [];
        foreach ($nilaiSaved as $nilai) {
            $nilaiMap[$nilai->mahasiswa_user_id] = $nilai->nilai;
        }

        // Hitung rekap absensi per mahasiswa, hanya menghitung jika keterangan ada (null tidak dihitung)
        $rekapAbsensi = $absensis->groupBy('mahasiswa_user_id')->map(function ($absensiGroup) {
            return [
                'H' => $absensiGroup->where('keterangan', 'H')->count(),
                'I' => $absensiGroup->where('keterangan', 'I')->count(),
                'S' => $absensiGroup->where('keterangan', 'S')->count(),
                'A' => $absensiGroup->where('keterangan', 'A')->count(),
            ];
        });

        // Gabungkan nilai dan rekap absensi ke masing-masing mahasiswa
        $dataNilai = $mahasiswas->map(function ($mhs) use ($nilaiMap, $rekapAbsensi) {
            // Ambil nilai final, jika tidak ada set kosong
            $nilai = $nilaiMap[$mhs->id] ?? '';
            // Ambil rekap absensi untuk mahasiswa, default jika belum ada
            $rekap = $rekapAbsensi->get($mhs->id, [
                'H' => 0,
                'S' => 0,
                'I' => 0,
                'A' => 0,
            ]);

            $mhs->nilai = $nilai;
            $mhs->rekap_absensi = $rekap;
            return $mhs;
        });

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


            'paramNilaiSession' => $paramNilaiSession,

            'dataNilai' => $dataNilai
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

        switch (Auth::user()->role) {
            case 'dosen':
                $prodiFromAdmin = Auth::user()->dosen->program_studi_id;
                break;

            case 'prodi':
                $prodiFromAdmin = Auth::user()->adminProdi->program_studi_id;
                break;
        }

        // Query data mahasiswa
        $mahasiswas = MahasiswaUser::select('id', 'user_id', 'nim')
            ->with('user:id,name')
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('angkatan', $paramNilaiSession['angkatan'])
            ->where('kelas', $paramNilaiSession['kelas'])
            ->orderBy('nim', 'asc')
            ->get();

        // Query data nilai final (misalnya huruf: A, B, C, dst)
        $nilaiSaved = NilaiMahasiswa::select('mahasiswa_user_id', 'nilai')
            ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
            ->get();

        // Query data absensi
        $absensis = Absensi::select('mahasiswa_user_id', 'keterangan', 'jadwal_matkuls_id')
            ->where('jadwal_matkuls_id', $paramNilaiSession['idJadwal'])
            ->get();

        // Buat mapping nilai: key = mahasiswa_user_id, value = nilai (huruf)
        $nilaiMap = [];
        foreach ($nilaiSaved as $nilai) {
            $nilaiMap[$nilai->mahasiswa_user_id] = $nilai->nilai;
        }

        // Hitung rekap absensi per mahasiswa, hanya menghitung jika keterangan ada (null tidak dihitung)
        $rekapAbsensi = $absensis->groupBy('mahasiswa_user_id')->map(function ($absensiGroup) {
            return [
                'H' => $absensiGroup->where('keterangan', 'H')->count(),
                'I' => $absensiGroup->where('keterangan', 'I')->count(),
                'S' => $absensiGroup->where('keterangan', 'S')->count(),
                'A' => $absensiGroup->where('keterangan', 'A')->count(),
            ];
        });

        // Gabungkan nilai dan rekap absensi ke masing-masing mahasiswa
        $dataNilai = $mahasiswas->map(function ($mhs) use ($nilaiMap, $rekapAbsensi) {
            // Ambil nilai final, jika tidak ada set kosong
            $nilai = $nilaiMap[$mhs->id] ?? '';
            // Ambil rekap absensi untuk mahasiswa, default jika belum ada
            $rekap = $rekapAbsensi->get($mhs->id, [
                'H' => 0,
                'S' => 0,
                'I' => 0,
                'A' => 0,
            ]);

            $mhs->nilai = $nilai;
            $mhs->rekap_absensi = $rekap;
            return $mhs;
        });

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


            'paramNilaiSession' => $paramNilaiSession,

            'dataNilai' => $dataNilai
        ];

        return Inertia::render('dosen/nilaiMahasiswaAdd', $data);
    }


    public function store(Request $request)
    {
        // dd($request->all());

        // Validasi input dari request
        $validated = $request->validate([
            'jadwal_matkuls_id'         => 'required|integer|exists:jadwal_matkuls,id',
            'dataNilai'                     => 'required|array',
            'dataNilai.*.mahasiswa_user_id' => 'required|integer|exists:users,id',
            'dataNilai.*.nilai'             => 'required|string|max:1', // misalnya nilai A, B, dst.
        ], [
            'dataNilai.*.nilai.required'       => 'Wajib mengisikan nilai mahasiswa !'
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


        foreach ($validated['dataNilai'] as $item) {
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
