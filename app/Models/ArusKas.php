<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArusKas extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'arus_kas';

    protected $fillable = [
        'pemasukan_total',
        'pengeluaran_total',
        'sisa_kas_total',
        'deleted_status'
    ];

    protected $dates = [
        'deleted_at',
    ];

    public function penerimaanKas()
    {
        return $this->hasMany(PenerimaanKas::class);
    }

    public function pengeluaranKas()
    {
        return $this->hasMany(PengeluaranKas::class);
    }

    public function updateTotals()
    {
        $this->pemasukan_total = $this->penerimaanKas()->sum('jumlah') ?: 0; 
        $this->pengeluaran_total = $this->pengeluaranKas()->sum('jumlah') ?: 0; 

        $this->sisa_kas_total = $this->pemasukan_total - $this->pengeluaran_total;

        $this->save();
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
