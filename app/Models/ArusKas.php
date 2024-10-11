<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArusKas extends Model
{
    use HasFactory;

    protected $table = 'arus_kas';

    protected $fillable = [
        'penerimaan_kas_id',
        'pengeluaran_kas_id',
        'tanggal',
        'pemasukan',
        'pengeluaran',
    ];

    /**
     * Relasi ke model PenerimaanKas.
     */
    public function penerimaanKas()
    {
        return $this->belongsTo(PenerimaanKas::class, 'penerimaan_kas_id');
    }

    /**
     * Relasi ke model PengeluaranKas.
     */
    public function pengeluaranKas()
    {
        return $this->belongsTo(PengeluaranKas::class, 'pengeluaran_kas_id');
    }
}
