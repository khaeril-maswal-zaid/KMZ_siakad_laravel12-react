<?php

namespace Database\Factories;

use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mahaiswa>
 */
class MahasiswaUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create(['role' => 'mahasiswa'])->id,
            'program_studi_id' => ProgramStudi::inRandomOrder()->first()->id ?? ProgramStudi::factory()->create()->id,

            'nim' => $this->faker->unique()->numerify('2300###'),
            'angkatan' => $this->faker->year(),
            'nik' => $this->faker->numerify('##############'),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'no_hp' => $this->faker->phoneNumber(),
            'provinsi' => $this->faker->state(),
            'kabupaten' => $this->faker->city(),
            'kecamatan' => $this->faker->citySuffix(),
            'desa' => $this->faker->streetName(),
            'alamat' => $this->faker->address(),
            'nama_ayah' => $this->faker->name('male'),
            'nama_ibu' => $this->faker->name('female'),
            'pekerjaan_ayah' => $this->faker->jobTitle(),
            'pekerjaan_ibu' => $this->faker->jobTitle(),
            'anak_ke' => $this->faker->numberBetween(1, 5),
            'jumlah_saudara' => $this->faker->numberBetween(1, 10),
            'nisn' => $this->faker->numerify('##########'),
            'nama_sekolah' => $this->faker->company(),
            'jurusan_sekolah' => $this->faker->randomElement(['IPA', 'IPS', 'Bahasa', 'Teknik']),
            'tahun_lulus_sekolah' => $this->faker->year(),
        ];
    }
}
