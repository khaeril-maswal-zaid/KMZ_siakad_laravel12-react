<?php

namespace Database\Seeders;

use App\Models\Konfigurasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KonfigurasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Konfigurasi::create([
            'tahun_ajar' => '2024/2025',
            'semester' => true
        ]);
    }
}
