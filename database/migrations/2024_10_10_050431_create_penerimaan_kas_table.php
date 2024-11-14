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
            $table->foreignId('coa_id')->constrained('coa')->onDelete('cascade');
            $table->foreignId('arus_kas_id')->constrained('arus_kas')->onDelete('cascade');
            $table->text('jenis')->nullable();
            $table->date('tanggal');
            $table->decimal('jumlah', 15, 2);
            $table->text('deskripsi')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('penerimaan_kas');
    }
}
