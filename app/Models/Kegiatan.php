<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatan';

    protected $fillable = [
        'nama_kegiatan',
        'tanggal',
        'lokasi',
        'kategori',
        'keterangan',
    ];

    // Define the one-to-many relationship: A kegiatan has many images
    public function images()
    {
        return $this->hasMany(Images::class);
    }
}
