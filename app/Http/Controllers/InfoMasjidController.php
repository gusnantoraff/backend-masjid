<?php

namespace App\Http\Controllers;

use App\Models\InfoMasjid;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InfoMasjidController extends Controller
{
    /**
     * Display a listing of the info masjid.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $infoMasjid = InfoMasjid::all();
        return response()->json($infoMasjid);
    }

    /**
     * Store a newly created info masjid in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama_masjid' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'kontak' => 'required|string|max:50',
            'deskripsi' => 'nullable|string',
            'ad-art' => 'nullable|string',
        ]);

        $infoMasjid = InfoMasjid::create($validatedData);

        return response()->json(['message' => 'Info masjid created successfully', 'info_masjid' => $infoMasjid], 201);
    }

    /**
     * Display the specified info masjid.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info masjid not found'], 404);
        }

        return response()->json($infoMasjid);
    }

    /**
     * Update the specified info masjid in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info masjid not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_masjid' => 'sometimes|string|max:255',
            'alamat' => 'sometimes|string|max:500',
            'kontak' => 'sometimes|string|max:50',
            'deskripsi' => 'nullable|string',
            'ad-art' => 'nullable|string',
        ]);

        $infoMasjid->update($validatedData);

        return response()->json(['message' => 'Info masjid updated successfully', 'info_masjid' => $infoMasjid]);
    }

    /**
     * Remove the specified info masjid from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info masjid not found'], 404);
        }

        $infoMasjid->delete();

        return response()->json(['message' => 'Info masjid deleted successfully']);
    }
}
