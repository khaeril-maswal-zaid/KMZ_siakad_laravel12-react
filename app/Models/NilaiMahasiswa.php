<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilaiMahasiswa extends Model
{
    protected $fillable = [
        'jadwal_matkuls_id',
        'mahasiswa_user_id',
        'nilai',
        'dosen_users_id'
    ];
}
