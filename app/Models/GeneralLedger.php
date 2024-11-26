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
        // 'coa_id',
        'tanggal',
        'debit',
        'kredit',
        'keterangan',
    ];

    public function coas()
    {
        return $this->belongsToMany(Coa::class, 'coa_general_ledger', 'general_ledger_id', 'coa_id')
            ->withTimestamps(); // Include timestamps if you want
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
    }
}
