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
        'imageable_id',
    ];

    /**
     * Get the parent model (Kegiatan, etc.) using imageable_id and kategori.
     */
    public function imageable()
    {
        // Determine the model class based on the kategori value
        switch ($this->kategori) {
            case 'kegiatan':
                return $this->belongsTo(Kegiatan::class, 'imageable_id');
            default:
                return null;
        }
    }
}
