<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenerimaanKas extends Model
{
    use HasFactory;

    protected $table = 'penerimaan_kas';

    protected $fillable = [
        'coa_id',
        'tanggal',
        'jumlah',
        'keterangan',
        'image',
    ];

    /**
     * Relasi ke model Coa.
     */
    public function coa()
    {
        return $this->belongsTo(Coa::class);
    }
}
