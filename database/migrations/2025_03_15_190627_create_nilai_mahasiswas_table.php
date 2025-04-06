<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('nilai_mahasiswas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('jadwal_matkuls_id')->constrained()->onDelete('cascade');
            $table->foreignId('mahasiswa_user_id')->constrained()->onDelete('cascade');
            $table->string('nilai', 1)->nullable();  // Format: "A", "B", "C", "D", "E"
            $table->foreignId('dosen_users_id')->constrained()->onDelete('cascade');

            $table->unique(['jadwal_matkuls_id', 'mahasiswa_user_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilai_mahasiswas');
    }
};
