<?php

namespace Database\Seeders;

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
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Khaeril Maswal Zaid',
            'email' => 'muhammadkhaerilzaid@gmail.com',
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('4WL5hKSWwL92r-H'),
            'remember_token' => Str::random(10),
        ]);
    }
}
