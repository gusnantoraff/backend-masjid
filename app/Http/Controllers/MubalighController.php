<?php

namespace App\Http\Controllers;

use App\Models\Mubaligh;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MubalighController extends Controller
{
    /**
     * Display a listing of the mubaligh.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $mubaligh = Mubaligh::with('infoMasjid')->get();
        return response()->json($mubaligh);
    }

    /**
     * Store a newly created mubaligh in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'info_masjid_id' => 'required|exists:info_masjid,id',
            'nama' => 'required|string|max:255',
            'kontak' => 'nullable|string|max:255',
            'alamat' => 'nullable|string|max:500',
        ]);

        $mubaligh = Mubaligh::create($validatedData);

        return response()->json(['message' => 'Mubaligh created successfully', 'mubaligh' => $mubaligh], 201);
    }

    /**
     * Display the specified mubaligh.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $mubaligh = Mubaligh::with('infoMasjid')->find($id);

        if (!$mubaligh) {
            return response()->json(['message' => 'Mubaligh not found'], 404);
        }

        return response()->json($mubaligh);
    }

    /**
     * Update the specified mubaligh in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $mubaligh = Mubaligh::find($id);

        if (!$mubaligh) {
            return response()->json(['message' => 'Mubaligh not found'], 404);
        }

        $validatedData = $request->validate([
            'info_masjid_id' => 'sometimes|exists:info_masjid,id',
            'nama' => 'sometimes|string|max:255',
            'kontak' => 'nullable|string|max:255',
            'alamat' => 'nullable|string|max:500',
        ]);

        $mubaligh->update($validatedData);

        return response()->json(['message' => 'Mubaligh updated successfully', 'mubaligh' => $mubaligh]);
    }

    /**
     * Remove the specified mubaligh from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $mubaligh = Mubaligh::find($id);

        if (!$mubaligh) {
            return response()->json(['message' => 'Mubaligh not found'], 404);
        }

        $mubaligh->delete();

        return response()->json(['message' => 'Mubaligh deleted successfully']);
    }
}
