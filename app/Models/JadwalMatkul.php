<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JadwalMatkul extends Model
{

    protected $fillable = [
        'dosen_user_id',
        'program_angkatan_id',
        'hari',
        'waktu',
        'ruangan',
        'kelas',
        'tahun_ajaran',
    ];


    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['programAngkatan', 'dosen'];

    public function dosen()
    {
        return $this->belongsTo(DosenUser::class, 'dosen_user_id', 'id');
    }

    public function programAngkatan(): BelongsTo
    {
        return $this->belongsTo(ProgramAngkatan::class, 'program_angkatan_id', 'id');
    }

    // public function getApiJadwal($prodiAdmin, $angkatan, $kelas)
    // {
    //     return   $this->
    // }
}
