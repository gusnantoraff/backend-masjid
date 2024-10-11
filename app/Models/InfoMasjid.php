<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoMasjid extends Model
{
    use HasFactory;

    protected $table = 'info_masjid';

    protected $fillable = [
        'nama_masjid',
        'alamat',
        'kontak',
        'deskripsi',
        'ad-art'
    ];

    /**
     * Relasi ke model Fasilitas.
     */
    public function fasilitas()
    {
        return $this->hasMany(Fasilitas::class);
    }

    /**
     * Relasi ke model Mubaligh.
     */
    public function mubaligh()
    {
        return $this->hasMany(Mubaligh::class);
    }

    public function strukturOrganisasi()
    {
        return $this->hasMany(StrukturOrganisasi::class);
    }

    public function rekeningBank()
    {
        return $this->hasMany(RekeningBank::class);
    }
}
