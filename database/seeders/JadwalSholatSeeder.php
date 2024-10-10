<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalSholatSeeder extends Seeder
{
    public function run()
    {
        DB::table('jadwal_sholat')->insert([
            [
                'tanggal' => '2024-10-10',
                'subuh' => '04:30:00',
                'dzuhur' => '12:00:00',
                'ashar' => '15:30:00',
                'maghrib' => '18:00:00',
                'isya' => '19:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tanggal' => '2024-10-11',
                'subuh' => '04:31:00',
                'dzuhur' => '12:01:00',
                'ashar' => '15:31:00',
                'maghrib' => '18:01:00',
                'isya' => '19:31:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
