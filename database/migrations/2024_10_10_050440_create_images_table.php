<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kegiatan_id'); // foreign key column
            $table->foreign('kegiatan_id')->references('id')->on('kegiatan')->onDelete('cascade'); // foreign key constraint
            $table->text('keterangan')->nullable();
            $table->string('kategori');
            $table->text('image')->nullable(); // image field
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('images');
    }
}
