<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coa_general_ledger', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('coa_id');
            $table->unsignedBigInteger('general_ledger_id');
            $table->timestamps();

            $table->foreign('coa_id')->references('id')->on('coa')->onDelete('cascade');
            $table->foreign('general_ledger_id')->references('id')->on('general_ledger')->onDelete('cascade');

            $table->unique(['coa_id', 'general_ledger_id']);  // Ensure each pair is unique
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coa_general_ledger');
    }
};
