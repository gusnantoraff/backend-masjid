<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoaSeeder extends Seeder
{
    public function run()
    {
        DB::table('coa')->insert([
            [
                'general_ledger_id' => 1,
                'kode_akun' => '1001',
                'nama_akun' => 'Kas Masjid',
                'tipe' => 'Aset',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'general_ledger_id' => 1,
                'kode_akun' => '2001',
                'nama_akun' => 'Operasional',
                'tipe' => 'Kewajiban',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
