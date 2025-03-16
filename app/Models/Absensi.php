<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $fillable = [
        'jadwal_matkuls_id',
        'mahasiswa_user_id',
        'pertemuan',
        'keterangan'
    ];
}
