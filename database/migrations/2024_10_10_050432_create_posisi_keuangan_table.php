<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePosisiKeuanganTable extends Migration
{
    public function up()
    {
        Schema::create('posisi_keuangan', function (Blueprint $table) {
            $table->id();
            $table->decimal('aktiva', 15, 2);
            $table->decimal('pasiva', 15, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posisi_keuangan');
    }
}
