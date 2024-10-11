<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mubaligh extends Model
{
    use HasFactory;

    protected $table = 'mubaligh';

    protected $fillable = [
        'info_masjid_id',
        'nama',
        'kontak',
        'alamat',
    ];

    /**
     * Relasi ke model InfoMasjid.
     */
    public function infoMasjid()
    {
        return $this->belongsTo(InfoMasjid::class);
    }
}
