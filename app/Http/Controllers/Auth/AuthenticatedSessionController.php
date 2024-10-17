<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Cookie;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $token = $request->user()->createToken('API Token')->plainTextToken;

        $cookie = cookie(
            'api_token',               // Nama cookie
            $token,                    // Nilai token
            60 * 24 * 7,               // Masa berlaku 7 hari (menit)
            '/',                       // Path
            null,                      // Domain (null untuk default)
            true,                      // Secure: gunakan true di lingkungan produksi
            true,                      // HttpOnly: agar tidak bisa diakses oleh JavaScript
            false,                     // SameSite: 'lax' untuk default atau 'strict' jika lebih ketat
        );

        return response()->json([
            'message' => 'Login successful',
            'user' => Auth::user(),
            'token' => $token
        ], 200)->withCookie($cookie);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $cookie = cookie('api_token', '', -1);

        return response()->json(['message' => 'Logout successfully'], 200)
            ->withCookie($cookie);
    }

    public function me(Request $request)
{
    $user = $request->user(); // Dapatkan user dari request

    if ($user) {
        return response()->json([
            'message' => 'User found',
            'user' => $user,
        ], 200);
    }

    return response()->json([
        'message' => 'No user is currently logged in',
    ], 401);
}


}
