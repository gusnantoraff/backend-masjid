<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordResetLinkController extends Controller
{
    /**
     * PasswordResetLinkController constructor.
     *
     * Apply rate limiting to avoid abuse of the password reset request.
     */
    public function __construct()
    {
        // Limit to 5 attempts per minute to prevent abuse
        $this->middleware('throttle:5,1');
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request to ensure an email is provided
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Attempt to send the password reset link to the provided email address
        $status = Password::sendResetLink($request->only('email'));

        // Handle the different statuses returned by the sendResetLink method
        switch ($status) {
            case Password::RESET_LINK_SENT:
                return response()->json(['status' => 'If the email is registered, you will receive a reset link shortly.']);

            case Password::INVALID_USER:
                // Optional: you can handle the invalid user status differently if needed
                throw ValidationException::withMessages([
                    'email' => [__('The email address is not registered.')],
                ]);

            default:
                // Catch-all for any unexpected statuses
                throw ValidationException::withMessages([
                    'email' => [__('An unexpected error occurred. Please try again later.')],
                ]);
        }
    }
}
