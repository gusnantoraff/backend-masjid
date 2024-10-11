<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jamaah extends Model
{
    use HasFactory;

    protected $table = 'jamaah';

    protected $fillable = [
        'nama',
        'birth',
        'gender',
        'email',
        'kontak',
        'alamat',
        'keterangan',
    ];
}
