<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramAngkatan extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramAngkatanFactory> */
    use HasFactory;

    public function mataKuliah(): BelongsTo
    {
        return $this->belongsTo(MataKuliah::class, 'mata_kuliah_id', 'id');
    }
}
