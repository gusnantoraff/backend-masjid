<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
                'image' => 'default.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
