<?php

namespace App\Http\Controllers;

use App\Models\Coa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoaController extends Controller
{
    /**
     * Display a listing of the COA.
     */
    public function index(): JsonResponse
    {
        $coa = Coa::with(['penerimaanKas', 'pengeluaranKas'])->get();
        // $coa = Coa::all();

        return response()->json($coa);
    }

    /**
     * Store a newly created COA in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'kode_akun' => 'required|string|max:255|unique:coa,kode_akun',
            'nama_akun' => 'required|string|max:255',
            'tipe' => 'required|string|max:255',
            'general_ledger_id' => 'nullable|exists:general_ledger,id',  // assuming this relationship
        ]);

        $coa = Coa::create($validatedData);

        return response()->json(['message' => 'COA created successfully', 'coa' => $coa], 201);
    }

    /**
     * Display the specified COA.
     */
    public function show(int $id): JsonResponse
    {
        $coa = Coa::with(['penerimaanKas', 'pengeluaranKas', 'generalLedgers'])->find($id);

        if (! $coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        return response()->json($coa);
    }

    /**
     * Update the specified COA in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $coa = Coa::find($id);

        if (! $coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'kode_akun' => 'sometimes|string|max:255',
            'nama_akun' => 'sometimes|string|max:255',
            'tipe' => 'required|string|max:255',
            'general_ledger_id' => 'nullable|exists:general_ledger,id',  // Make sure the id exists in general_ledgers table
        ]);

        // Update the COA with validated data
        $coa->update($validatedData);

        return response()->json(['message' => 'COA updated successfully', 'coa' => $coa]);
    }

    /**
     * Soft delete the specified COA from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $coa = Coa::find($id);

        if (! $coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        // Soft delete the COA, mark deleted_status as 1
        $coa->delete();

        return response()->json(['message' => 'COA soft deleted successfully']);
    }

    /**
     * Restore the specified COA.
     */
    public function restore(int $id): JsonResponse
    {
        $coa = Coa::onlyTrashed()->find($id);

        if (! $coa || $coa->deleted_status == 0) {
            return response()->json(['message' => 'COA not found or not soft-deleted'], 404);
        }

        // Restore the COA and reset its deleted status
        $coa->restore();

        return response()->json(['message' => 'COA restored successfully']);
    }
}
