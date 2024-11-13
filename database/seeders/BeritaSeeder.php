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
                'kategori' => 'berita',
                'status' => 'published',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Berita Kedua',
                'konten' => 'Ini adalah konten berita kedua.',
                'tanggal_publikasi' => '2024-10-16',
                'kategori' => 'sport',
                'status' => 'draft',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Berita Ketiga',
                'konten' => 'Ini adalah konten berita ketiga.',
                'tanggal_publikasi' => '2024-10-17',
                'kategori' => 'teknologi',
                'status' => 'archived',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
