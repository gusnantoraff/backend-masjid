<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'keterangan',
        'kategori',
        'kegiatan_id',
    ];

    // Define the inverse of the relationship: An image belongs to one kegiatan
    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }
}
