<?php

namespace Database\Factories;

use App\Models\ProgramStudi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MataKuliahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->id ?? ProgramStudi::factory()->create()->id,
            'kode_matkul' => $this->faker->unique()->bothify('MK###'),
            'nama_matkul' => $this->faker->words(mt_rand(2, 3), true),
        ];
    }
}
