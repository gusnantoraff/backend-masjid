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
            $table->string('judul_surat');
            $table->text('isi_surat');
            $table->text('tanda_tangan')->nullable();
            $table->text('stempel')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('template_surat');
    }
}
