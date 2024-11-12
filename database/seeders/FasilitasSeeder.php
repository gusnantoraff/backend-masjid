<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FasilitasSeeder extends Seeder
{
    public function run()
    {
        DB::table('fasilitas')->insert([
            [
                'info_masjid_id' => 1,
                'nama_fasilitas' => 'Parkir Luas',
                'deskripsi' => 'Area parkir dapat menampung hingga 100 kendaraan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'info_masjid_id' => 1,
                'nama_fasilitas' => 'Ruang Ibadah Ber-AC',
                'deskripsi' => 'Ruang ibadah dilengkapi dengan pendingin ruangan untuk kenyamanan jamaah.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
