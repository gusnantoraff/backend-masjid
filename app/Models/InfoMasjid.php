<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoMasjid extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_masjid',
        'alamat',
        'kontak',
        'deskripsi',
        'ad-art'
    ];
}
