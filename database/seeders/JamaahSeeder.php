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
                'nama' => 'John Doe',
                'birth' => '1980-01-01',
                'gender' => 'pria',
                'email' => 'johndoe@example.com',
                'kontak' => '081234567890',
                'keterangan' => 'aktif',
                'alamat' => 'Jl. Merdeka No. 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Jane Doe',
                'birth' => '1985-02-02',
                'gender' => 'wanita',
                'email' => 'janedoe@example.com',
                'kontak' => '081234567891',
                'keterangan' => 'pindah',
                'alamat' => 'Jl. Merdeka No. 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
