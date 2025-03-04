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
        Schema::create('dosen_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('program_studi_id')->constrained()->onDelete('cascade');

            $table->string('nidn')->unique();
            $table->string('jabatan_fungsional');
            $table->string('status_ikatan');
            $table->enum('status_aktivitas', ['Aktif', 'Non Aktif']);
            $table->enum('pendidikan_terakhir', ['S1', 'S2', 'S3']);

            $table->string('nik')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('agama');
            $table->string('no_hp')->nullable();
            $table->text('alamat');

            $table->index('program_studi_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dosen_users');
    }
};
