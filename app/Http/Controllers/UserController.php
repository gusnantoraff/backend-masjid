<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password as PasswordRule;

class UserController extends Controller
{
    /**
     * Get all users.
     */
    public function index(): JsonResponse
    {
        $users = User::all();

        return response()->json($users);
    }

    public function getDeleted()
    {
        $deletedData = User::onlyTrashed()->get();
        return response()->json($deletedData);
    }

    /**
     * Show a specific user by ID.
     */
    public function show(int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update a user's data, including avatar.
     *
     * @param  int  $id
     */

    /**
     * Create a new user.
     */
    public function store(Request $request): JsonResponse
    {
        // Validasi data user
        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', PasswordRule::defaults()],
            'phone' => ['required', 'digits_between:10,13'],
            'birth' => ['required', 'date'],
            'gender' => ['required', 'in:Male,Female'],
            'role' => ['required', 'in:ADMIN,PENGURUS_MASJID'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buat user baru
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Enkripsi password
            'phone' => $request->phone,
            'birth' => $request->birth,
            'gender' => $request->gender,
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validasi data user (tanpa avatar)
        $validator = Validator::make($request->all(), [
            'firstname' => ['sometimes', 'string', 'max:255'],
            'lastname' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,' . $id],
            'password' => ['sometimes', 'confirmed', PasswordRule::defaults()],
            'phone' => ['sometimes', 'digits_between:10,13'],
            'birth' => ['sometimes', 'date'],
            'gender' => ['sometimes', 'in:Male,Female'],
            'role' => ['sometimes', 'in:ADMIN,PENGURUS_MASJID'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update field selain avatar
        $user->update($request->all());

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function storeAvatar(Request $request, int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validasi avatar
        $validator = Validator::make($request->all(), [
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Hapus avatar lama (jika ada)
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Simpan avatar baru
        $imagePath = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $imagePath;
        $user->save();

        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'avatar' => $imagePath,
        ]);
    }

    /**
     * Delete a specific user by ID.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $users = User::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted users found for the given IDs'], 404);
        }

        foreach ($users as $user) {
            $user->restore();
        }

        return response()->json(['message' => 'User records restored successfully']);
    }
}
