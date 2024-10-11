<?php

namespace App\Http\Controllers;

use App\Models\PengeluaranKas;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PengeluaranKasController extends Controller
{
    /**
     * Display a listing of the pengeluaran_kas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::with('coa')->get();
        return response()->json($pengeluaranKas);
    }

    /**
     * Store a newly created pengeluaran_kas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'coa_id' => 'required|exists:coa,id',
            'tanggal' => 'required|date',
            'jumlah' => 'required|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $pengeluaranKas = PengeluaranKas::create($validatedData);

        return response()->json(['message' => 'Pengeluaran Kas created successfully', 'pengeluaranKas' => $pengeluaranKas], 201);
    }

    /**
     * Display the specified pengeluaran_kas.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::with('coa')->find($id);

        if (!$pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        return response()->json($pengeluaranKas);
    }

    /**
     * Update the specified pengeluaran_kas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::find($id);

        if (!$pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'tanggal' => 'sometimes|date',
            'jumlah' => 'sometimes|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $pengeluaranKas->update($validatedData);

        return response()->json(['message' => 'Pengeluaran Kas updated successfully', 'pengeluaranKas' => $pengeluaranKas]);
    }

    /**
     * Remove the specified pengeluaran_kas from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $pengeluaranKas = PengeluaranKas::find($id);

        if (!$pengeluaranKas) {
            return response()->json(['message' => 'Pengeluaran Kas not found'], 404);
        }

        $pengeluaranKas->delete();

        return response()->json(['message' => 'Pengeluaran Kas deleted successfully']);
    }
}
