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
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// ----------------- START MAHASISWA AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:mahasiswa'])->group(function () {
    Route::get('/mahasiswa', [MahaiswaUserController::class, 'show'])->name('mahasiswa.index'); //Sengaja beda nama route dengan method
});
// ----------------- END MAHASISWA AREA -------------------------------------------------


// ----------------- START DOSEN AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:dosen'])->group(function () {
    Route::get('/dosen', [DosenUserController::class, 'index'])->name('dosen.index');
    Route::get('/jadwal-mengajar', [JadwalMatkulController::class, 'mengajar'])->name('jadwalperkuliahan.mengajar');

    Route::get('/nilai-mahaiswa/create', [NilaiMahasiswaController::class, 'create'])->name('nilaimahasiswa.create');
    Route::post('/nilai-mahaiswa/create', [NilaiMahasiswaController::class, 'store'])->name('nilaimahasiswa.store');

    Route::get('/absensi-perkuliahan/paramsession', [AbsensiController::class, 'paramAbsensiSession'])->name('absensi.paramSession');
    Route::get('/absensi-perkuliahan', [AbsensiController::class, 'index'])->name('absensi.index');
    Route::get('/absensi-perkuliahan/create', [AbsensiController::class, 'create'])->name('absensi.create');
    Route::post('/absensi-perkuliahan/store', [AbsensiController::class, 'store'])->name('absensi.store');
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

    Route::get('/data-nilai', [NilaiMahasiswaController::class, 'berlansung'])->name('datanilai.index');

    Route::get('/jadwal-perkuliahan', [JadwalMatkulController::class, 'index'])->name('jadwalperkuliahan.index');
    Route::get('/jadwal-perkuliahan/create', [JadwalMatkulController::class, 'create'])->name('jadwalperkuliahan.create');
    Route::post('/jadwal-perkuliahan', [JadwalMatkulController::class, 'store'])->name('jadwalperkuliahan.store');
    Route::post('/jadwal-perkuliahan/update', [JadwalMatkulController::class, 'update'])->name('jadwalperkuliahan.update');

    Route::get('/program-angkatan', [ProgramAngkatanController::class, 'index'])->name('programangkatan.index');
    Route::get('/program-angkatan/create', [ProgramAngkatanController::class, 'create'])->name('programangkatan.create');
    Route::post('/program-angkatan/store', [ProgramAngkatanController::class, 'store'])->name('programangkatan.store');
    Route::get('/program-angkatan/{programAngkatan:angkatan}', [ProgramAngkatanController::class, 'index'])->name('programangkatan.showindex');

    Route::get('/data-mahasiswa', [MahaiswaUserController::class, 'index'])->name('mahasiswauser.index');
    Route::get('/daftar-mata-kuliah', [MataKuliahController::class, 'index'])->name('matakuliah.index');
});
// ----------------- END PRODI AREA -------------------------------------------------

Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('/nilai-mahaiswa/paramsession', [NilaiMahasiswaController::class, 'paramNilaiSession'])->name('nilaimahasiswa.paramSession');
    Route::get('/nilai-mahaiswa', [NilaiMahasiswaController::class, 'index'])->name('nilaimahasiswa.index');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
