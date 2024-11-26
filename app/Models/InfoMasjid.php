<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InfoMasjid extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'info_masjid';

    protected $fillable = [
        'nama_masjid',
        'alamat',
        'kontak',
        'deskripsi',
        'ad-art',
    ];

    protected $dates = [
        'deleted_at',
    ];

    /**
     * Relasi ke model Fasilitas.
     */
    public function fasilitas()
    {
        return $this->hasMany(Fasilitas::class);
    }

    /**
     * Relasi ke model Mubaligh.
     */
    public function mubaligh()
    {
        return $this->hasMany(Mubaligh::class);
    }

    public function strukturOrganisasi()
    {
        return $this->hasMany(StrukturOrganisasi::class);
    }

    public function rekeningBank()
    {
        return $this->hasMany(RekeningBank::class);
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
