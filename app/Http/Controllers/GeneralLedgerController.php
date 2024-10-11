<?php

namespace App\Http\Controllers;

use App\Models\GeneralLedger;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GeneralLedgerController extends Controller
{
    /**
     * Display a listing of the general ledger entries.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $generalLedger = GeneralLedger::with('coa')->get();
        return response()->json($generalLedger);
    }

    /**
     * Store a newly created general ledger entry in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'coa_id' => 'required|exists:coa,id',
            'tanggal' => 'required|date',
            'debit' => 'required|numeric',
            'kredit' => 'required|numeric',
        ]);

        $generalLedger = GeneralLedger::create($validatedData);

        return response()->json(['message' => 'General Ledger entry created successfully', 'generalLedger' => $generalLedger], 201);
    }

    /**
     * Display the specified general ledger entry.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $generalLedger = GeneralLedger::with('coa')->find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        return response()->json($generalLedger);
    }

    /**
     * Update the specified general ledger entry in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $generalLedger = GeneralLedger::find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'tanggal' => 'sometimes|date',
            'debit' => 'sometimes|numeric',
            'kredit' => 'sometimes|numeric',
        ]);

        $generalLedger->update($validatedData);

        return response()->json(['message' => 'General Ledger entry updated successfully', 'generalLedger' => $generalLedger]);
    }

    /**
     * Remove the specified general ledger entry from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $generalLedger = GeneralLedger::find($id);

        if (!$generalLedger) {
            return response()->json(['message' => 'General Ledger entry not found'], 404);
        }

        $generalLedger->delete();

        return response()->json(['message' => 'General Ledger entry deleted successfully']);
    }
}
