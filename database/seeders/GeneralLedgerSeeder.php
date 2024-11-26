<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralLedgerSeeder extends Seeder
{
    public function run()
    {
        DB::table('general_ledger')->insert([
            [
                // 'coa_id' => 1,
                // 'tanggal' => '2024-10-10',
                'debit_total' => 0.00,
                'kredit_total' => 0.00,
                // 'keterangan' => 'testing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
