<?php

use App\Http\Controllers\DosenController;
use App\Http\Controllers\MahaiswaController;
use App\Http\Controllers\ProdiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// ----------------- START MAHASISWA AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:mahasiswa'])->group(function () {

    Route::get('mahasiswa', [MahaiswaController::class, 'index'])->name('mahasiswa.index');
});
// ----------------- END MAHASISWA AREA -------------------------------------------------


// ----------------- START DOSEN AREA -------------------------------------------------

Route::middleware(['auth', 'verified', 'ruleUser:dosen'])->group(function () {
    Route::get('dosen', [DosenController::class, 'index'])->name('dosen.index');
});
// ----------------- END DOSEN AREA -------------------------------------------------


// ----------------- START KEUANGAN AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:admin-keuangan'])->group(function () {
    Route::get('admin-keuangan', [ProdiController::class, 'index'])->name('keuangan.index');
});
// ----------------- END KEUANGAN AREA -------------------------------------------------


// ----------------- START PRODI AREA -------------------------------------------------
Route::middleware(['auth', 'verified', 'ruleUser:admin-prodi'])->group(function () {
    Route::get('admin-prodi', function () {
        return Inertia::render('dashboardprodi');
    })->name('prodi.index');
});
// ----------------- END PRODI AREA -------------------------------------------------



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
