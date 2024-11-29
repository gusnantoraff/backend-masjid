<?php

namespace App\Http\Controllers;

use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\InfoMasjid;


class StrukturOrganisasiController extends Controller
{
    /**
     * Display a listing of the struktur_organisasi.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $strukturOrganisasi = StrukturOrganisasi::with('infoMasjid')->get();
        return response()->json($strukturOrganisasi);
    }

    public function getDeleted()
    {
        $deletedData = StrukturOrganisasi::onlyTrashed()->get();
        return response()->json($deletedData);
    }

    /**
     * Store a newly created struktur_organisasi in storage.
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
            'jabatan' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'kontak' => 'nullable|string|max:255',
        ]);

        $validatedData['info_masjid_id'] = $infoMasjid->id;

        $strukturOrganisasi = StrukturOrganisasi::create($validatedData);

        return response()->json(['message' => 'Struktur Organisasi created successfully', 'strukturOrganisasi' => $strukturOrganisasi], 201);
    }

    /**
     * Display the specified struktur_organisasi.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $strukturOrganisasi = StrukturOrganisasi::with('infoMasjid')->find($id);

        if (!$strukturOrganisasi) {
            return response()->json(['message' => 'Struktur Organisasi not found'], 404);
        }

        return response()->json($strukturOrganisasi);
    }

    /**
     * Update the specified struktur_organisasi in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $strukturOrganisasi = StrukturOrganisasi::find($id);

        if (!$strukturOrganisasi) {
            return response()->json(['message' => 'Struktur Organisasi not found'], 404);
        }

        $validatedData = $request->validate([
            'info_masjid_id' => 'sometimes|exists:info_masjid,id',
            'jabatan' => 'sometimes|string|max:255',
            'nama' => 'sometimes|string|max:255',
            'kontak' => 'nullable|string|max:255',
        ]);

        $strukturOrganisasi->update($validatedData);

        return response()->json(['message' => 'Struktur Organisasi updated successfully', 'strukturOrganisasi' => $strukturOrganisasi]);
    }

    /**
     * Remove the specified struktur_organisasi from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $strukturOrganisasi = StrukturOrganisasi::find($id);

        if (!$strukturOrganisasi) {
            return response()->json(['message' => 'Struktur Organisasi not found'], 404);
        }

        $strukturOrganisasi->delete();

        return response()->json(['message' => 'Struktur Organisasi deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $strukturOrganisasi = StrukturOrganisasi::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($strukturOrganisasi->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted struktur organisasi found for the given IDs'], 404);
        }

        foreach ($strukturOrganisasi as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Struktur organisasi records restored successfully']);
    }
}
