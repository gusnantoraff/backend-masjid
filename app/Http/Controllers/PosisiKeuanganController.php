<?php

namespace App\Http\Controllers;

use App\Models\PosisiKeuangan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PosisiKeuanganController extends Controller
{
    /**
     * Display a listing of the posisi_keuangan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $posisiKeuangan = PosisiKeuangan::all();
        return response()->json($posisiKeuangan);
    }

    /**
     * Store a newly created posisi_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'aktiva' => 'required|numeric',
            'pasiva' => 'required|numeric',
        ]);

        $posisiKeuangan = PosisiKeuangan::create($validatedData);

        return response()->json(['message' => 'Posisi Keuangan created successfully', 'posisiKeuangan' => $posisiKeuangan], 201);
    }

    /**
     * Display the specified posisi_keuangan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $posisiKeuangan = PosisiKeuangan::find($id);

        if (!$posisiKeuangan) {
            return response()->json(['message' => 'Posisi Keuangan not found'], 404);
        }

        return response()->json($posisiKeuangan);
    }

    /**
     * Update the specified posisi_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $posisiKeuangan = PosisiKeuangan::find($id);

        if (!$posisiKeuangan) {
            return response()->json(['message' => 'Posisi Keuangan not found'], 404);
        }

        $validatedData = $request->validate([
            'aktiva' => 'sometimes|numeric',
            'pasiva' => 'sometimes|numeric',
        ]);

        $posisiKeuangan->update($validatedData);

        return response()->json(['message' => 'Posisi Keuangan updated successfully', 'posisiKeuangan' => $posisiKeuangan]);
    }

    /**
     * Remove the specified posisi_keuangan from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $posisiKeuangan = PosisiKeuangan::find($id);

        if (!$posisiKeuangan) {
            return response()->json(['message' => 'Posisi Keuangan not found'], 404);
        }

        $posisiKeuangan->delete();

        return response()->json(['message' => 'Posisi Keuangan deleted successfully']);
    }
}
