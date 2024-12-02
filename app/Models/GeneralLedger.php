<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GeneralLedger extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'general_ledger';

    protected $fillable = [
        'coa_id',
        'tanggal',
        'debit_total',
        'kredit_total',
        'status',
        'deleted_status'
    ];

    public function coa()
    {
        return $this->belongsTo(Coa::class);
    }

    protected $dates = [
        'deleted_at',
    ];

    protected static function boot()
    {
        parent::boot();

        // Saat soft delete
        static::deleting(function ($model) {
            $model->deleted_status = 1;
            $model->save();
        });

        // Saat restore
        static::restoring(function ($model) {
            $model->deleted_status = 0;
            $model->restored_at = now();
            $model->save();
        });

        static::saving(function ($model) {
            $model->calculateTotals();
        });
    }

    public function calculateTotals()
    {
        $coa = $this->coa;

        $debitTotal = $coa->penerimaanKas->sum('jumlah');

        $kreditTotal = $coa->pengeluaranKas->sum('jumlah');

        $this->debit_total = $debitTotal;
        $this->kredit_total = $kreditTotal;
    }
}
