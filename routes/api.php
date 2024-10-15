<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\InfoMasjidController;
use App\Http\Controllers\RekeningBankController;
use App\Http\Controllers\YatimDhuafaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MubalighController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\StrukturOrganisasiController;
use App\Http\Controllers\CoaController;
use App\Http\Controllers\PenerimaanKasController;
use App\Http\Controllers\PengeluaranKasController;
use App\Http\Controllers\ArusKasController;
use App\Http\Controllers\GeneralLedgerController;
use App\Http\Controllers\JurnalUmumController;
use App\Http\Controllers\PosisiKeuanganController;
use App\Http\Controllers\PesanWebsiteController;
use App\Http\Controllers\LaporanKeuanganController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\JamaahController;
use App\Http\Controllers\TemplateSuratController;
use App\Http\Controllers\JadwalSholatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('info-masjid', InfoMasjidController::class);
Route::apiResource('mubaligh', MubalighController::class);
Route::apiResource('fasilitas', FasilitasController::class);
Route::apiResource('struktur-organisasi', StrukturOrganisasiController::class);
Route::apiResource('coa', CoaController::class);
Route::apiResource('penerimaan-kas', PenerimaanKasController::class);
Route::apiResource('pengeluaran-kas', PengeluaranKasController::class);
Route::apiResource('arus-kas', ArusKasController::class);
Route::apiResource('general-ledger', GeneralLedgerController::class);
Route::apiResource('jurnal-umum', JurnalUmumController::class);
Route::apiResource('posisi-keuangan', PosisiKeuanganController::class);
Route::apiResource('pesan-website', PesanWebsiteController::class);
Route::apiResource('laporan-keuangan', LaporanKeuanganController::class);
Route::apiResource('yatim-dhuafa', YatimDhuafaController::class);
Route::apiResource('images', ImagesController::class);
Route::apiResource('jamaah', JamaahController::class);
Route::apiResource('template-surat', TemplateSuratController::class);
Route::apiResource('berita', BeritaController::class);
Route::apiResource('jadwal-sholat', JadwalSholatController::class);
Route::apiResource('kegiatan', KegiatanController::class);
Route::apiResource('rekening-bank', RekeningBankController::class);
Route::apiResource('users', UserController::class);


Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});
