<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StrukurOrganisasiSeeder extends Seeder
{
    public function run()
    {
        DB::table('struktur_organisasi')->insert([
            [
                'info_masjid_id' => 1,
                'jabatan' => 'Ketua',
                'nama' => 'H. Ahmad',
                'kontak' => '081234567890',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'info_masjid_id' => 1,
                'jabatan' => 'Sekretaris',
                'nama' => 'H. Budi',
                'kontak' => '081234567891',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
