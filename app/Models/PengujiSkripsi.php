<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PengujiSkripsi extends Model
{
    /** @use HasFactory<\Database\Factories\PengujiSkripsiFactory> */
    use HasFactory;

    protected $fillable = [
        'program_studi_id',
        'skripsi_id',
        'ujian',
        'dosen_user_id',
        'role_penguji',
    ];

    /**
     * Atur Penguji U-Proposal = Telah U-Proposal {Set Prodi}
     */
    public function insertPengujiProposal(int $skripsiId, array $dosen, string $ujian)
    {
        $this->where('skripsi_id', $skripsiId)->where('ujian', $ujian)->delete();

        foreach ($dosen as $key => $value) {
            $this->create([
                'program_studi_id' => Auth::user()->adminProdi->program_studi_id,
                'skripsi_id' => $skripsiId,
                'dosen_user_id' => $value,
                'role_penguji' => 'Penguji ' . ($key + 1),
                'ujian' => $ujian,
            ]);
        }
    }
}
