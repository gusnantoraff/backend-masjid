<?php

namespace App\Http\Controllers;

use App\Models\ArusKas;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArusKasController extends Controller
{
    /**
     * Display a listing of the arus_kas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->get();
        return response()->json($arusKas);
    }

    /**
     * Store a newly created arus_kas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'penerimaan_kas_id' => 'nullable|exists:penerimaan_kas,id',
            'pengeluaran_kas_id' => 'nullable|exists:pengeluaran_kas,id',
            'tanggal' => 'required|date',
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas = ArusKas::create($validatedData);

        return response()->json(['message' => 'Arus Kas created successfully', 'arusKas' => $arusKas], 201);
    }

    /**
     * Display the specified arus_kas.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->find($id);

        if (!$arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        return response()->json($arusKas);
    }

    /**
     * Update the specified arus_kas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (!$arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'penerimaan_kas_id' => 'nullable|exists:penerimaan_kas,id',
            'pengeluaran_kas_id' => 'nullable|exists:pengeluaran_kas,id',
            'tanggal' => 'sometimes|date',
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas->update($validatedData);

        return response()->json(['message' => 'Arus Kas updated successfully', 'arusKas' => $arusKas]);
    }

    /**
     * Remove the specified arus_kas from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (!$arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $arusKas->delete();

        return response()->json(['message' => 'Arus Kas deleted successfully']);
    }
}
