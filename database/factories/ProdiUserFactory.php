<?php

namespace Database\Factories;

use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prodi>
 */
class ProdiUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => 'prodi'])->id,
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->id ?? ProgramStudi::factory()->create()->id,

            'nik' => $this->faker->optional()->numerify('##############'),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'no_hp' => $this->faker->optional()->phoneNumber(),
            'alamat' => $this->faker->address(),
            'status_aktivitas' => $this->faker->randomElement(['Aktif', 'Non Aktif']),
        ];
    }
}
