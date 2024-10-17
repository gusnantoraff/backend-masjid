<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'firstname' => 'Gusnanto',
                'lastname' => 'Rafly',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'phone' => '081234567890',
                'birth' => '1990-01-01',
                'gender' => 'Male',
                'role' => 'ADMIN',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'firstname' => 'Gusnanto',
                'lastname' => 'Rafly',
                'email' => 'gusnantoid@gmail.com',
                'password' => Hash::make('rafly7903'),
                'phone' => '081234567890',
                'birth' => '1990-01-01',
                'gender' => 'Male',
                'role' => 'ADMIN',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'firstname' => 'Fivi',
                'lastname' => 'Gendut',
                'email' => 'aulia.fivi910@gmail.com',
                'password' => Hash::make('sayang910'),
                'phone' => '081234567890',
                'birth' => '1990-01-01',
                'gender' => 'Female',
                'role' => 'ADMIN',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
