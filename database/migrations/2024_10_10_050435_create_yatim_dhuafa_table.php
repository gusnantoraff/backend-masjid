<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYatimDhuafaTable extends Migration
{
    public function up()
    {
        Schema::create('yatim_dhuafa', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->date('birth')->nullable();
            $table->text('alamat')->nullable();
            $table->enum('keterangan', ['yatim', 'dhuafa', 'yatim piatu']);
            $table->string('kontak');
            $table->enum('status', ['aktif', 'pindah', 'wafat'])->default('aktif');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('yatim_dhuafa');
    }
}
