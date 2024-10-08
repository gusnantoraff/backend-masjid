<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password as PasswordRule;

class UserController extends Controller
{
    /**
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Show a specific user by ID.
     *
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $user_id): JsonResponse
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, int $user_id): JsonResponse
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'firstname' => ['sometimes', 'required', 'string', 'max:255'],
            'lastname' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,' . $user_id],
            'password' => ['sometimes', 'required', 'confirmed', PasswordRule::defaults()],
            'phone' => ['sometimes', 'required', 'digits_between:10,13'],
            'birth' => ['sometimes', 'required', 'date'],
            'gender' => ['sometimes', 'required', 'in:Male,Female'],
            'role' => ['sometimes', 'required', 'in:Super Admin,Admin,Jemaah'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->update($request->only(['firstname', 'lastname', 'email', 'password', 'phone', 'birth', 'gender', 'role']));

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    /**
     * Delete a specific user by ID.
     *
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $user_id): JsonResponse
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
