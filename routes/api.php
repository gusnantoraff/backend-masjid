<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\InfoMasjidController;
use App\Http\Controllers\YatimController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', UserController::class);
Route::apiResource('yatim', YatimController::class);
Route::apiResource('kegiatan', KegiatanController::class);
Route::apiResource('berita', BeritaController::class);
Route::apiResource('info_masjid', InfoMasjidController::class);

Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});
