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
                'judul' => 'Berita Pertama',
                'konten' => 'Ini adalah konten berita pertama.',
                'tanggal_publikasi' => '2024-10-15',
                'kategori' => 'Umum',
                'status' => 'published',
                'foto' => 'foto_berita_1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Berita Kedua',
                'konten' => 'Ini adalah konten berita kedua.',
                'tanggal_publikasi' => '2024-10-16',
                'kategori' => 'Olahraga',
                'status' => 'draft',
                'foto' => 'foto_berita_2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Berita Ketiga',
                'konten' => 'Ini adalah konten berita ketiga.',
                'tanggal_publikasi' => '2024-10-17',
                'kategori' => 'Teknologi',
                'status' => 'archived',
                'foto' => 'foto_berita_3.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
