<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StrukturOrganisasi extends Model
{
    use HasFactory;

    protected $table = 'struktur_organisasi';

    protected $fillable = [
        'info_masjid_id',
        'jabatan',
        'nama',
        'kontak',
    ];

    /**
     * Relasi ke model InfoMasjid.
     */
    public function infoMasjid()
    {
        return $this->belongsTo(InfoMasjid::class);
    }
}
