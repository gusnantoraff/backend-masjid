<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InfoMasjidSeeder extends Seeder
{
    public function run()
    {
        DB::table('info_masjid')->insert([
            [
                'nama_masjid' => 'Masjid Al-Falah',
                'alamat' => 'Jl. Merdeka No. 1, Jakarta',
                'kontak' => '081234567890',
                'deskripsi' => 'Masjid Al-Falah adalah masjid besar yang terletak di pusat kota.',
                'ad_art' => 'AD/ART lengkap',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
