<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'kegiatan';

    protected $fillable = [
        'nama_kegiatan',
        'tanggal',
        'lokasi',
        'kategori',
        'keterangan'
    ];
    public function images()
    {
        return $this->hasMany(Images::class, 'imageable_id')->where('kategori', 'kegiatan');
    }

}
