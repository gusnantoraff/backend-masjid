<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PesanWebsiteSeeder extends Seeder
{
    public function run()
    {
        DB::table('pesan_website')->insert([
            [
                'nama_pengirim' => 'Ali Ahmad',
                'email' => 'ali@example.com',
                'pesan' => 'Terima kasih atas informasi mengenai kegiatan masjid.',
                'tanggal' => '2024-10-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pengirim' => 'Siti Rahma',
                'email' => 'siti@example.com',
                'pesan' => 'Saya ingin berpartisipasi dalam kegiatan sosial.',
                'tanggal' => '2024-10-16',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
