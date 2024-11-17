<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LaporanKeuanganSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            DB::table('laporan_keuangan')->insert([
                'periode' => '2024-11-' . $faker->numberBetween(1, 30),
                'total_pemasukan' => $faker->numberBetween(1000000, 5000000),
                'total_pengeluaran' => $faker->numberBetween(500000, 3000000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        foreach (range(1, 5) as $index) {
            DB::table('laporan_keuangan')->insert([
                'periode' => '2024-10-' . $faker->numberBetween(1, 30),
                'total_pemasukan' => $faker->numberBetween(1000000, 5000000),
                'total_pengeluaran' => $faker->numberBetween(500000, 3000000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        foreach (range(1, 5) as $index) {
            DB::table('laporan_keuangan')->insert([
                'periode' => '2023-11-' . $faker->numberBetween(1, 30),
                'total_pemasukan' => $faker->numberBetween(1000000, 5000000),
                'total_pengeluaran' => $faker->numberBetween(500000, 3000000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
