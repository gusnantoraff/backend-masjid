<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralLedger extends Model
{
    use HasFactory;

    protected $table = 'general_ledger';

    protected $fillable = [
        // 'coa_id',
        'tanggal',
        'debit',
        'kredit',
        'keterangan',
    ];

    // Many-to-many relationship with Coa
    public function coas()
    {
        return $this->belongsToMany(Coa::class, 'coa_general_ledger', 'general_ledger_id', 'coa_id')
            ->withTimestamps(); // Include timestamps if you want
    }
}
