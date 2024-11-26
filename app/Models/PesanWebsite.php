<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PesanWebsite extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pesan_website';

    protected $fillable = [
        'nama_pengirim',
        'email',
        'pesan',
        'tanggal',
    ];

    protected $dates = [
        'deleted_at',
    ];

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
