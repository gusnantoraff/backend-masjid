<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengeluaranKasTable extends Migration
{
    public function up()
    {
        Schema::create('pengeluaran_kas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('coa_id')->constrained('coa')->onDelete('cascade');
            $table->foreignId('arus_kas_id')->constrained('arus_kas')->onDelete('cascade');
            $table->text('jenis')->nullable();
            $table->date('tanggal');
            $table->decimal('jumlah', 15, 2);
            $table->text('deskripsi')->nullable();
            $table->string('image')->nullable();
            $table->string('status')->default('antri');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengeluaran_kas');
    }
}
