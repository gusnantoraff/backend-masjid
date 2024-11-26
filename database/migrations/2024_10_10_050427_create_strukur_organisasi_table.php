<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStrukurOrganisasiTable extends Migration
{
    public function up()
    {
        Schema::create('struktur_organisasi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('info_masjid_id');
            $table->string('jabatan');
            $table->string('nama');
            $table->string('kontak')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Correct the foreign key constraint
            $table->foreign('info_masjid_id')->references('id')->on('info_masjid')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('struktur_organisasi');
    }
}
