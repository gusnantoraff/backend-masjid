<?php

namespace App\Http\Controllers;

use App\Models\PenerimaanKas;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PenerimaanKasController extends Controller
{
    /**
     * Display a listing of the penerimaan_kas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::with('coa')->get();
        return response()->json($penerimaanKas);
    }

    /**
     * Store a newly created penerimaan_kas in storage.
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

        $penerimaanKas = PenerimaanKas::create($validatedData);

        return response()->json(['message' => 'Penerimaan Kas created successfully', 'penerimaanKas' => $penerimaanKas], 201);
    }

    /**
     * Display the specified penerimaan_kas.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::with('coa')->find($id);

        if (!$penerimaanKas) {
            return response()->json(['message' => 'Penerimaan Kas not found'], 404);
        }

        return response()->json($penerimaanKas);
    }

    /**
     * Update the specified penerimaan_kas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $penerimaanKas = PenerimaanKas::find($id);

        if (!$penerimaanKas) {
            return response()->json(['message' => 'Penerimaan Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'tanggal' => 'sometimes|date',
            'jumlah' => 'sometimes|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $penerimaanKas->update($validatedData);

        return response()->json(['message' => 'Penerimaan Kas updated successfully', 'penerimaanKas' => $penerimaanKas]);
    }

    /**
     * Remove the specified penerimaan_kas from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
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
}
