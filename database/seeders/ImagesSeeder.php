<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagesSeeder extends Seeder
{
    public function run()
    {
        // Get kegiatan IDs to use as foreign keys
        $kegiatanPengajian = DB::table('kegiatan')->where('nama_kegiatan', 'Pengajian Rutin')->first();
        $kegiatanShalatJumat = DB::table('kegiatan')->where('nama_kegiatan', 'Shalat Jumat')->first();

        if ($kegiatanPengajian && $kegiatanShalatJumat) {
            DB::table('images')->insert([
                [
                    'keterangan' => 'Foto Kegiatan Pengajian',
                    'kategori' => 'kegiatan',
                    'image' => null, // Assuming you will add an image later
                    'kegiatan_id' => $kegiatanPengajian->id, // Link to Pengajian Rutin
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'keterangan' => 'Foto Shalat Jumat',
                    'kategori' => 'kegiatan',
                    'image' => null, // Assuming you will add an image later
                    'kegiatan_id' => $kegiatanShalatJumat->id, // Link to Shalat Jumat
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
