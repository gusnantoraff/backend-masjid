<?php

namespace App\Http\Controllers;

use App\Models\ArusKas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArusKasController extends Controller
{
    /**
     * Display a listing of the arus_kas.
     */
    public function index(): JsonResponse
    {
        // Fetch all ArusKas and update totals
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->get();

        // Update totals for each ArusKas record
        foreach ($arusKas as $item) {
            $item->updateTotals(); // Recalculate the totals for each ArusKas
        }

        return response()->json($arusKas);
    }

    /**
     * Store a newly created arus_kas in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas = ArusKas::create($validatedData);

        // Update totals after creation
        $arusKas->updateTotals();

        return response()->json(['message' => 'Arus Kas created successfully', 'arusKas' => $arusKas], 201);
    }

    /**
     * Display the specified arus_kas.
     */
    public function show(int $id): JsonResponse
    {
        // Fetch the specific ArusKas record along with related penerimaanKas and pengeluaranKas
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        // Update totals for the fetched ArusKas
        $arusKas->updateTotals();

        return response()->json($arusKas);
    }

    /**
     * Update the specified arus_kas in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas->update($validatedData);

        // Update totals after updating
        $arusKas->updateTotals();

        return response()->json(['message' => 'Arus Kas updated successfully', 'arusKas' => $arusKas]);
    }

    /**
     * Remove the specified arus_kas from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $arusKas->delete();

        return response()->json(['message' => 'Arus Kas soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $arusKas = ArusKas::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($arusKas->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted Arus Kas found for the given IDs'], 404);
        }

        foreach ($arusKas as $record) {
            $record->restore();
        }

        return response()->json(['message' => 'Arus records restored successfully']);
    }
}
