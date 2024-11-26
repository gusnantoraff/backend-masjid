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
        Schema::create('rekening_bank', function (Blueprint $table) {
            $table->id();
            $table->foreignId('info_masjid_id')->constrained('info_masjid')->onDelete('cascade');
            $table->string('nama_bank');
            $table->string('nomor_rekening');
            $table->string('atas_nama');
            $table->string('image_transfer')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekening_bank');
    }
};
