<?php

$resources = [
    'users' => \App\Http\Controllers\UserController::class,
    'berita' => \App\Http\Controllers\BeritaController::class,
    'coa' => \App\Http\Controllers\CoaController::class,
    'fasilitas' => \App\Http\Controllers\FasilitasController::class,
    'general-ledger' => \App\Http\Controllers\GeneralLedgerController::class,
    'images' => \App\Http\Controllers\ImagesController::class,
    'info-masjid' => \App\Http\Controllers\InfoMasjidController::class,
    'jamaah' => \App\Http\Controllers\JamaahController::class,
    'kegiatan' => \App\Http\Controllers\KegiatanController::class,
    'laporan-keuangan' => \App\Http\Controllers\LaporanKeuanganController::class,
    'mubaligh' => \App\Http\Controllers\MubalighController::class,
    'pesan-website' => \App\Http\Controllers\PesanWebsiteController::class,
    'arus-kas' => \App\Http\Controllers\ArusKasController::class,
    'penerimaan-kas' => \App\Http\Controllers\PenerimaanKasController::class,
    'pengeluaran-kas' => \App\Http\Controllers\PengeluaranKasController::class,
    'rekening-bank' => \App\Http\Controllers\RekeningBankController::class,
    'posisi-keuangan' => \App\Http\Controllers\PosisiKeuanganController::class,
    'struktur-organisasi' => \App\Http\Controllers\StrukturOrganisasiController::class,
    'template-surat' => \App\Http\Controllers\TemplateSuratController::class,
    'yatim-dhuafa' => \App\Http\Controllers\YatimDhuafaController::class,
];

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\LaporanKeuanganController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\EncryptionController;

Route::get('encrypt', [EncryptionController::class, 'encryptLink']);
Route::post('decrypt', [EncryptionController::class, 'decryptLink']);


require __DIR__ . '/auth.php';

Route::middleware('auth:sanctum')->post('/change-password', [ChangePasswordController::class, 'store']);

Route::middleware('auth.cookie')->get('/me', [AuthenticatedSessionController::class, 'me']);

Route::middleware('auth:sanctum')->group(function () use ($resources) {

    foreach ($resources as $route => $controller) {
        Route::apiResource($route, $controller);
        Route::patch("$route/{id}/restore", [$controller, 'restore'])->name("$route.restore");
    }

    Route::get('laporan-keuangan2/periode', [LaporanKeuanganController::class, 'getPeriode']);
    Route::post('/users/{id}/avatar', [UserController::class, 'storeAvatar']);
    Route::post('/images/galeri', [ImagesController::class, 'storeForGaleri']);
    Route::post('/kegiatan/{id}/upload-foto', [KegiatanController::class, 'uploadPhoto']);
    Route::post('/berita/{id}/upload-foto', [BeritaController::class, 'updateFoto']);
});


Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});
