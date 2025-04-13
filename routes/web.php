<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\DosenUserController;
use App\Http\Controllers\JadwalMatkulController;
use App\Http\Controllers\KeuanganUserController;
use App\Http\Controllers\MahaiswaUserController;
use App\Http\Controllers\MataKuliahController;
use App\Http\Controllers\NilaiMahasiswaController;
use App\Http\Controllers\ProdiUserController;
use App\Http\Controllers\ProgramAngkatanController;
use App\Http\Controllers\SkripsiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// ----------------- START MAHASISWA AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:mahasiswa'])->group(function () {
    Route::get('/mahasiswa', [MahaiswaUserController::class, 'show'])->name('mahasiswa.index'); //Sengaja beda nama route dengan method

    Route::get('/jadwal-perkulihan/', [JadwalMatkulController::class, 'show'])->name('jadwalperkuliahan.show');
    Route::get('/nilai/', [NilaiMahasiswaController::class, 'show'])->name('nilaimahasiswa.show');
    Route::get('/absensi/', [AbsensiController::class, 'show'])->name('absensi.show');

    Route::get('/progres-skripsi', [SkripsiController::class, 'create'])->name('skripsi.create');
    Route::post('/skripsi/store', [SkripsiController::class, 'store'])->name('skripsi.store');
    Route::patch('/skripsi/edit/{skripsi}', [SkripsiController::class, 'edit'])->name('skripsi.edit');
    Route::patch('/skripsi/ujia-tutup/{skripsi}', [SkripsiController::class, 'tutup'])->name('skripsi.tutup');
    Route::patch('/skripsi/acc-proposal/{skripsi}', [SkripsiController::class, 'accproposal'])->name('skripsi.accproposal');
    Route::patch('/skripsi/daftar-ujian-hasil/{skripsi}', [SkripsiController::class, 'DaftarHasil'])->name('skripsi.daftarhasil');

    Route::get('/program-akademik', [ProgramAngkatanController::class, 'show'])->name('programangkatan.show');
});
// ----------------- END MAHASISWA AREA -------------------------------------------------


// ----------------- START DOSEN AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:dosen'])->group(function () {
    Route::get('/dosen', [DosenUserController::class, 'index'])->name('dosen.index');
    Route::get('/jadwal-mengajar', [JadwalMatkulController::class, 'mengajar'])->defaults("key", "jadwal")->name('jadwalperkuliahan.mengajar');
    Route::get('/riwayat-mengajar', [JadwalMatkulController::class, 'mengajar'])->defaults("key", "riwayat")->name('jadwalperkuliahan.riwayat');

    Route::get('/nilai-mahaiswa/create', [NilaiMahasiswaController::class, 'create'])->name('nilaimahasiswa.create');
    Route::post('/nilai-mahaiswa/store', [NilaiMahasiswaController::class, 'store'])->name('nilaimahasiswa.store');

    Route::get('/absensi-perkuliahan/create', [AbsensiController::class, 'create'])->name('absensi.create');
    Route::post('/absensi-perkuliahan/store', [AbsensiController::class, 'store'])->name('absensi.store');

    Route::get('/mahasiswa-bimbingan/', [SkripsiController::class, 'index'])->name('skripsi.pembimbing');
});
// ----------------- END DOSEN AREA -------------------------------------------------


// ----------------- START KEUANGAN AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:keuangan'])->group(function () {
    Route::get('/admin-keuangan', [KeuanganUserController::class, 'index'])->name('keuangan.index');
});
// ----------------- END KEUANGAN AREA -------------------------------------------------


// ----------------- START PRODI AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:prodi'])->group(function () {
    Route::get('/admin-prodi', [ProdiUserController::class, 'index'])->name('prodi.index');

    Route::get('/jadwal-perkuliahan', [JadwalMatkulController::class, 'index'])->name('jadwalperkuliahan.index');
    Route::get('/jadwal-perkuliahan/create', [JadwalMatkulController::class, 'create'])->name('jadwalperkuliahan.create');
    Route::post('/jadwal-perkuliahan', [JadwalMatkulController::class, 'store'])->name('jadwalperkuliahan.store');
    Route::patch('/jadwal-perkuliahan/update', [JadwalMatkulController::class, 'update'])->name('jadwalperkuliahan.update');

    Route::get('/jadwal-perkuliahan/data-nilai', [JadwalMatkulController::class, 'terjadwal'])->defaults("key", "nilai")->name('jadwalperkuliahan.nilai');
    Route::get('/jadwal-perkuliahan/absensi-mahasiswa', [JadwalMatkulController::class, 'terjadwal'])->defaults("key", "absensi")->name('jadwalperkuliahan.absensi');
    Route::get('/jadwal-perkuliahan/berlansung', [JadwalMatkulController::class, 'berlansung'])->name('jadwalperkuliahan.berlansung');

    Route::get('/program-angkatan', [ProgramAngkatanController::class, 'index'])->name('programangkatan.index');
    Route::get('/program-angkatan/create', [ProgramAngkatanController::class, 'create'])->name('programangkatan.create');
    Route::post('/program-angkatan/store', [ProgramAngkatanController::class, 'store'])->name('programangkatan.store');
    Route::get('/program-angkatan/{programAngkatan:angkatan}', [ProgramAngkatanController::class, 'index'])->name('programangkatan.showindex');

    Route::get('/data-mahasiswa', [MahaiswaUserController::class, 'index'])->name('mahasiswauser.index');

    Route::get('/daftar-mata-kuliah', [MataKuliahController::class, 'index'])->name('matakuliah.index');
    Route::post('/daftar-mata-kuliah/store', [MataKuliahController::class, 'store'])->name('matakuliah.store');

    Route::get('/skripsi/', [SkripsiController::class, 'index'])->name('skripsi.index');
    Route::patch('/skripsi/update/{skripsi}', [SkripsiController::class, 'update'])->name('skripsi.update');
    Route::patch('/skripsi/ujian-proposal/{skripsi}', [SkripsiController::class, 'UjianProposal'])->name('skripsi.propsal');
    Route::patch('/skripsi/ujian-hasil/{skripsi}', [SkripsiController::class, 'UjianHasil'])->name('skripsi.hasil');
});
// ----------------- END PRODI AREA -------------------------------------------------

Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('/nilai-mahaiswa/paramsession', [NilaiMahasiswaController::class, 'paramNilaiSession'])->name('nilaimahasiswa.paramSession');
    Route::get('/nilai-mahaiswa', [NilaiMahasiswaController::class, 'index'])->name('nilaimahasiswa.index');

    Route::get('/absensi-perkuliahan/paramsession', [AbsensiController::class, 'paramAbsensiSession'])->name('absensi.paramSession');
    Route::get('/absensi-perkuliahan', [AbsensiController::class, 'index'])->name('absensi.index');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
