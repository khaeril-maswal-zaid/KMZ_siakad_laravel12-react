<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\JadwalMatkul;
use App\Models\Konfigurasi;
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

        //-----------------------------------------
        // Ambil data absensi
        $absensis = Absensi::select(['pertemuan', 'mahasiswa_user_id', 'keterangan', 'jadwal_matkuls_id'])
            ->where('jadwal_matkuls_id', $paramAbsensiSession['idJadwal'])
            ->get();

        // Buat mapping absensi per mahasiswa per pertemuan
        $absensiMap = [];
        foreach ($absensis as $absensi) {
            // Gunakan key dengan format "mahasiswa_user_id-pertemuan"
            $key = $absensi->mahasiswa_user_id . '-' . $absensi->pertemuan;
            $absensiMap[$key] = $absensi->keterangan;
        }

        // Hitung rekap absensi per mahasiswa
        $rekapAbsensi = $absensis->groupBy('mahasiswa_user_id')->map(function ($absensiMahasiswa) {
            return [
                'H' => $absensiMahasiswa->where('keterangan', 'H')->count(),
                'I' => $absensiMahasiswa->where('keterangan', 'I')->count(),
                'S' => $absensiMahasiswa->where('keterangan', 'S')->count(),
                'A' => $absensiMahasiswa->where('keterangan', 'A')->count(),
            ];
        });

        // Ambil data mahasiswa (misalnya sudah include relasi user)
        $mahasiswas = MahasiswaUser::select('id', 'user_id', 'nim')
            ->with('user:id,name')
            ->where('program_studi_id', $prodiFromAdmin)
            ->where('angkatan', $paramAbsensiSession['angkatan'])
            ->where('kelas', $paramAbsensiSession['kelas'])
            ->orderBy('nim', 'asc')
            ->get();

        // Gabungkan data absensi (per pertemuan) dan rekap ke masing-masing mahasiswa
        $dataAbsensi = $mahasiswas->map(function ($mhs) use ($absensiMap, $rekapAbsensi) {
            // Siapkan array untuk absensi per pertemuan (misalnya untuk 16 pertemuan)
            $absensiPertemuan = [];
            for ($i = 1; $i <= 16; $i++) {
                $key = $mhs->user_id . '-' . $i;
                // Jika tidak ada data, anggap kosong atau sesuai aturan
                $absensiPertemuan[$i] = isset($absensiMap[$key]) ? $absensiMap[$key] : '';
            }
            // Ambil rekap; jika tidak ada, set default 0
            $rekap = $rekapAbsensi->get($mhs->user_id, [
                'H' => 0,
                'I' => 0,
                'S' => 0,
                'A' => 0,
            ]);

            // Gabungkan hasilnya ke object mahasiswa
            $mhs->absensi = $absensiPertemuan;
            $mhs->rekap_absensi = $rekap;
            return $mhs;
        });


        $data = [
            'jadwalMatkul' => JadwalMatkul::select('dosen_user_id', 'tahun_ajaran', 'program_angkatan_id', 'kelas')
                ->with([
                    'dosen:id,user_id,nidn', // Pastikan 'user_id' ikut diambil agar bisa dipakai di relasi berikutnya
                    'dosen.user:id,name', // Ambil 'name' dari tabel users

                    'programAngkatan:id,mata_kuliah_id',
                    'programAngkatan.mataKuliah:id,nama_matkul',
                ])
                ->where('id', $paramAbsensiSession['idJadwal'])
                ->first(),

            'dataAbsensi' => $dataAbsensi,
            'paramAbsensiSession' => $paramAbsensiSession,
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
            'jadwalMatkul' => JadwalMatkul::select('dosen_user_id', 'tahun_ajaran', 'program_angkatan_id', 'kelas')
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
                ->orderBy('nim', 'asc')
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
                        'keterangan' => $keterangan,
                        'created_by' => Auth::user()->dosen->id
                    ]
                );
            }
        }

        $request->session()->flash('message', 'Entri absensi mahasiswa berhasil !');
        return redirect()->route('absensi.index');
    }

    public function show(Request $request)
    {

        $tahunAjaranDef = Konfigurasi::value('tahun_ajar');
        $tahunAjaran = $request->tahun_ajaran ?? $tahunAjaranDef;

        $jadwalMatkul = new JadwalMatkul();

        // Ambil semua ID jadwal_matkul yang ditemukan
        $jadwalMatkulIds = $jadwalMatkul->pluck('id');

        $data = [
            'jadwalMatkul' => $jadwalMatkul->mahasiswaLoged($tahunAjaran),

            // Ambil semua nilai mahasiswa untuk jadwal_matkul tersebut
            'absensis' => Absensi::select('id', 'jadwal_matkuls_id', 'keterangan', 'pertemuan')
                ->where('mahasiswa_user_id', Auth::user()->mahasiswa->id)
                ->whereIn('jadwal_matkuls_id', $jadwalMatkulIds)
                ->get(),

            'histori' => $jadwalMatkul->histori(Auth::user()->mahasiswa->program_studi_id,  $tahunAjaran),
            'tahunAjaran' => $tahunAjaran,
        ];

        return Inertia::render('mahasiswa/absensi', $data);
    }
}
