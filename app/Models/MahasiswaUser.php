<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MahasiswaUser extends Model
{
    /** @use HasFactory<\Database\Factories\MahaiswaFactory> */
    use HasFactory;

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
