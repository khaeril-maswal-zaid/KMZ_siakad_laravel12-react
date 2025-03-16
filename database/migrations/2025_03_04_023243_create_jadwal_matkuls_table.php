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
        Schema::create('jadwal_matkuls', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dosen_user_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_angkatan_id')->constrained()->onDelete('cascade');
            $table->string('hari');
            $table->string('waktu'); // Format: "08:00 - 10:00"
            $table->string('ruangan');
            $table->string('kelas')->max(1); // Format: "A", "B", "C", "D", "E";
            $table->string('tahun_ajaran');

            $table->unique(['program_angkatan_id', 'tahun_ajaran', 'kelas']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_matkuls');
    }
};
