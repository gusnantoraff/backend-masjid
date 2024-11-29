<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PengeluaranKas extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengeluaran_kas';

    protected $fillable = [
        'coa_id',
        'arus_kas_id',
        'jenis',
        'tanggal',
        'jumlah',
        'deskripsi',
        'image',
        'deleted_status'
    ];

    protected $dates = [
        'deleted_at',
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
