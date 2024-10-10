<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the kegiatan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $kegiatan = Kegiatan::all();
        return response()->json($kegiatan);
    }

    /**
     * Store a newly created kegiatan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public'); // Menyimpan di storage/app/public/images
            $validatedData['foto'] = $filePath;
        }

        $kegiatan = Kegiatan::create($validatedData);

        return response()->json(['message' => 'Kegiatan created successfully', 'kegiatan' => $kegiatan], 201);
    }

    /**
     * Display the specified kegiatan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        return response()->json($kegiatan);
    }

    /**
     * Update the specified kegiatan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        $validatedData = $request->validate([
            'judul' => 'sometimes|string|max:255',
            'lokasi' => 'sometimes|string|max:255',
            'tanggal' => 'sometimes|date',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public'); // Menyimpan di storage/app/public/images
            $validatedData['foto'] = $filePath;
        }

        $kegiatan->update($validatedData);

        return response()->json(['message' => 'Kegiatan updated successfully', 'kegiatan' => $kegiatan]);
    }

    /**
     * Remove the specified kegiatan from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        $kegiatan->delete();

        return response()->json(['message' => 'Kegiatan deleted successfully']);
    }
}
