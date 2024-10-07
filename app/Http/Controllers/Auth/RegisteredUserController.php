<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['required', 'digits_between:10,13'],
            'birth' => ['required', 'date'],
            'gender' => ['required', 'in:Male,Female'],
            'role' => ['required', 'in:Super Admin,Admin,Jemaah'],
        ]);
    
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'birth' => $request->birth,
            'gender' => $request->gender,
            'role' => $request->role,
        ]);
    
        event(new Registered($user));
        Auth::login($user);
    
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    
}
