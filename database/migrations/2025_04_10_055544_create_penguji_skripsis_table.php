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
        Schema::create('penguji_skripsis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_studi_id')->constrained()->onDelete('cascade');
            $table->foreignId('skripsi_id')->constrained()->onDelete('cascade');
            $table->foreignId('dosen_user_id')->constrained()->onDelete('cascade');
            $table->string('role_penguji', 10); //Penguji I, II Dst
            $table->enum('ujian', ['Proposal', 'Hasil', 'Tutup']); //Penguji I, II Dst
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penguji_skripsis');
    }
};
