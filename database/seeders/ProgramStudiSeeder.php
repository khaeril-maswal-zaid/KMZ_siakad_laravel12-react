<?php

namespace Database\Seeders;

use App\Models\ProgramStudi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramStudiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prodis = [
            ['fakultas_id' => 1, 'nama_prodi' => 'Teknik Informatika', 'singkatan_prodi' => 'TI', 'kode_prodi' => '001'],
            ['fakultas_id' => 1, 'nama_prodi' => 'Sistem Informasi', 'singkatan_prodi' => 'SI', 'kode_prodi' => '002'],
            ['fakultas_id' => 1, 'nama_prodi' => 'Manajemen', 'singkatan_prodi' => 'MN', 'kode_prodi' => '003'],
            ['fakultas_id' => 2, 'nama_prodi' => 'Akuntansi', 'singkatan_prodi' => 'AK', 'kode_prodi' => '004'],
            ['fakultas_id' => 2, 'nama_prodi' => 'Hukum', 'singkatan_prodi' => 'HK', 'kode_prodi' => '005'],
            ['fakultas_id' => 2, 'nama_prodi' => 'Pendidikan Bahasa Inggris', 'singkatan_prodi' => 'PBE', 'kode_prodi' => '006'],
            ['fakultas_id' => 3, 'nama_prodi' => 'Pendidikan Bahasa Indonesia', 'singkatan_prodi' => 'PBI', 'kode_prodi' => '007'],
            ['fakultas_id' => 3, 'nama_prodi' => 'Kesehatan Masyarakat', 'singkatan_prodi' => 'KM', 'kode_prodi' => '008'],
            ['fakultas_id' => 3, 'nama_prodi' => 'Farmasi', 'singkatan_prodi' => 'FM', 'kode_prodi' => '009'],
            ['fakultas_id' => 4, 'nama_prodi' => 'Teknik Sipil', 'singkatan_prodi' => 'TS', 'kode_prodi' => '010'],
            ['fakultas_id' => 4, 'nama_prodi' => 'Arsitektur', 'singkatan_prodi' => 'AR', 'kode_prodi' => '011'],
            ['fakultas_id' => 4, 'nama_prodi' => 'Teknik Elektro', 'singkatan_prodi' => 'TE', 'kode_prodi' => '012'],
            ['fakultas_id' => 4, 'nama_prodi' => 'Teknik Mesin', 'singkatan_prodi' => 'TM', 'kode_prodi' => '013'],
            ['fakultas_id' => 3, 'nama_prodi' => 'Psikologi', 'singkatan_prodi' => 'PS', 'kode_prodi' => '014'],
            ['fakultas_id' => 5, 'nama_prodi' => 'Ilmu Komunikasi', 'singkatan_prodi' => 'IK', 'kode_prodi' => '015'],
            ['fakultas_id' => 5, 'nama_prodi' => 'Sastra Inggris', 'singkatan_prodi' => 'SIE', 'kode_prodi' => '016'],
            ['fakultas_id' => 5, 'nama_prodi' => 'Sastra Indonesia', 'singkatan_prodi' => 'SID', 'kode_prodi' => '017'],
            ['fakultas_id' => 5, 'nama_prodi' => 'Biologi', 'singkatan_prodi' => 'BI', 'kode_prodi' => '018'],
            ['fakultas_id' => 1, 'nama_prodi' => 'Kimia', 'singkatan_prodi' => 'KI', 'kode_prodi' => '019'],
            ['fakultas_id' => 2, 'nama_prodi' => 'Matematika', 'singkatan_prodi' => 'MT', 'kode_prodi' => '020']
        ];



        foreach ($prodis as $prodi) {
            ProgramStudi::create($prodi);
        }
    }
}
