<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    /**
     * Display a listing of the berita.
     */
    public function index(): JsonResponse
    {
        $berita = Berita::orderBy('tanggal_publikasi', 'desc')->get();

        return response()->json($berita);
    }

    /**
     * Store a newly created berita in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'tanggal_publikasi' => 'required|date_format:Y-m-d H:i',
            'kategori' => 'required|in:berita,sport,teknologi,pendidikan,lainnya',
            'status' => 'required|in:draft,published,archived',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public');
            $validatedData['foto'] = $filePath;
        }

        $berita = Berita::create($validatedData);

        return response()->json(['message' => 'Berita created successfully', 'berita' => $berita], 201);
    }

    /**
     * Display the specified berita.
     */
    public function show(int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        return response()->json($berita);
    }

    /**
     * Update the specified berita in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        $validatedData = $request->validate([
            'judul' => 'sometimes|string|max:255',
            'konten' => 'sometimes|string',
            'tanggal_publikasi' => 'sometimes|date_format:Y-m-d H:i',
            'kategori' => 'sometimes|in:berita,sport,teknologi,pendidikan,lainnya',
            'status' => 'sometimes|in:draft,published,archived',
            'foto' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public');
            $validatedData['foto'] = $filePath;
        }

        $berita->update($validatedData);

        return response()->json(['message' => 'Berita updated successfully', 'berita' => $berita]);
    }

    /**
     * Store a new photo for the specified berita, removing the old one if exists.
     */
    public function updateFoto(Request $request, int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        $validatedData = $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Delete old photo if exists
        if ($berita->foto) {
            Storage::disk('public')->delete($berita->foto);
        }

        // Store new photo
        $file = $request->file('foto');
        $filePath = $file->store('images', 'public');
        $berita->foto = $filePath;
        $berita->save();

        return response()->json(['message' => 'Foto updated successfully', 'foto' => $filePath]);
    }

    /**
     * Remove the specified berita from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }

        $berita->delete();

        return response()->json(['message' => 'Berita soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $berita = Berita::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($berita->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted berita found for the given IDs'], 404);
        }

        foreach ($berita as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Berita records restored successfully']);
    }
}
