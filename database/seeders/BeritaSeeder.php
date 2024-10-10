<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BeritaSeeder extends Seeder
{
    public function run()
    {
        DB::table('berita')->insert([
            [
                'judul' => 'Kegiatan Bakti Sosial',
                'konten' => 'Pada tanggal 20 Oktober 2024, Masjid Al-Falah mengadakan kegiatan bakti sosial...',
                'tanggal_publikasi' => '2024-10-20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Pengajian Akbar',
                'konten' => 'Pengajian akbar akan diselenggarakan pada tanggal 25 Oktober 2024...',
                'tanggal_publikasi' => '2024-10-25',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
