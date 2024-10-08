<?php

use App\Http\Controllers\KelolaMasjidController;
use App\Http\Controllers\OrphanController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', UserController::class);
Route::apiResource('orphans', OrphanController::class);
Route::apiResource('kelola-masjids', KelolaMasjidController::class);

Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});
