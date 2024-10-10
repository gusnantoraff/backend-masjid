<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MubalighSeeder extends Seeder
{
    public function run()
    {
        DB::table('mubaligh')->insert([
            [
                'info_masjid_id' => 1,
                'nama' => 'Ustadz Abdul Somad',
                'kontak' => '081234567892',
                'alamat' => 'Jl. Sudirman No. 5, Jakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'info_masjid_id' => 2,
                'nama' => 'Ustadz Adi Hidayat',
                'kontak' => '081234567893',
                'alamat' => 'Jl. Diponegoro No. 7, Bandung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
