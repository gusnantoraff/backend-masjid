<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurnalUmumSeeder extends Seeder
{
    public function run()
    {
        DB::table('jurnal_umum')->insert([
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-10',
                'debit' => 1000000.00,
                'kredit' => 0.00,
                'keterangan' => 'Sumbangan dari Hamba Allah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coa_id' => 1,
                'tanggal' => '2024-10-12',
                'debit' => 0.00,
                'kredit' => 200000.00,
                'keterangan' => 'Pembayaran Biaya Operasional',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
