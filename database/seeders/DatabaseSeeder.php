<?php

namespace Database\Seeders;

use App\Models\DosenUser;
use App\Models\KeuanganUser;
use App\Models\MahasiswaUser;
use App\Models\MataKuliah;
use App\Models\ProdiUser;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Khaeril Maswal Zaid',
        //     'email' => 'muhammadkhaerilzaid@gmail.com',
        //     'email_verified_at' => now(),
        //     'password' => static::$password ??= Hash::make('4WL5hKSWwL92r-H'),
        //     'remember_token' => Str::random(10),
        // ]);

        $this->call([
            FakultasSeeder::class,
            ProgramStudiSeeder::class,
        ]);

        MahasiswaUser::factory(50)->create();
        DosenUser::factory(20)->create();
        ProdiUser::factory(10)->create();
        KeuanganUser::factory(10)->create();
        MataKuliah::factory(35)->create();
    }
}
