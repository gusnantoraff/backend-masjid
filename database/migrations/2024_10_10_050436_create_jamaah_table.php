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
<<<<<<< Updated upstream
            $table->string('kontak');
            $table->enum('keterangan', ['mati', 'pindah', 'aktif']);
            $table->text('alamat');
=======
            $table->string('kontak')->nullable();
            $table->text('alamat')->nullable();
            $table->enum('keterangan', ['aktif', 'pindah', 'meninggal'])->default('aktif');
>>>>>>> Stashed changes
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jamaah');
    }
}
