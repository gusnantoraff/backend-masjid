<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArusKasTable extends Migration
{
    public function up()
    {
        Schema::create('arus_kas', function (Blueprint $table) {
            $table->id();
            $table->decimal('pemasukan_total', 15, 2)->nullable();
            $table->decimal('pengeluaran_total', 15, 2)->nullable();
            $table->decimal('sisa_kas_total', 15, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('arus_kas');
    }
}
