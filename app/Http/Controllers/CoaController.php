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
        ]);

        $coa = Coa::create($validatedData);

        return response()->json(['message' => 'COA created successfully', 'coa' => $coa], 201);
    }

    /**
     * Display the specified COA.
     */
    public function show(int $id): JsonResponse
    {
        $coa = Coa::with(['penerimaanKas', 'pengeluaranKas', 'jurnalUmum', 'generalLedger'])->find($id);

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

        $validatedData = $request->validate([
            'kode_akun' => 'sometimes|string|max:255|unique:coa,kode_akun,'.$id,
            'nama_akun' => 'sometimes|string|max:255',
            'tipe' => 'required|string|max:255',
        ]);

        $coa->update($validatedData);

        return response()->json(['message' => 'COA updated successfully', 'coa' => $coa]);
    }

    /**
     * Remove the specified COA from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $coa = Coa::find($id);

        if (! $coa) {
            return response()->json(['message' => 'COA not found'], 404);
        }

        $coa->delete();

        return response()->json(['message' => 'COA deleted successfully']);
    }
}
