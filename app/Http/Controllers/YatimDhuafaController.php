<?php

namespace App\Http\Controllers;

use App\Models\YatimDhuafa;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class YatimDhuafaController extends Controller
{
    /**
     * Display a listing of the orphans.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $orphans = YatimDhuafa::all();
        return response()->json($orphans);
    }

    public function getDeleted()
    {
        $deletedData = YatimDhuafa::onlyTrashed()->get();
        return response()->json($deletedData);
    }    

    /**
     * Store a newly created orphan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'gender' => 'required|in:pria,wanita',
            'alamat' => 'required|string|max:255',
            'birth' => 'required|date',
            'keterangan' => 'required|in:yatim,piatu,yatim piatu,dhuafa',
            'kontak' => 'required|string|max:255',
            'status' => 'required|in:aktif,pindah,wafat',

        ]);

        $orphan = YatimDhuafa::create($validatedData);

        return response()->json(['message' => 'Orphan created successfully', 'orphan' => $orphan], 201);
    }

    /**
     * Display the specified orphan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $orphan = YatimDhuafa::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Orphan not found'], 404);
        }

        return response()->json($orphan);
    }

    /**
     * Update the specified orphan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $orphan = YatimDhuafa::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Orphan not found'], 404);
        }

        $validatedData = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'gender' => 'sometimes|in:pria,wanita',
            'alamat' => 'sometimes|string|max:255',
            'birth' => 'sometimes|date',
            'keterangan' => 'sometimes|in:yatim,piatu,yatim piatu,dhuafa',
            'kontak' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:aktif,pindah,wafat',
        ]);

        $orphan->update($validatedData);

        return response()->json(['message' => 'Orphan updated successfully', 'orphan' => $orphan]);
    }

    /**
     * Remove the specified orphan from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $orphan = YatimDhuafa::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Orphan not found'], 404);
        }

        $orphan->delete();

        return response()->json(['message' => 'Orphan deleted successfully']);
    }

    public function restore(int $id): JsonResponse
    {
        $yatim = YatimDhuafa::onlyTrashed()->find($id);

        if (!$yatim) {
            return response()->json(['message' => 'yatim not found or not soft-deleted'], 404);
        }

        // Update status deleted_status ke 0, hapus deleted_at, dan tambahkan restored_at
        $yatim->restore();

        return response()->json(['message' => 'yatim restored successfully']);
    }
}
