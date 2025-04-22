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
        Schema::create('skripsis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_studi_id')->constrained()->onDelete('cascade');
            $table->foreignId('pembimbing1')->nullable()->constrained('dosen_users')->onDelete('cascade');
            $table->foreignId('pembimbing2')->nullable()->constrained('dosen_users')->onDelete('cascade');
            $table->foreignId('mahasiswa_user_id')->constrained()->onDelete('cascade');
            $table->string('judul', 255);
            $table->string('tahun_ajaran', 10);
            $table->date('tanggal_ujian')->nullable();
            $table->string('tautan_skripsi', 2083);
            $table->string('mores')->nullable();
            $table->enum('status', ['Penentuan Pembimbing', 'Bimbingan Proposal', 'Mendaftar U-Proposal', 'Telah U-Proposal', 'Bimbingan Skripsi', 'Mendaftar U-Hasil', 'Telah U-Hasil', 'Mendaftar U-Tutup', 'Skripsi Final'])->default('Penentuan Pembimbing');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skripsis');
    }
};
