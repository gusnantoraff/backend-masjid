<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DhuafaSeeder extends Seeder
{
    public function run()
    {
        DB::table('dhuafa')->insert([
            [
                'nama' => 'Budi Santoso',
                'kontak' => '081234567894',
                'alamat' => 'Jl. Kebon Jeruk No. 3, Jakarta',
                'birth' => '1990-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Ani Susanti',
                'kontak' => '081234567895',
                'alamat' => 'Jl. Kembang Sepatu No. 4, Bandung',
                'birth' => '1990-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
