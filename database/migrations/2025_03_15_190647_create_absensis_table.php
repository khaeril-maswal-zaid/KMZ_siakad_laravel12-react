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
        Schema::create('absensis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('jadwal_matkuls_id')->constrained()->onDelete('cascade');
            $table->foreignId('mahasiswa_user_id')->constrained()->onDelete('cascade');
            $table->string('keterangan')->max(1); // Format: "H", "A", "I", "S"
            $table->string('pertemuan')->max(2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensis');
    }
};
