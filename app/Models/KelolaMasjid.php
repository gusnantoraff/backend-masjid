<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelolaMasjid extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_masjid',
        'phone_number',
        'kategori',
        'provinsi',
        'kota',
        'kecamatan', // New field
        'desa', // New field
        'RW', // New field
        'alamat_lengkap', // New field
        'description_text', // New field
        'luas_tanah',
        'status_tanah',
        'luas_bangunan',
        'tahun_berdiri',
        'jumlah_jamaah',
        'jumlah_muazin',
        'jumlah_khatib',
        'jumlah_remaja', // New field
        'website', // New field
    ];
}
