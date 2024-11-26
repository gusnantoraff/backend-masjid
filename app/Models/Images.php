<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Images extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'image',
        'keterangan',
        'kategori',
        'imageable_id',
    ];

    protected $dates = [
        'deleted_at',
    ];

    /**
     * Get the parent model (Kegiatan, etc.) using imageable_id and kategori.
     */
    public function imageable()
    {
        // Determine the model class based on the kategori value
        switch ($this->kategori) {
            case 'kegiatan':
                return $this->belongsTo(Kegiatan::class, 'imageable_id');
            default:
                return null;
        }
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
