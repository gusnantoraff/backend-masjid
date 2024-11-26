<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoaTable extends Migration
{
    public function up()
    {
        Schema::create('coa', function (Blueprint $table) {
            $table->id();
            $table->string('kode_akun');
            $table->string('nama_akun');
            $table->string('tipe')->nullable();
            $table->timestamps();

            // Set the character set and collation
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            // $table->unsignedBigInteger('general_ledger_id');
            // $table->foreign('general_ledger_id')->references('id')->on('general_ledger')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('coa');
    }
}
