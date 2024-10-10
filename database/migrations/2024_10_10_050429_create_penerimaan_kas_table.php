<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenerimaanKasTable extends Migration
{
    public function up()
    {
        Schema::create('penerimaan_kas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('coa_id');
            $table->date('tanggal');
            $table->decimal('jumlah', 15, 2);
            $table->text('keterangan')->nullable();
            $table->timestamps();

            // Correct the foreign key constraint
            $table->foreign('coa_id')->references('id')->on('coa')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('penerimaan_kas');
    }
}
