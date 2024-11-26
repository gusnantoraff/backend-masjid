<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kegiatan extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'kegiatan';

    protected $fillable = [
        'nama_kegiatan',
        'tanggal',
        'lokasi',
        'kategori',
        'keterangan'
    ];

    protected $dates = [
        'deleted_at',
    ];

    public function images()
    {
        return $this->hasMany(Images::class, 'imageable_id')->where('kategori', 'kegiatan');
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
