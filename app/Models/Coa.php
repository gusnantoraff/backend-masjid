<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coa extends Model
{
    use HasFactory;

    protected $table = 'coa';

    protected $fillable = [
        'kode_akun',
        'nama_akun',
    ];

    /**
     * Relasi ke model PenerimaanKas.
     */
    public function penerimaanKas()
    {
        return $this->hasMany(PenerimaanKas::class);
    }

    /**
     * Relasi ke model PengeluaranKas.
     */
    public function pengeluaranKas()
    {
        return $this->hasMany(PengeluaranKas::class);
    }

    public function jurnalUmum()
    {
        return $this->hasMany(JurnalUmum::class);
    }

    public function generalLedger()
    {
        return $this->hasMany(GeneralLedger::class);
    }
}
