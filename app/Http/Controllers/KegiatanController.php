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
     * Display a listing of the kegiatan with optional filters.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = Kegiatan::with('images');

        if ($request->has('start_date') && $request->filled('start_date')) {
            $query->where('tanggal', '>=', $request->input('start_date'));
        }

        if ($request->has('end_date') && $request->filled('end_date')) {
            $query->where('tanggal', '<=', $request->input('end_date'));
        }

        if ($request->has('month') && $request->filled('month')) {
            $query->whereMonth('tanggal', $request->input('month'));
        }

        $kegiatan = $query->get();

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
            'tanggal' => 'required|date_format:Y-m-d H:i',
            'lokasi' => 'required|string',
            'kategori' => 'required|in:khatib,muazin,umum,hari-besar',
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
            'tanggal' => 'sometimes|date_format:Y-m-d H:i',
            'lokasi' => 'sometimes|string',
            'kategori' => 'sometimes|in:khatib,muazin,umum,hari-besar',
            'keterangan' => 'sometimes|string',
        ]);

        $kegiatan->update($validatedData);

        return response()->json([
            'message' => 'Kegiatan updated successfully',
            'kegiatan' => $kegiatan,
        ]);
    }

    public function uploadPhoto(Request $request, int $id): JsonResponse
    {
        $kegiatan = Kegiatan::find($id);

        if (!$kegiatan) {
            return response()->json(['message' => 'Kegiatan not found'], 404);
        }

        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file = $request->file('foto');
        $filePath = $file->store('images', 'public');

        if ($kegiatan->images()->exists()) {
            // Hapus foto lama
            $image = $kegiatan->images()->first();
            Storage::disk('public')->delete($image->image);

            // Update ke foto baru
            $image->update([
                'image' => $filePath,
                'keterangan' => 'Updated Foto: ' . $kegiatan->nama_kegiatan,
            ]);
        } else {
            // Tambahkan foto baru
            $kegiatan->images()->create([
                'image' => $filePath,
                'kategori' => 'kegiatan',
                'keterangan' => 'Foto: ' . $kegiatan->nama_kegiatan,
            ]);
        }

        return response()->json([
            'message' => 'Foto uploaded successfully',
            'image' => $filePath,
        ]);
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

        return response()->json(['message' => 'Kegiatan soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $kegiatan = Kegiatan::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($kegiatan->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted kegiatan found for the given IDs'], 404);
        }

        foreach ($kegiatan as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Kegiatan records restored successfully']);
    }

}
