<?php

namespace App\Http\Controllers;

use App\Models\PengeluaranKas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PengeluaranKasController extends Controller
{
    /**
     * Display a listing of the pengeluaran_kas.
     */
    public function index(): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::with(['coa', 'arus_kas'])->get();

        return response()->json($pengeluaranKas);
    }

    /**
     * Store a newly created pengeluaran_kas in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'coa_id' => 'required|exists:coa,id',
            'arus_kas_id' => 'sometimes|exists:arus_kas,id',
            'tanggal' => 'required|date',
            'jumlah' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Validate image
            'jenis' => 'nullable|string', // Added 'jenis' attribute
        ]);

        $validatedData['arus_kas_id'] = 1; // Set default value

        if ($request->hasFile('image')) {
            // Ensure the 'pengeluaran_kas' directory exists
            if (! Storage::disk('public')->exists('pengeluaran_kas')) {
                Storage::disk('public')->makeDirectory('pengeluaran_kas');
            }

            // Store the image in the 'public/storage/pengeluaran_kas' directory
            $imagePath = $request->file('image')->store('pengeluaran_kas', 'public');
            $validatedData['image'] = $imagePath;
        }

        $pengeluaranKas = PengeluaranKas::create($validatedData);

        return response()->json(['message' => 'Pengeluaran Kas created successfully', 'pengeluaranKas' => $pengeluaranKas], 201);
    }

    /**
     * Display the specified pengeluaran_kas.
     */
    public function show(int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::with(['coa', 'arus_kas'])->find($id);

        if (! $pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        return response()->json($pengeluaranKas);
    }

    /**
     * Update the specified pengeluaran_kas in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::find($id);

        if (! $pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'arus_kas_id' => 'sometimes|exists:arus_kas,id',
            'tanggal' => 'sometimes|date',
            'jumlah' => 'sometimes|numeric',
            'deskripsi' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Validate image
            'jenis' => 'nullable|string', // Added 'jenis' attribute
        ]);

        $validatedData['arus_kas_id'] = 1; // Set default value

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($pengeluaranKas->image) {
                Storage::disk('public')->delete($pengeluaranKas->image);
            }

            // Ensure the 'pengeluaran_kas' directory exists
            if (! Storage::disk('public')->exists('pengeluaran_kas')) {
                Storage::disk('public')->makeDirectory('pengeluaran_kas');
            }

            // Store the new image in 'public/storage/pengeluaran_kas'
            $imagePath = $request->file('image')->store('pengeluaran_kas', 'public');
            $validatedData['image'] = $imagePath;
        }

        $pengeluaranKas->update($validatedData);

        return response()->json(['message' => 'Pengeluaran Kas updated successfully', 'pengeluaranKas' => $pengeluaranKas]);
    }

    /**
     * Remove the specified pengeluaran_kas from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::find($id);

        if (! $pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        // Delete the image file if it exists
        if ($pengeluaranKas->image) {
            Storage::disk('public')->delete($pengeluaranKas->image);
        }

        $pengeluaranKas->delete();

        return response()->json(['message' => 'Pengeluaran Kas deleted successfully']);
    }
}
