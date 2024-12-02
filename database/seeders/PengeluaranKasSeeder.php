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
                'coa_id' => 2,
                'arus_kas_id' => 1,
                'tanggal' => '2024-10-12',
                'jumlah' => 2000000.00,
                'deskripsi' => 'Biaya Pembelian Speaker',
                'jenis' => 'Pengeluaran Operasional', 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coa_id' => 2,
                'arus_kas_id' => 1,
                'tanggal' => '2024-10-13',
                'jumlah' => 400000.00,
                'deskripsi' => 'Untuk Jumat Berkah',
                'jenis' => 'Pengeluaran Sosial',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
