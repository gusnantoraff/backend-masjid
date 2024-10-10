<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJurnalUmumTable extends Migration
{
    public function up()
    {
        Schema::create('jurnal_umum', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('coa_id');
            $table->date('tanggal');
            $table->decimal('debit', 15, 2);
            $table->decimal('kredit', 15, 2);
            $table->text('keterangan')->nullable();
            $table->timestamps();

            // Correct the foreign key constraint
            $table->foreign('coa_id')->references('id')->on('coa')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('jurnal_umum');
    }
}
