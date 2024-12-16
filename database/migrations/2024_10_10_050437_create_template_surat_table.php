<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplateSuratTable extends Migration
{
    public function up()
    {
        Schema::create('template_surat', function (Blueprint $table) {
            $table->id();
            $table->string('judul_surat')->nullable();
            $table->text('isi_surat');
            $table->date('tanggal');
            $table->string('nomor')->nullable();
            $table->string('hal')->nullable();
            $table->string('lampiran')->nullable();
            $table->string('penerima')->nullable();
            $table->string('lokasi')->nullable();
            $table->text('nama_ttd')->nullable();
            $table->text('stempel')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('template_surat');
    }
}
