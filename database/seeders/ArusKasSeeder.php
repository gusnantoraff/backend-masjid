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
                // 'penerimaan_kas_id' => 1,
                // 'pengeluaran_kas_id' => null,
                // 'tanggal' => '2024-10-10',
                'pemasukan_total' => null,
                'pengeluaran_total' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
