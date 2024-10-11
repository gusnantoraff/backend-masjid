<?php

namespace App\Http\Controllers;

use App\Models\LaporanKeuangan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LaporanKeuanganController extends Controller
{
    /**
     * Display a listing of the laporan_keuangan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::all();
        return response()->json($laporanKeuangan);
    }

    /**
     * Store a newly created laporan_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'periode' => 'required|string|max:255',
            'total_pemasukan' => 'required|numeric',
            'total_pengeluaran' => 'required|numeric',
        ]);

        $laporanKeuangan = LaporanKeuangan::create($validatedData);

        return response()->json(['message' => 'Laporan Keuangan created successfully', 'laporanKeuangan' => $laporanKeuangan], 201);
    }

    /**
     * Display the specified laporan_keuangan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        return response()->json($laporanKeuangan);
    }

    /**
     * Update the specified laporan_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        $validatedData = $request->validate([
            'periode' => 'sometimes|string|max:255',
            'total_pemasukan' => 'sometimes|numeric',
            'total_pengeluaran' => 'sometimes|numeric',
        ]);

        $laporanKeuangan->update($validatedData);

        return response()->json(['message' => 'Laporan Keuangan updated successfully', 'laporanKeuangan' => $laporanKeuangan]);
    }

    /**
     * Remove the specified laporan_keuangan from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        $laporanKeuangan->delete();

        return response()->json(['message' => 'Laporan Keuangan deleted successfully']);
    }
}
