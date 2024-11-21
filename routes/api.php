<?php

use App\Http\Controllers\ArusKasController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\CoaController;
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\GeneralLedgerController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\InfoMasjidController;
use App\Http\Controllers\JadwalSholatController;
use App\Http\Controllers\JamaahController;
use App\Http\Controllers\JurnalUmumController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanKeuanganController;
use App\Http\Controllers\MubalighController;
use App\Http\Controllers\PenerimaanKasController;
use App\Http\Controllers\PengeluaranKasController;
use App\Http\Controllers\PesanWebsiteController;
use App\Http\Controllers\PosisiKeuanganController;
use App\Http\Controllers\RekeningBankController;
use App\Http\Controllers\StrukturOrganisasiController;
use App\Http\Controllers\TemplateSuratController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YatimDhuafaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ChangePasswordController;

require __DIR__.'/auth.php';

Route::middleware('auth:sanctum')->post('/change-password', [ChangePasswordController::class, 'store']);

Route::middleware('auth.cookie')->get('/me', [AuthenticatedSessionController::class, 'me']);

Route::apiResource('info-masjid', InfoMasjidController::class);
Route::apiResource('mubaligh', MubalighController::class);
Route::apiResource('fasilitas', FasilitasController::class);
Route::apiResource('struktur-organisasi', StrukturOrganisasiController::class);

//keuangan
Route::apiResource('coa', CoaController::class);
Route::apiResource('penerimaan-kas', PenerimaanKasController::class);
Route::apiResource('pengeluaran-kas', PengeluaranKasController::class);
Route::apiResource('arus-kas', ArusKasController::class);
Route::apiResource('general-ledger', GeneralLedgerController::class);
Route::apiResource('jurnal-umum', JurnalUmumController::class);
Route::apiResource('posisi-keuangan', PosisiKeuanganController::class);
Route::apiResource('laporan-keuangan', LaporanKeuanganController::class);
Route::get('laporan-keuangan2/periode', [LaporanKeuanganController::class, 'getPeriode']);


Route::apiResource('pesan-website', PesanWebsiteController::class);
Route::apiResource('yatim-dhuafa', YatimDhuafaController::class);
Route::apiResource('images', ImagesController::class);
Route::apiResource('jamaah', JamaahController::class);
Route::apiResource('template-surat', TemplateSuratController::class);
Route::apiResource('berita', BeritaController::class);
Route::apiResource('jadwal-sholat', JadwalSholatController::class);
Route::apiResource('kegiatan', KegiatanController::class);
Route::apiResource('rekening-bank', RekeningBankController::class);
Route::apiResource('users', UserController::class);

Route::post('/users/{id}/avatar', [UserController::class, 'storeAvatar']);
Route::post('/images/galeri', [ImagesController::class, 'storeForGaleri']);
Route::post('/kegiatan/{id}/upload-foto', [KegiatanController::class, 'uploadPhoto']);
Route::post('/berita/{id}/upload-foto', [BeritaController::class, 'updateFoto']);


Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});
