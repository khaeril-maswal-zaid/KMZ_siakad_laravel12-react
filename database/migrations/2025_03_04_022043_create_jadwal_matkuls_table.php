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

            $table->foreignId('program_studi_id')->constrained()->onDelete('cascade');
            $table->foreignId('dosen_id')->constrained('detail_dosen')->onDelete('cascade');
            $table->foreignId('mata_kuliah_id')->constrained('mata_kuliah')->onDelete('cascade');

            $table->integer('semester');
            $table->string('hari');
            $table->string('waktu'); // Format: "08:00 - 10:00"
            $table->string('ruangan');
            $table->string('kelas');
            $table->string('tahun_ajaran');

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
