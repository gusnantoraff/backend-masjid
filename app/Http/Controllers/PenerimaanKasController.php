<?php

namespace App\Http\Controllers;

use App\Models\PenerimaanKas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PenerimaanKasController extends Controller
{
    /**
     * Display a listing of the penerimaan_kas.
     */
    public function index(): JsonResponse
    {
        // $penerimaanKas = PenerimaanKas::with(['coa', 'arus_kas'])->get();
        $penerimaanKas = PenerimaanKas::with('coa')->get();

        return response()->json($penerimaanKas);
    }

    /**
     * Store a newly created penerimaan_kas in storage.
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
            // Store the image in the 'public/storage/penerimaan_kas' folder
            $imagePath = $request->file('image')->store('penerimaan_kas', 'public');
            $validatedData['image'] = $imagePath;
        }

        $penerimaanKas = PenerimaanKas::create($validatedData);

        return response()->json(['message' => 'Penerimaan Kas created successfully', 'penerimaanKas' => $penerimaanKas], 201);
    }

    /**
     * Display the specified penerimaan_kas.
     */
    public function show(int $id): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::with(['coa', 'arus_kas'])->find($id);

        if (!$penerimaanKas) {
            return response()->json(['message' => 'Penerimaan Kas not found'], 404);
        }

        return response()->json($penerimaanKas);
    }

    /**
     * Update the specified penerimaan_kas in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::find($id);

        if (!$penerimaanKas) {
            return response()->json(['message' => 'Penerimaan Kas not found'], 404);
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
            if ($penerimaanKas->image) {
                Storage::disk('public')->delete($penerimaanKas->image);
            }

            // Store the new image in 'public/storage/penerimaan_kas'
            $imagePath = $request->file('image')->store('penerimaan_kas', 'public');
            $validatedData['image'] = $imagePath;
        }

        $penerimaanKas->update($validatedData);

        return response()->json(['message' => 'Penerimaan Kas updated successfully', 'penerimaanKas' => $penerimaanKas]);
    }

    /**
     * Remove the specified penerimaan_kas from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::find($id);

        if (!$penerimaanKas) {
            return response()->json(['message' => 'Penerimaan Kas not found'], 404);
        }

        $penerimaanKas->delete();

        return response()->json(['message' => 'Penerimaan Kas deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $penerimaanKas = PenerimaanKas::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($penerimaanKas->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted penerimaan kas found for the given IDs'], 404);
        }

        foreach ($penerimaanKas as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Penerimaan kas records restored successfully']);
    }
}
