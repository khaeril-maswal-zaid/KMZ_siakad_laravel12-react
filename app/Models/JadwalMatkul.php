<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

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

    public function dosen(): BelongsTo
    {
        return $this->belongsTo(DosenUser::class, 'dosen_user_id', 'id');
    }

    public function programAngkatan(): BelongsTo
    {
        return $this->belongsTo(ProgramAngkatan::class, 'program_angkatan_id', 'id');
    }

    //------------------------------------------------------------------------------------
    public function histori($prodi, $notThisYear)
    {
        return   $this->select('tahun_ajaran')
            ->whereHas('programAngkatan', function ($query) use ($prodi) {
                $query->where('program_studi_id', $prodi);
            })
            ->whereNot('tahun_ajaran', $notThisYear)
            ->distinct()
            ->orderBy('tahun_ajaran', 'desc')
            ->get();
    }

    //------------------------------------------------------------------------------------
    public function mahasiswaLoged($tahunAjaran)
    {
        // Ambil user yang sedang login
        $user = Auth::user();
        $prodiFromAdmin = $user->mahasiswa->program_studi_id;

        return $this->select('id', 'dosen_user_id', 'kelas', 'tahun_ajaran', 'program_angkatan_id', 'hari', 'waktu', 'ruangan')
            ->with([
                'dosen:id,user_id,nidn',
                'dosen.user:id,name',
                'programAngkatan:id,mata_kuliah_id,angkatan',
                'programAngkatan.mataKuliah:id,nama_matkul,kode_matkul,sks',
            ])
            ->whereHas('programAngkatan', function ($query) {
                $query->where('angkatan', Auth::user()->mahasiswa->angkatan);
            })
            ->whereHas('programAngkatan', function ($query) use ($prodiFromAdmin) {
                $query->where('program_studi_id', $prodiFromAdmin);
            })
            ->where('kelas', Auth::user()->mahasiswa->kelas)
            ->where('tahun_ajaran', $tahunAjaran)
            ->get();
    }
}
