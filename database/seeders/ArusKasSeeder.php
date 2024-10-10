<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArusKasSeeder extends Seeder
{
    public function run()
    {
        DB::table('arus_kas')->insert([
            [
                'penerimaan_kas_id' => 1,
                'pengeluaran_kas_id' => null,
                'tanggal' => '2024-10-10',
                'pemasukan' => 1000000.00,
                'pengeluaran' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'penerimaan_kas_id' => null,
                'pengeluaran_kas_id' => 1,
                'tanggal' => '2024-10-12',
                'pemasukan' => null,
                'pengeluaran' => 200000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
