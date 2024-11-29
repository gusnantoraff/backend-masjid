<?php

namespace App\Http\Controllers;

use App\Models\RekeningBank;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\InfoMasjid;

class RekeningBankController extends Controller
{
    /**
     * Display a listing of the rekening_bank.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $rekeningBank = RekeningBank::with('infoMasjid')->get();
        return response()->json($rekeningBank);
    }

    /**
     * Store a newly created rekening_bank in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $infoMasjid = InfoMasjid::first();

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info Masjid not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_bank' => 'required|string|max:255',
            'nomor_rekening' => 'required|string|max:255',
            'atas_nama' => 'required|string|max:255',
            'image_transfer' => 'nullable|string|max:255',
        ]);

        $validatedData['info_masjid_id'] = $infoMasjid->id;

        $rekeningBank = RekeningBank::create($validatedData);

        return response()->json(['message' => 'Rekening Bank created successfully', 'rekeningBank' => $rekeningBank], 201);
    }

    /**
     * Display the specified rekening_bank.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $rekeningBank = RekeningBank::with('infoMasjid')->find($id);

        if (!$rekeningBank) {
            return response()->json(['message' => 'Rekening Bank not found'], 404);
        }

        return response()->json($rekeningBank);
    }

    /**
     * Update the specified rekening_bank in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $rekeningBank = RekeningBank::find($id);

        if (!$rekeningBank) {
            return response()->json(['message' => 'Rekening Bank not found'], 404);
        }

        $validatedData = $request->validate([
            'info_masjid_id' => 'sometimes|exists:info_masjid,id',
            'nama_bank' => 'sometimes|string|max:255',
            'nomor_rekening' => 'sometimes|string|max:255',
            'atas_nama' => 'sometimes|string|max:255',
            'image_transfer' => 'nullable|string|max:255',
        ]);

        $rekeningBank->update($validatedData);

        return response()->json(['message' => 'Rekening Bank updated successfully', 'rekeningBank' => $rekeningBank]);
    }

    /**
     * Remove the specified rekening_bank from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $rekeningBank = RekeningBank::find($id);

        if (!$rekeningBank) {
            return response()->json(['message' => 'Rekening Bank not found'], 404);
        }

        $rekeningBank->delete();

        return response()->json(['message' => 'Rekening Bank deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $rekening = RekeningBank::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($rekening->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted penerimaan kas found for the given IDs'], 404);
        }

        foreach ($rekening as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Penerimaan kas records restored successfully']);
    }

}
