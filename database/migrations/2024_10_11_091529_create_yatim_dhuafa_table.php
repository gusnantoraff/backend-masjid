<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYatimDhuafaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('yatim_dhuafa', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->date('birth');
            $table->text('alamat');
            $table->enum('keterangan', ['yatim', 'duafa', 'yatim piatu']);
            $table->string('kontak');
            $table->enum('status', ['aktif', 'pindah', 'mati']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('yatim_dhuafa');
    }
}
