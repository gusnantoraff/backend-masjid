<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrphanController;
use App\Http\Controllers\KegiatanController;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('users', UserController::class)->parameters([
    'users' => 'user_id'
]);
Route::apiResource('orphans', OrphanController::class)->parameters([
    'orphans' => 'orphan_id'
]);
Route::apiResource('kegiatan', KegiatanController::class)->parameters([
    'kegiatan' => 'kegiatan_id'
]);


Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});

