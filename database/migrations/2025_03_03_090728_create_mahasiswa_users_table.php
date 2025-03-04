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
        Schema::create('mahasiswa_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_studi_id')->constrained()->onDelete('cascade');

            $table->string('nim')->unique();
            $table->string('kelas');
            $table->string('angkatan');
            $table->string('nik')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('agama');
            $table->string('no_hp')->nullable();
            $table->string('provinsi');
            $table->string('kabupaten');
            $table->string('kecamatan');
            $table->string('desa');
            $table->string('alamat');
            $table->string('nama_ayah');
            $table->string('nama_ibu');
            $table->string('pekerjaan_ayah');
            $table->string('pekerjaan_ibu');
            $table->integer('anak_ke');
            $table->integer('jumlah_saudara');
            $table->string('nisn')->nullable();
            $table->string('nama_sekolah');
            $table->string('jurusan_sekolah')->nullable();
            $table->year('tahun_lulus_sekolah');
            $table->string('image');

            $table->index(['program_studi_id', 'angkatan']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa_users');
    }
};
