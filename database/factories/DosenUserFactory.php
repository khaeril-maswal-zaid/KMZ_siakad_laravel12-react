<?php

namespace Database\Factories;

use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dosen>
 */
class DosenUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => 'dosen'])->id,
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->id ?? ProgramStudi::factory()->create()->id,

            'nidn' => $this->faker->unique()->numerify('10######'),
            'jabatan_fungsional' => $this->faker->randomElement(['Lektor', 'Asisten Ahli', 'Lektor Kepala', 'Guru Besar']),
            'status_ikatan' => $this->faker->randomElement(['Dosen Tetap', 'Dosen Tidak Tetap']),
            'status_aktivitas' => $this->faker->randomElement(['Aktif', 'Non Aktif']),
            'pendidikan_terakhir' => $this->faker->randomElement(['S1', 'S2', 'S3']),
            'nik' => $this->faker->numerify('##############'),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'no_hp' => $this->faker->phoneNumber(),
            'alamat' => $this->faker->address(),
        ];
    }
}
