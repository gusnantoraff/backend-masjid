<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['nullable', 'digits_between:10,13'],
            'birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:Male,Female'],
            'role' => ['nullable', 'in:ADMIN,PENGURUS_MASJID'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Optional avatar
        ]);

        $imagePath = $request->hasFile('avatar') 
            ? $request->file('avatar')->store('avatars', 'public') 
            : null;

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'birth' => $request->birth,
            'gender' => $request->gender,
            'role' => $request->role ?? 'PENGURUS_MASJID',
            'avatar' => $imagePath, // Save avatar path if uploaded
        ]);

        event(new Registered($user));
        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }
}
