<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    /** @use HasFactory<\Database\Factories\ProdiFactory> */
    use HasFactory;

    protected $fillable = [
        'program_studi_id',
        'kode_matkul',
        'nama_matkul',
        'singkatan_matkul',
        'sks',
    ];
}
