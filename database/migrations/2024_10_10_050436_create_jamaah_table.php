<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJamaahTable extends Migration
{
    public function up()
    {
        Schema::create('jamaah', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->date('birth');
            $table->enum('gender', ['pria', 'wanita']);
            $table->string('email')->unique();
            $table->string('kontak');
            $table->enum('keterangan', ['mati', 'pindah', 'aktif']);
            $table->text('alamat');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jamaah');
    }
}
