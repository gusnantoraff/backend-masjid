<?php

namespace App\Http\Controllers;

use App\Models\ArusKas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArusKasController extends Controller
{
    /**
     * Display a listing of the arus_kas.
     */
    public function index(): JsonResponse
    {
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->get();

        return response()->json($arusKas);
    }

    /**
     * Store a newly created arus_kas in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas = ArusKas::create($validatedData);

        return response()->json(['message' => 'Arus Kas created successfully', 'arusKas' => $arusKas], 201);
    }

    /**
     * Display the specified arus_kas.
     */
    public function show(int $id): JsonResponse
    {
        $arusKas = ArusKas::with(['penerimaanKas', 'pengeluaranKas'])->find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        return response()->json($arusKas);
    }

    /**
     * Update the specified arus_kas in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $validatedData = $request->validate([
            'pemasukan' => 'nullable|numeric',
            'pengeluaran' => 'nullable|numeric',
        ]);

        $arusKas->update($validatedData);

        return response()->json(['message' => 'Arus Kas updated successfully', 'arusKas' => $arusKas]);
    }

    /**
     * Remove the specified arus_kas from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $arusKas = ArusKas::find($id);

        if (! $arusKas) {
            return response()->json(['message' => 'Arus Kas not found'], 404);
        }

        $arusKas->delete();

        return response()->json(['message' => 'Arus Kas deleted successfully']);
    }
}
