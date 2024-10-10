<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosisiKeuanganSeeder extends Seeder
{
    public function run()
    {
        DB::table('posisi_keuangan')->insert([
            [
                'aktiva' => 800000.00,
                'pasiva' => 800000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
