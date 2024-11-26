<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalSholatTable extends Migration
{
    public function up()
    {
        Schema::create('jadwal_sholat', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->time('subuh');
            $table->time('dzuhur');
            $table->time('ashar');
            $table->time('maghrib');
            $table->time('isya');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jadwal_sholat');
    }
}
