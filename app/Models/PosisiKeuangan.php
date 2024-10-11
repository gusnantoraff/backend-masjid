<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosisiKeuangan extends Model
{
    use HasFactory;

    protected $table = 'posisi_keuangan';

    protected $fillable = [
        'aktiva',
        'pasiva',
    ];
}
