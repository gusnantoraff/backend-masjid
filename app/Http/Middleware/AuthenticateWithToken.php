<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthenticateWithToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Ambil token dari cookie
        $token = $request->cookie('api_token');

        if ($token) {
            // Cari token di database menggunakan Sanctum atau model PersonalAccessToken
            $accessToken = PersonalAccessToken::findToken($token);

            if ($accessToken && $accessToken->tokenable) {
                // Login pengguna terkait token ini
                Auth::login($accessToken->tokenable);

                return $next($request); // Ijinkan akses ke resource
            }
        }

        // Jika token tidak valid, kembalikan respons error atau redirect
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
