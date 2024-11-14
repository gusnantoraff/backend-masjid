<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengeluaranKas extends Model
{
    use HasFactory;

    protected $table = 'pengeluaran_kas';

    protected $fillable = [
        'coa_id',
        'arus_kas_id',
        'jenis',
        'tanggal',
        'jumlah',
        'deskripsi',
        'image',
    ];

    /**
     * Relasi ke model Coa.
     */
    public function coa()
    {
        return $this->belongsTo(Coa::class);
    }

    public function arus_kas()
    {
        return $this->belongsTo(Coa::class, 'arus_kas_id');
    }
}
