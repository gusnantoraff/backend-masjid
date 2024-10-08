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
        Schema::create('kelola_masjids', function (Blueprint $table) {
            $table->id('kelola_masjid_id');
            $table->string('nama_masjid', 255);
            $table->string('phone_number', 20);
            $table->enum('kategori', ['Kampung', 'Kota', 'Kabupaten', 'Provinsi']); // Example categories
            $table->string('provinsi', 100);
            $table->string('kota', 100);
            $table->string('kecamatan', 100); // New field for Kecamatan
            $table->string('desa', 100); // New field for Desa
            $table->string('RW', 10); // New field for RW
            $table->string('alamat_lengkap', 255); // New field for full address
            $table->text('description_text')->nullable(); // New field for text description
            $table->decimal('luas_tanah', 10, 2)->unsigned(); // Decimal to handle precision
            $table->string('status_tanah', 50);
            $table->decimal('luas_bangunan', 10, 2)->unsigned(); // Decimal for precise building size
            $table->year('tahun_berdiri'); // Year type for founding year
            $table->integer('jumlah_jamaah')->unsigned()->nullable(); // Nullable for optional data
            $table->integer('jumlah_muazin')->unsigned()->nullable(); // Only positive values
            $table->integer('jumlah_khatib')->unsigned()->nullable();
            $table->integer('jumlah_remaja')->unsigned()->nullable(); // New field for number of youth
            $table->string('website', 255)->nullable(); // New field for website
            $table->timestamps();

            // Adding indexes for performance optimization on searchable fields
            $table->index(['provinsi', 'kota']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelola_masjids');
    }
};
