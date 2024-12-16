<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TemplateSuratSeeder extends Seeder
{
    public function run()
    {
        DB::table('template_surat')->insert([
            [
                'judul_surat' => 'Surat Permohonan Izin',
                'isi_surat' => 'Yth. Bapak/Ibu di Tempat, dengan ini kami memohon izin untuk...',
                'tanggal' => "2024-10-10",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul_surat' => 'Surat Undangan Rapat',
                'isi_surat' => 'Kepada Yth. Pengurus Masjid, kami mengundang untuk menghadiri rapat...',
                'tanggal' => "2024-10-10",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
