<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LaporanKeuanganSeeder extends Seeder
{
    public function run()
    {
        DB::table('laporan_keuangan')->insert([
            [
                'periode' => 'Oktober 2024',
                'total_pemasukan' => 1500000.00,
                'total_pengeluaran' => 500000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'periode' => 'September 2024',
                'total_pemasukan' => 1200000.00,
                'total_pengeluaran' => 300000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
