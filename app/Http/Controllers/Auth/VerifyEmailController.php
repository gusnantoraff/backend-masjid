<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param \Illuminate\Foundation\Auth\EmailVerificationRequest $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function __invoke(EmailVerificationRequest $request): JsonResponse|RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            // Return a JSON response for Postman if the email is already verified
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Email is already verified.'], 200);
            }

            // Redirect if it's a web request
            return redirect()->intended(config('app.frontend_url').'/dashboard?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // Return a JSON response for Postman after successful verification
        if ($request->wantsJson()) {
            return response()->json(['message' => 'Email has been successfully verified.'], 200);
        }

        // Redirect if it's a web request
        return redirect()->intended(config('app.frontend_url').'/dashboard?verified=1');
    }
}
