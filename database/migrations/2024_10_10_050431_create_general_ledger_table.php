<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneralLedgerTable extends Migration
{
    public function up()
    {
        Schema::create('general_ledger', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->decimal('debit', 15, 2)->nullable();
            $table->decimal('kredit', 15, 2)->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();

            // Set the character set and collation
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            // Foreign key constraint
            // $table->unsignedBigInteger('coa_id');
            // $table->foreign('coa_id')->references('id')->on('coa')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('general_ledger');
    }
}
