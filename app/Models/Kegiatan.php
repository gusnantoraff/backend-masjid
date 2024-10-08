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

    protected $primaryKey = 'kegiatan_id';
    protected $fillable = [
        'judul',
        'lokasi',
        'tanggal',
        'foto'
    ];
}
