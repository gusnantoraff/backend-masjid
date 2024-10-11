<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class YatimDhuafaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('yatim_dhuafa')->insert([
            [
                'nama' => 'Ahmad Yatim',
                'birth' => '2010-03-03',
                'alamat' => 'Jl. Sudirman No. 1',
                'keterangan' => 'yatim',
                'kontak' => '081234567892',
                'status' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Budi Duafa',
                'birth' => '2012-04-04',
                'alamat' => 'Jl. Sudirman No. 2',
                'keterangan' => 'duafa',
                'kontak' => '081234567893',
                'status' => 'pindah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
