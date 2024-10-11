<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'berita';
    protected $fillable = [
        'judul',
        'konten',
        'tanggal_publikasi',
        'kategori',
        'status',
        'foto'
    ];
}