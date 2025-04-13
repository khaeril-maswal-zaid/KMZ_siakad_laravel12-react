<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $fillable = [
        'program_angkatan_id',
        'mahasiswa_user_id',
        'pertemuan',
        'keterangan',
        'created_by'
    ];
}
