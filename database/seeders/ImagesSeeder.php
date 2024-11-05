<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagesSeeder extends Seeder
{
    public function run()
    {
        DB::table('images')->insert([
            [
                'keterangan' => 'Foto Masjid Al-Falah',
                'kategori' => 'masjid',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'keterangan' => 'Foto Kegiatan Pengajian',
                'kategori' => 'kegiatan',
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
