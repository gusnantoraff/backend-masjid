<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BeritaController extends Controller
{
    /**
     * Display a listing of the berita.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $berita = Berita::all();
        return response()->json($berita);
    }

    /**
     * Store a newly created berita in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'text_berita' => 'required|string',
            'kategori' => 'required|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public'); // Menyimpan di storage/app/public/images
            $validatedData['foto'] = $filePath;
        }

        $berita = Berita::create($validatedData);

        return response()->json(['message' => 'Berita created successfully', 'berita' => $berita], 201);
    }

    /**
     * Display the specified berita.
     *
     * @param int $berita_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $berita_id): JsonResponse
    {
        $berita = Berita::find($berita_id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        return response()->json($berita);
    }

    /**
     * Update the specified berita in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $berita_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $berita_id): JsonResponse
    {
        $berita = Berita::find($berita_id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        $validatedData = $request->validate([
            'judul' => 'sometimes|string|max:255',
            'text_berita' => 'sometimes|string',
            'kategori' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:draft,published,archived',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public'); // Menyimpan di storage/app/public/images
            $validatedData['foto'] = $filePath;
        }

        $berita->update($validatedData);

        return response()->json(['message' => 'Berita updated successfully', 'berita' => $berita]);
    }

    /**
     * Remove the specified berita from storage.
     *
     * @param int $berita_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $berita_id): JsonResponse
    {
        $berita = Berita::find($berita_id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        $berita->delete();

        return response()->json(['message' => 'Berita deleted successfully']);
    }
}
