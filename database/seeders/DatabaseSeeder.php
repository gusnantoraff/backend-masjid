<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([
            UsersTableSeeder::class,
            InfoMasjidSeeder::class,
            FasilitasSeeder::class,
            MubalighSeeder::class,
            RekeningBankSeeder::class,
            StrukurOrganisasiSeeder::class,
            CoaSeeder::class,
            PenerimaanKasSeeder::class,
            PengeluaranKasSeeder::class,
            ArusKasSeeder::class,
            GeneralLedgerSeeder::class,
            JurnalUmumSeeder::class,
            PosisiKeuanganSeeder::class,
            PesanWebsiteSeeder::class,
            LaporanKeuanganSeeder::class,
            ImagesSeeder::class,
            JamaahSeeder::class,
            TemplateSuratSeeder::class,
            BeritaSeeder::class,
            JadwalSholatSeeder::class,
            KegiatanSeeder::class,
            YatimDhuafaSeeder::class,
        ]);
    }
}
