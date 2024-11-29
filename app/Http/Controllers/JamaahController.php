<?php

namespace App\Http\Controllers;

use App\Models\Jamaah;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JamaahController extends Controller
{
    /**
     * Display a listing of the jamaah.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $jamaah = Jamaah::all();
        return response()->json($jamaah);
    }

    public function getDeleted()
    {
        $deletedData = Jamaah::onlyTrashed()->get();
        return response()->json($deletedData);
    }

    /**
     * Store a newly created jamaah in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'birth' => 'required|date',
            'gender' => 'required|in:pria,wanita',
            'email' => 'required|email|max:255|unique:jamaah,email',
            'kontak' => 'nullable|string|max:20',
            'alamat' => 'nullable|string|max:1000',
            'keterangan' => 'nullable|in:aktif,pindah,wafat',
        ]);

        $jamaah = Jamaah::create($validatedData);

        return response()->json(['message' => 'Jamaah created successfully', 'jamaah' => $jamaah], 201);
    }

    /**
     * Display the specified jamaah.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $jamaah = Jamaah::find($id);

        if (!$jamaah) {
            return response()->json(['message' => 'Jamaah not found'], 404);
        }

        return response()->json($jamaah);
    }

    /**
     * Update the specified jamaah in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $jamaah = Jamaah::find($id);

        if (!$jamaah) {
            return response()->json(['message' => 'Jamaah not found'], 404);
        }

        $validatedData = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'birth' => 'sometimes|date',
            'gender' => 'sometimes|in:pria,wanita',
            'email' => 'sometimes|email|max:255|unique:jamaah,email,' . $id,
            'kontak' => 'nullable|string|max:20',
            'alamat' => 'nullable|string|max:1000',
            'keterangan' => 'nullable|in:aktif,pindah,wafat',
        ]);

        $jamaah->update($validatedData);

        return response()->json(['message' => 'Jamaah updated successfully', 'jamaah' => $jamaah]);
    }

    /**
     * Remove the specified jamaah from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $jamaah = Jamaah::find($id);

        if (!$jamaah) {
            return response()->json(['message' => 'Jamaah not found'], 404);
        }

        $jamaah->delete();

        return response()->json(['message' => 'Jamaah soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $jamaah = Jamaah::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($jamaah->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted jamaah found for the given IDs'], 404);
        }

        foreach ($jamaah as $record) {
            $record->restore();
        }

        return response()->json(['message' => 'Jamaah records restored successfully']);
    }
}
