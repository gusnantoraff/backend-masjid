<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RekeningBank extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'rekening_bank';

    protected $fillable = [
        'info_masjid_id',
        'nama_bank',
        'nomor_rekening',
        'atas_nama',
        'image_transfer',
    ];

    protected $dates = [
        'deleted_at',
    ];

    /**
     * Relasi ke model InfoMasjid.
     */
    public function infoMasjid()
    {
        return $this->belongsTo(InfoMasjid::class);
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
