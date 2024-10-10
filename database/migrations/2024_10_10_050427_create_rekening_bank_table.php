<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRekeningBankTable extends Migration
{
    public function up()
    {
        Schema::create('rekening_bank', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('info_masjid_id');
            $table->string('nama_bank');
            $table->string('nomor_rekening');
            $table->string('atas_nama');
            $table->text('image_transfer')->nullable();
            $table->timestamps();

            // Correct the foreign key constraint
            $table->foreign('info_masjid_id')->references('id')->on('info_masjid')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('rekening_bank');
    }
}
