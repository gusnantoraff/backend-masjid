<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the kegiatan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $kegiatan = Kegiatan::with('images')->get();
        return response()->json($kegiatan);
    }

    /**
     * Store a newly created kegiatan in storage along with an associated image.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'lokasi' => 'required|string',
            'kategori' => 'required|in:khatib,muazin,umum',
            'keterangan' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Create the Kegiatan
        $kegiatan = Kegiatan::create([
            'nama_kegiatan' => $validatedData['nama_kegiatan'],
            'tanggal' => $validatedData['tanggal'],
            'lokasi' => $validatedData['lokasi'],
            'kategori' => $validatedData['kategori'],
            'keterangan' => $validatedData['keterangan']
        ]);

        // If an image is uploaded, create the associated image record
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public');

            $kegiatan->images()->create([
                'image' => $filePath,
                'kategori' => 'kegiatan', // Use 'kegiatan' as the kategori
                'keterangan' => 'Foto: ' . $kegiatan->nama_kegiatan,
            ]);
        }

        return response()->json(['message' => 'Kegiatan and associated image created successfully', 'kegiatan' => $kegiatan], 201);
    }

    /**
     * Display the specified kegiatan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $kegiatan = Kegiatan::with('images')->find($id);

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
            'nama_kegiatan' => 'sometimes|string|max:255',
            'tanggal' => 'sometimes|date',
            'lokasi' => 'sometimes|string',
            'kategori' => 'sometimes|in:khatib,muazin,umum',
            'keterangan' => 'sometimes|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $kegiatan->update($validatedData);

        // If an image is uploaded, update or create the associated image record
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public');

            if ($kegiatan->images()->exists()) {
                $image = $kegiatan->images()->first();
                Storage::disk('public')->delete($image->image);
                $image->update([
                    'image' => $filePath,
                    'keterangan' => 'Updated Foto: ' . $kegiatan->nama_kegiatan,
                ]);
            } else {
                $kegiatan->images()->create([
                    'image' => $filePath,
                    'kategori' => 'kegiatan',
                    'keterangan' => 'Foto: ' . $kegiatan->nama_kegiatan,
                ]);
            }
        }

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

        foreach ($kegiatan->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        $kegiatan->delete();

        return response()->json(['message' => 'Kegiatan deleted successfully']);
    }
}
