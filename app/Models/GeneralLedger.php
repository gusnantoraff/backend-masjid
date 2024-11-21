<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralLedger extends Model
{
    use HasFactory;

    protected $table = 'general_ledger';

    protected $fillable = [
        'coa_id',
        'tanggal',
        'debit',
        'kredit',
        'keterangan',
    ];

    /**
     * Relasi ke model Coa.
     */
    public function coa()
    {
        return $this->belongsTo(Coa::class);
    }

    /**
     * Accessor for dynamic 'debit' value.
     */
    public function getDebitAttribute()
    {
        return $this->coa->penerimaanKas->sum('jumlah');
    }

    /**
     * Accessor for dynamic 'kredit' value.
     */
    public function getKreditAttribute()
    {
        return $this->coa->pengeluaranKas->sum('jumlah');
    }
}
