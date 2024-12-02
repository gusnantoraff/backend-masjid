<?php

namespace App\Http\Controllers;

use App\Models\GeneralLedger;
use App\Models\Coa;
use App\Models\PenerimaanKas;
use App\Models\PengeluaranKas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeneralLedgerController extends Controller
{
    /**
     * Display a listing of the general ledger entries.
     */
    public function index(): JsonResponse
    {
        $generalLedger = GeneralLedger::with('coa')->get();
        return response()->json($generalLedger);
    }

    /**
     * Store a newly created general ledger entry in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'coa_id' => 'required|exists:coa,id',
            'tanggal' => 'required|date',
        ]);

        $coa = Coa::find($validated['coa_id']);
        if (!$coa) {
            return response()->json(['message' => 'COA tidak ditemukan'], 404);
        }

        $generalLedger = GeneralLedger::create([
            'coa_id' => $validated['coa_id'],
            'tanggal' => $validated['tanggal'],
            'status' => 'created',
        ]);

        if ($coa->tipe === 'Aset') {
            $this->processPenerimaanKas($coa->id);
        } elseif ($coa->tipe === 'Kewajiban') {
            $this->processPengeluaranKas($coa->id);
        }

        $this->processQueue();

        return response()->json(['message' => 'General Ledger berhasil dibuat dan COA diproses.', 'data' => $generalLedger]);
    }


    public function processQueue(): JsonResponse
    {
        $generalLedgerExists = GeneralLedger::where('status', 'created')->exists();
        if (!$generalLedgerExists) {
            return response()->json(['message' => 'Please create a General Ledger first'], 400);
        }

        $coaToProcess = Coa::where('status', 'antri')->get();

        if ($coaToProcess->isNotEmpty()) {
            foreach ($coaToProcess as $item) {
                $item->update(['status' => 'terproses']);
            }
        }

        return response()->json(['message' => 'COA, Penerimaan Kas, and Pengeluaran Kas entries processed successfully']);
    }

    private function processPenerimaanKas(int $coaId)
    {
        $penerimaanKasToProcess = PenerimaanKas::where('coa_id', $coaId)->where('status', 'antri')->get();
        foreach ($penerimaanKasToProcess as $item) {
            $item->update(['status' => 'terproses']);
        }
    }

    private function processPengeluaranKas(int $coaId)
    {
        $pengeluaranKasToProcess = PengeluaranKas::where('coa_id', $coaId)->where('status', 'antri')->get();
        foreach ($pengeluaranKasToProcess as $item) {
            $item->update(['status' => 'terproses']);
        }
    }


    /**
     * Display the specified general ledger entry.
     */
    public function show(int $id): JsonResponse
    {
        // $generalLedger = GeneralLedger::with('coa.penerimaanKas', 'coa.pengeluaranKas')->find($id);
        $generalLedger = GeneralLedger::with('coa')->find($id);

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
            'coa_id' => 'required|exists:coa,id',
            'tanggal' => 'required|date',
            'debit_total' => 'nullable|numeric',
            'kredit_total' => 'nullable|numeric',
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
