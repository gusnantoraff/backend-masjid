<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RekeningBankSeeder extends Seeder
{
    public function run()
    {
        DB::table('rekening_bank')->insert([
            [
                'info_masjid_id' => 1,
                'nama_bank' => 'Bank Mandiri',
                'nomor_rekening' => '1234567890',
                'atas_nama' => 'Masjid Al-Falah',
                'image_transfer' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'info_masjid_id' => 2,
                'nama_bank' => 'Bank BRI',
                'nomor_rekening' => '0987654321',
                'atas_nama' => 'Masjid Al-Ikhlas',
                'image_transfer' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
