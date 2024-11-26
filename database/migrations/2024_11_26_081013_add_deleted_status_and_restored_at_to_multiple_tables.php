<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeletedStatusAndRestoredAtToMultipleTables extends Migration
{
    /**
     * List of tables to be updated.
     *
     * @var array
     */
    protected $tables = [
        'users',
        'berita',
        'coa',
        'fasilitas',
        'general_ledger',
        'images',
        'info_masjid',
        'jamaah',
        'kegiatan',
        'laporan_keuangan',
        'mubaligh',
        'arus_kas',
        'penerimaan_kas',
        'pengeluaran_kas',
        'rekening_bank',
        'posisi_keuangan',
        'struktur_organisasi',
        'template_surat',
        'yatim_dhuafa',
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->boolean('deleted_status')->default(0)->after('deleted_at');
                $table->timestamp('restored_at')->nullable()->after('deleted_status');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn(['deleted_status', 'restored_at']);
            });
        }
    }
}
