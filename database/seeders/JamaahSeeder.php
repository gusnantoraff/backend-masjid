<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JamaahSeeder extends Seeder
{
    public function run()
    {
        DB::table('jamaah')->insert([
            [
                'nama' => 'H. Sulaiman',
                'email' => 'sulaimann@gmail.com',
                'kontak' => '081234567896',
                'alamat' => 'Jl. Melati No. 10, Jakarta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Hj. Aminah',
                'email' => 'aminah@gmail.com',
                'kontak' => '081234567897',
                'alamat' => 'Jl. Mawar No. 12, Bandung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
