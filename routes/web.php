<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'ruleUser:mahasiswa'])->group(function () {
    Route::get('dashboard-mahasiswa', function () {
        return Inertia::render('dashboard');
    })->name('dashboard.mahasiswa');
});


Route::middleware(['auth', 'verified', 'ruleUser:dosen'])->group(function () {
    Route::get('dashboard-dosen', function () {
        return Inertia::render('dashboard');
    })->name('dashboard.dosen');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
