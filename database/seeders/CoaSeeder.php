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
                'nama_akun' => 'Kas Masjid',
                'tipe' => 'Kas Masjid',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_akun' => '2001',
                'nama_akun' => 'Operasional',
                'tipe' => 'Kewajiban',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
