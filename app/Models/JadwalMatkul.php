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
    protected $with = ['programStudi', 'mataKuliah', 'dosen'];

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    public function mataKuliah(): BelongsTo
    {
        return $this->belongsTo(MataKuliah::class);
    }

    public function dosen(): BelongsTo
    {
        return $this->belongsTo(DosenUser::class);
    }
}
