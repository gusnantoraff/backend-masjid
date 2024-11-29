<?php

namespace App\Http\Controllers;

use App\Models\JadwalSholat;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JadwalSholatController extends Controller
{
    /**
     * Display a listing of the jadwal_sholat.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $jadwalSholat = JadwalSholat::all();
        return response()->json($jadwalSholat);
    }

    /**
     * Store a newly created jadwal_sholat in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'tanggal' => 'required|date',
            'subuh' => 'required|date_format:H:i',
            'dzuhur' => 'required|date_format:H:i',
            'ashar' => 'required|date_format:H:i',
            'maghrib' => 'required|date_format:H:i',
            'isya' => 'required|date_format:H:i',
        ]);

        $jadwalSholat = JadwalSholat::create($validatedData);

        return response()->json(['message' => 'Jadwal Sholat created successfully', 'jadwalSholat' => $jadwalSholat], 201);
    }

    /**
     * Display the specified jadwal_sholat.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $jadwalSholat = JadwalSholat::find($id);

        if (!$jadwalSholat) {
            return response()->json(['message' => 'Jadwal Sholat not found'], 404);
        }

        return response()->json($jadwalSholat);
    }

    /**
     * Update the specified jadwal_sholat in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $jadwalSholat = JadwalSholat::find($id);

        if (!$jadwalSholat) {
            return response()->json(['message' => 'Jadwal Sholat not found'], 404);
        }

        $validatedData = $request->validate([
            'tanggal' => 'sometimes|date',
            'subuh' => 'sometimes|date_format:H:i',
            'dzuhur' => 'sometimes|date_format:H:i',
            'ashar' => 'sometimes|date_format:H:i',
            'maghrib' => 'sometimes|date_format:H:i',
            'isya' => 'sometimes|date_format:H:i',
        ]);

        $jadwalSholat->update($validatedData);

        return response()->json(['message' => 'Jadwal Sholat updated successfully', 'jadwalSholat' => $jadwalSholat]);
    }

    /**
     * Remove the specified jadwal_sholat from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $jadwalSholat = JadwalSholat::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($jadwalSholat->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted jadwal sholat found for the given IDs'], 404);
        }

        foreach ($jadwalSholat as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Jadwal sholat records restored successfully']);
    }
}
