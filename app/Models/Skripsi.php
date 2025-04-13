<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skripsi extends Model
{

    protected $fillable = [
        'program_studi_id',
        'pembimbing1',
        'pembimbing2',
        'mahasiswa_user_id',
        'judul',
        'tanggal_ujian',
        'tautan_skripsi',
        'mores',
        'status',
    ];

    /** @use HasFactory<\Database\Factories\SkripsiFactory> */
    use HasFactory;

    public function mahasiswa(): BelongsTo
    {
        return $this->belongsTo(MahasiswaUser::class, 'mahasiswa_user_id', 'id');
    }

    public function dosen1(): BelongsTo
    {
        return $this->belongsTo(DosenUser::class, 'pembimbing1', 'id');
    }

    public function dosen2(): BelongsTo
    {
        return $this->belongsTo(DosenUser::class, 'pembimbing2', 'id');
    }
}
