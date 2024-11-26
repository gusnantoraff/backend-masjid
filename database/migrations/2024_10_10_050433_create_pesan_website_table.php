<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePesanWebsiteTable extends Migration
{
    public function up()
    {
        Schema::create('pesan_website', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengirim');
            $table->string('email');
            $table->text('pesan');
            $table->date('tanggal');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pesan_website');
    }
}
