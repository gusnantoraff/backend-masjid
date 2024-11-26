<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'coa';

    protected $fillable = [
        'kode_akun',
        'nama_akun',
        'tipe',
        // 'general_ledger_id',
    ];

    protected $dates = [
        'deleted_at',
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

    // Many-to-many relationship with GeneralLedger
    public function generalLedgers()
    {
        return $this->belongsToMany(GeneralLedger::class, 'coa_general_ledger', 'coa_id', 'general_ledger_id')
            ->withTimestamps(); // Include timestamps if you want
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($model) {
            if (!$model->isForceDeleting()) {
                $model->deleted_status = 1;
                $model->saveQuietly();
            }
        });

        static::restoring(function ($model) {
            $model->deleted_status = 0;
            $model->restored_at = now();
            $model->saveQuietly();
        });
    }
}
