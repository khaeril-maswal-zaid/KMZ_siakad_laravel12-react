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

            $table->foreignId('program_angkatan_id')->constrained()->onDelete('cascade');
            $table->foreignId('mahasiswa_user_id')->constrained()->onDelete('cascade');
            $table->enum('nilai', ["A", "B", "C", "D", "E", "T"])->nullable();
            $table->foreignId('created_by')->constrained('dosen_users')->onDelete('cascade');

            $table->unique(['program_angkatan_id', 'mahasiswa_user_id']);

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
