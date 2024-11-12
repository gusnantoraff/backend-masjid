<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenerimaanKasSeeder extends Seeder
{
    public function run()
    {
        DB::table('penerimaan_kas')->insert([
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-10',
                'jumlah' => 1000000.00,
                'keterangan' => 'Sumbangan dari Hamba Allah',
                'jenis' => 'Sumbangan Umum', // Added 'jenis' attribute
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-11',
                'jumlah' => 500000.00,
                'keterangan' => 'Sumbangan Jumat',
                'jenis' => 'Sumbangan Khusus', // Added 'jenis' attribute
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
