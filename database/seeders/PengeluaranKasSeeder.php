<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengeluaranKasSeeder extends Seeder
{
    public function run()
    {
        DB::table('pengeluaran_kas')->insert([
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-12',
                'jumlah' => 200000.00,
                'keterangan' => 'Biaya Operasional',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-13',
                'jumlah' => 300000.00,
                'keterangan' => 'Pembelian Al-Qur\'an',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
