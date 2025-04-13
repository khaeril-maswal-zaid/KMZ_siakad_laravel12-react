<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilaiMahasiswa extends Model
{
    protected $fillable = [
        'program_angkatan_id',
        'mahasiswa_user_id',
        'nilai',
        'created_by'
    ];
}
