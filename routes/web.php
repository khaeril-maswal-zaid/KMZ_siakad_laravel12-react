<?php

use App\Http\Controllers\DosenUserController;
use App\Http\Controllers\KeuanganUserController;
use App\Http\Controllers\MahaiswaUserController;
use App\Http\Controllers\ProdiUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// ----------------- START MAHASISWA AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:mahasiswa'])->group(function () {

    Route::get('mahasiswa', [MahaiswaUserController::class, 'index'])->name('mahasiswa.index');
});
// ----------------- END MAHASISWA AREA -------------------------------------------------


// ----------------- START DOSEN AREA -------------------------------------------------

Route::middleware(['auth', 'verified', 'ruleUser:dosen'])->group(function () {
    Route::get('dosen', [DosenUserController::class, 'index'])->name('dosen.index');
});
// ----------------- END DOSEN AREA -------------------------------------------------


// ----------------- START KEUANGAN AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:keuangan'])->group(function () {
    Route::get('admin-keuangan', [KeuanganUserController::class, 'index'])->name('keuangan.index');
});
// ----------------- END KEUANGAN AREA -------------------------------------------------


// ----------------- START PRODI AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:prodi'])->group(function () {
    Route::get('admin-prodi', [ProdiUserController::class, 'index'])->name('prodi.index');
});
// ----------------- END PRODI AREA -------------------------------------------------



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
