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
                'kode_akun' => '1001',
                'nama_akun' => 'Kas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_akun' => '2001',
                'nama_akun' => 'Piutang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
