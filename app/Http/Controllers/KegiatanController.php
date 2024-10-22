<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    public function index(): JsonResponse
    {
        $kegiatan = Kegiatan::with('images')->get();

        return response()->json($kegiatan);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'kategori' => 'required|in:khatib,muazin,umum',
            'keterangan' => 'nullable|string',
        ]);

        $kegiatan = Kegiatan::create($validatedData);

        return response()->json(['message' => 'Kegiatan created successfully', 'kegiatan' => $kegiatan], 201);
    }

    public function show($id): JsonResponse
    {
        $kegiatan = Kegiatan::with('images')->find($id);

        if (! $kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        return response()->json($kegiatan);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (! $kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'kategori' => 'required|in:khatib,muazin,umum',
            'keterangan' => 'nullable|string',
        ]);

        $kegiatan->update($validatedData);

        return response()->json(['message' => 'Kegiatan updated successfully', 'kegiatan' => $kegiatan]);
    }

    public function destroy($id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (! $kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        $kegiatan->delete();

        return response()->json(['message' => 'Kegiatan deleted successfully']);
    }
}
