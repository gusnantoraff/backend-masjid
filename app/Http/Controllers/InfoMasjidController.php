<?php

namespace App\Http\Controllers;

use App\Models\InfoMasjid;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InfoMasjidController extends Controller
{
    /**
     * Display a listing of the info_masjid.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $infoMasjid = InfoMasjid::with(['fasilitas', 'mubaligh', 'strukturOrganisasi', 'rekeningBank'])->get();
        return response()->json($infoMasjid);
    }

    /**
     * Store a newly created info_masjid in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Check if InfoMasjid already exists
        if (InfoMasjid::count() > 0) {
            return response()->json(['message' => 'Only one Info Masjid can exist'], 400);
        }

        $validatedData = $request->validate([
            'nama_masjid' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'kontak' => 'nullable|string|max:20',
            'deskripsi' => 'nullable|string|max:1000',
            'ad-art' => 'nullable|string'
        ]);

        $infoMasjid = InfoMasjid::create($validatedData);

        return response()->json(['message' => 'Info Masjid created successfully', 'infoMasjid' => $infoMasjid], 201);
    }


    /**
     * Display the specified info_masjid.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::with(['fasilitas', 'mubaligh', 'strukturOrganisasi', 'rekeningBank'])->find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info Masjid not found'], 404);
        }

        return response()->json($infoMasjid);
    }

    /**
     * Update the specified info_masjid in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info Masjid not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_masjid' => 'sometimes|string|max:255',
            'alamat' => 'sometimes|string|max:500',
            'kontak' => 'nullable|string|max:20',
            'deskripsi' => 'nullable|string|max:1000',
            'ad-art' => 'nullable|string'
        ]);

        $infoMasjid->update($validatedData);

        return response()->json(['message' => 'Info Masjid updated successfully', 'infoMasjid' => $infoMasjid]);
    }

    /**
     * Remove the specified info_masjid from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $infoMasjid = InfoMasjid::find($id);

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info Masjid not found'], 404);
        }

        $infoMasjid->delete();

        return response()->json(['message' => 'Info Masjid deleted successfully']);
    }
}
