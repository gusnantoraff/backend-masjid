<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrphanController;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('users', UserController::class);
Route::apiResource('orphans', OrphanController::class);

Route::middleware(['auth:sanctum', 'verified'])->get('/check-verified', function () {
    return response()->json(['message' => 'Access granted to verified users.']);
});

