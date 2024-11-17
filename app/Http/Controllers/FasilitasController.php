<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\InfoMasjid;

class FasilitasController extends Controller
{
    /**
     * Display a listing of the fasilitas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $fasilitas = Fasilitas::with('infoMasjid')->get();
        return response()->json($fasilitas);
    }

    /**
     * Store a newly created fasilitas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Retrieve the first (and only) InfoMasjid record
        $infoMasjid = InfoMasjid::first();

        if (!$infoMasjid) {
            return response()->json(['message' => 'Info Masjid not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_fasilitas' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:500',
        ]);

        // Associate the new fasilitas with the infoMasjid
        $validatedData['info_masjid_id'] = $infoMasjid->id;
        
        $fasilitas = Fasilitas::create($validatedData);

        return response()->json(['message' => 'Fasilitas created successfully', 'fasilitas' => $fasilitas], 201);
    }

    /**
     * Display the specified fasilitas.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $fasilitas = Fasilitas::with('infoMasjid')->find($id);

        if (!$fasilitas) {
            return response()->json(['message' => 'Fasilitas not found'], 404);
        }

        return response()->json($fasilitas);
    }

    /**
     * Update the specified fasilitas in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $fasilitas = Fasilitas::find($id);

        if (!$fasilitas) {
            return response()->json(['message' => 'Fasilitas not found'], 404);
        }

        $validatedData = $request->validate([
            'info_masjid_id' => 'sometimes|exists:info_masjid,id',
            'nama_fasilitas' => 'sometimes|string|max:255',
            'deskripsi' => 'nullable|string',
        ]);

        $fasilitas->update($validatedData);

        return response()->json(['message' => 'Fasilitas updated successfully', 'fasilitas' => $fasilitas]);
    }

    /**
     * Remove the specified fasilitas from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $fasilitas = Fasilitas::find($id);

        if (!$fasilitas) {
            return response()->json(['message' => 'Fasilitas not found'], 404);
        }

        $fasilitas->delete();

        return response()->json(['message' => 'Fasilitas deleted successfully']);
    }
}
