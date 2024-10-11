<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
    use HasFactory;

    protected $table = 'fasilitas';

    protected $fillable = [
        'info_masjid_id',
        'nama_fasilitas',
        'deskripsi',
    ];

    /**
     * Relasi ke model InfoMasjid.
     */
    public function infoMasjid()
    {
        return $this->belongsTo(InfoMasjid::class);
    }
}
