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
        $generalLedger = GeneralLedger::with('coa.penerimaanKas', 'coa.pengeluaranKas')->get();

        return response()->json($generalLedger);
    }

    /**
     * Store a newly created general ledger entry in storage.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'coa_id' => 'required|exists:coa,id',
            'tanggal' => 'required|date',
            'debit' => 'sometimes|numeric',
            'kredit' => 'sometimes|numeric',
            'keterangan' => 'nullable|string',
        ]);

        // Check if a record with the same coa_id and tanggal already exists
        $existingLedger = GeneralLedger::where('coa_id', $validatedData['coa_id'])
            ->where('tanggal', $validatedData['tanggal'])
            ->first();

        if ($existingLedger) {
            return response()->json(['message' => 'A General Ledger entry with the same COA ID and Date already exists.'], 400);
        }

        // Set default values for debit and kredit if not provided
        $validatedData['debit'] = $validatedData['debit'] ?? 0;
        $validatedData['kredit'] = $validatedData['kredit'] ?? 0;

        // Create the new general ledger entry
        $generalLedger = GeneralLedger::create($validatedData);

        // Load related COA data for response
        $generalLedger->load('coa.penerimaanKas', 'coa.pengeluaranKas');

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
        $generalLedger = GeneralLedger::with('coa.penerimaanKas', 'coa.pengeluaranKas')->find($id);

        if (! $generalLedger) {
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

        if (! $generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'tanggal' => 'sometimes|date',
            'debit' => 'sometimes|numeric',
            'kredit' => 'sometimes|numeric',
            'keterangan' => 'nullable|string',
        ]);

        // Set default values for debit and kredit if not provided
        $validatedData['debit'] = $validatedData['debit'] ?? $generalLedger->debit ?? 0;
        $validatedData['kredit'] = $validatedData['kredit'] ?? $generalLedger->kredit ?? 0;

        $generalLedger->update($validatedData);

        // Return the updated entry with recalculated debit and kredit
        $generalLedger->load('coa.penerimaanKas', 'coa.pengeluaranKas');

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

        if (! $generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $generalLedger->delete();

        return response()->json(['message' => 'General Ledger entry deleted successfully']);
    }
}
