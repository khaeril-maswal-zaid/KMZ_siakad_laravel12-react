<?php

namespace Database\Seeders;

use App\Models\Fakultas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FakultasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fakultas = [
            ['nama_fakultas' => 'Fakultas Teknik', 'singkatan_fakultas' => 'FT', 'kode_fakultas' => '01'],
            ['nama_fakultas' => 'Fakultas Ekonomi', 'singkatan_fakultas' => 'FE', 'kode_fakultas' => '02'],
            ['nama_fakultas' => 'Fakultas Keguruan dan Ilmu Pendidikan', 'singkatan_fakultas' => 'FKIP', 'kode_fakultas' => '03'],
            ['nama_fakultas' => 'Fakultas Hukum', 'singkatan_fakultas' => 'FH', 'kode_fakultas' => '04'],
            ['nama_fakultas' => 'Fakultas Pertanian', 'singkatan_fakultas' => 'FP', 'kode_fakultas' => '05'],
        ];

        foreach ($fakultas as $fak) {
            Fakultas::create($fak);
        }
    }
}
