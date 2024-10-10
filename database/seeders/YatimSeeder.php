<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class YatimSeeder extends Seeder
{
    public function run()
    {
        DB::table('yatim')->insert([
            [
                'nama' => 'Ahmad Fauzi',
                'usia' => 12,
                'alamat' => 'Jl. Setiabudi No. 6, Jakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Rina Hartati',
                'usia' => 10,
                'alamat' => 'Jl. Kembang Kuning No. 8, Bandung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
