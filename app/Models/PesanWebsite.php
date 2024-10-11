<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesanWebsite extends Model
{
    use HasFactory;

    protected $table = 'pesan_website';

    protected $fillable = [
        'nama_pengirim',
        'email',
        'pesan',
        'tanggal',
    ];
}
