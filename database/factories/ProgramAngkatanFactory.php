<?php

namespace Database\Factories;

use App\Models\JadwalMatkul;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProgramAngkatan>
 */
class ProgramAngkatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->id,
            'mata_kuliah_id' => MataKuliah::inRandomOrder()->first()->id,
            'semester' => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7, 8]),
            'angkatan' => $this->faker->randomElement([2021, 2022, 2023, 2024, 2025]),
        ];
    }
}
