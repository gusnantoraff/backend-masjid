<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoMasjidTable extends Migration
{
    public function up()
    {
        Schema::create('info_masjid', function (Blueprint $table) {
            $table->id();
            $table->string('nama_masjid');
            $table->text('alamat');
            $table->string('kontak')->nullable();
            $table->text('deskripsi')->nullable();
            $table->text('ad_art')->nullable();
            $table->timestamps();

            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
    }

    public function down()
    {
        Schema::dropIfExists('info_masjid');
    }
}
