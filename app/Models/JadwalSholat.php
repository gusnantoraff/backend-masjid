<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalSholat extends Model
{
    use HasFactory;

    protected $table = 'jadwal_sholat';

    protected $fillable = [
        'tanggal',
        'subuh',
        'dzuhur',
        'ashar',
        'maghrib',
        'isya',
        'deleted_status'
    ];
}
