<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaporanKeuanganTable extends Migration
{
    public function up()
    {
        Schema::create('laporan_keuangan', function (Blueprint $table) {
            $table->id();
            $table->date('periode');
            $table->decimal('total_pemasukan', 15, 2);
            $table->decimal('total_pengeluaran', 15, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('laporan_keuangan');
    }
}
