<?php

namespace App\Http\Controllers;

use App\Models\JurnalUmum;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JurnalUmumController extends Controller
{
    /**
     * Display a listing of the jurnal_umum.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $jurnalUmum = JurnalUmum::with('coa')->get();
        return response()->json($jurnalUmum);
    }

    /**
     * Store a newly created jurnal_umum in storage.
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
            'keterangan' => 'nullable|string',
        ]);

        $jurnalUmum = JurnalUmum::create($validatedData);

        return response()->json(['message' => 'Jurnal Umum entry created successfully', 'jurnalUmum' => $jurnalUmum], 201);
    }

    /**
     * Display the specified jurnal_umum entry.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $jurnalUmum = JurnalUmum::with('coa')->find($id);

        if (!$jurnalUmum) {
            return response()->json(['message' => 'Jurnal Umum entry not found'], 404);
        }

        return response()->json($jurnalUmum);
    }

    /**
     * Update the specified jurnal_umum entry in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $jurnalUmum = JurnalUmum::find($id);

        if (!$jurnalUmum) {
            return response()->json(['message' => 'Jurnal Umum entry not found'], 404);
        }

        $validatedData = $request->validate([
            'coa_id' => 'sometimes|exists:coa,id',
            'tanggal' => 'sometimes|date',
            'debit' => 'sometimes|numeric',
            'kredit' => 'sometimes|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $jurnalUmum->update($validatedData);

        return response()->json(['message' => 'Jurnal Umum entry updated successfully', 'jurnalUmum' => $jurnalUmum]);
    }

    /**
     * Remove the specified jurnal_umum entry from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $jurnalUmum = JurnalUmum::find($id);

        if (!$jurnalUmum) {
            return response()->json(['message' => 'Jurnal Umum entry not found'], 404);
        }

        $jurnalUmum->delete();

        return response()->json(['message' => 'Jurnal Umum entry deleted successfully']);
    }
}
