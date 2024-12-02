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
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $penerimaanKasStatus = $request->query('penerimaan_kas_status');
        $pengeluaranKasStatus = $request->query('pengeluaran_kas_status');
    
        $coaQuery = Coa::query();
    
        if ($status) {
            $coaQuery->where('status', $status);
        }
    
        $coa = $coaQuery->with(['generalLedgers'])->get();
    
        $coa->each(function ($item) use ($penerimaanKasStatus, $pengeluaranKasStatus) {
            if ($penerimaanKasStatus) {
                $item->penerimaan_kas = $item->penerimaanKas()
                    ->where('status', $penerimaanKasStatus)
                    ->get();
            }
    
            if ($pengeluaranKasStatus) {
                $item->pengeluaran_kas = $item->pengeluaranKas()
                    ->where('status', $pengeluaranKasStatus)
                    ->get();
            }
        });
    
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
            'general_ledger_id' => 'nullable|exists:general_ledger,id',
        ]);

        $validatedData['status'] = 'antri';

        $coa = Coa::create($validatedData);

        return response()->json(['message' => 'COA created successfully', 'coa' => $coa], 201);
    }

    /**
     * Display the specified COA.
     */
    public function show(int $id): JsonResponse
    {
        $coa = Coa::with(['penerimaanKas', 'pengeluaranKas', 'generalLedgers'])->find($id);

        if (!$coa) {
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

        if (!$coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'kode_akun' => 'sometimes|string|max:255',
            'nama_akun' => 'sometimes|string|max:255',
            'tipe' => 'required|string|max:255',
            'general_ledger_id' => 'nullable|exists:general_ledger,id',
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

        if (!$coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        // Soft delete the COA, mark deleted_status as 1
        $coa->delete();

        return response()->json(['message' => 'COA soft deleted successfully']);
    }

    /**
     * Restore the specified COA.
     */
    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $coas = Coa::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($coas->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted coa found for the given IDs'], 404);
        }

        foreach ($coas as $coa) {
            $coa->restore();
        }

        return response()->json(['message' => 'COA records restored successfully']);
    }
}
