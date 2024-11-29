<?php

namespace App\Http\Controllers;

use App\Models\GeneralLedger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeneralLedgerController extends Controller
{
    /**
     * Display a listing of the general ledger entries.
     */
    public function index(): JsonResponse
    {
        // Fetch all general ledger entries with calculated debit and kredit
        $generalLedger = GeneralLedger::with('coa')->get();

        return response()->json($generalLedger);
    }

    /**
     * Store a newly created general ledger entry in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            // 'tanggal' => 'required|date',
            'debit_total' => 'nullable|numeric',
            'kredit_total' => 'nullable|numeric',
            // 'keterangan' => 'nullable|string',
        ]);

        // Create the new general ledger entry
        $generalLedger = GeneralLedger::create($validatedData);

        // Return a success response
        return response()->json([
            'message' => 'General Ledger entry created successfully',
            'generalLedger' => $generalLedger,
        ], 201);
    }

    /**
     * Display the specified general ledger entry.
     */
    public function show(int $id): JsonResponse
    {
        // $generalLedger = GeneralLedger::with('coa.penerimaanKas', 'coa.pengeluaranKas')->find($id);
        $generalLedger = GeneralLedger::with('coas')->find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        return response()->json($generalLedger);
    }

    /**
     * Update the specified general ledger entry in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $generalLedger = GeneralLedger::find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $validatedData = $request->validate([
            // 'tanggal' => 'required|date',
            'debit_total' => 'nullable|numeric',
            'kredit_total' => 'nullable|numeric',
            // 'keterangan' => 'nullable|string',
        ]);

        $generalLedger->update($validatedData);

        // Return the updated entry with recalculated debit and kredit
        // $generalLedger->load('coa.penerimaanKas', 'coa.pengeluaranKas');

        return response()->json([
            'message' => 'General Ledger entry updated successfully',
            'generalLedger' => $generalLedger,
        ]);
    }

    /**
     * Remove the specified general ledger entry from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $generalLedger = GeneralLedger::find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $generalLedger->delete();

        return response()->json(['message' => 'general ledger soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $generalLedgers = GeneralLedger::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($generalLedgers->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted general ledger found for the given IDs'], 404);
        }

        foreach ($generalLedgers as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'General ledger records restored successfully']);
    }
}
