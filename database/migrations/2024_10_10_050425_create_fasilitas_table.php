<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFasilitasTable extends Migration
{
    public function up()
    {
        Schema::create('fasilitas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('info_masjid_id');
            $table->string('nama_fasilitas');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('info_masjid_id')->references('id')->on('info_masjid')->onDelete('cascade');

            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
    }

    public function down()
    {
        Schema::dropIfExists('fasilitas');
    }
}
