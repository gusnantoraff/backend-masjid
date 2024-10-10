<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KegiatanSeeder extends Seeder
{
    public function run()
    {
        DB::table('kegiatan')->insert([
            [
                'nama_kegiatan' => 'Pengajian Rutin',
                'tanggal' => '2024-10-20',
                'kategori' => 'umum',
                'keterangan' => 'Pengajian rutin bulanan setiap hari Minggu ketiga.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kegiatan' => 'Shalat Jumat',
                'tanggal' => '2024-10-25',
                'kategori' => 'khatib',
                'keterangan' => 'Shalat Jumat dengan khatib Ustadz Ahmad.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
