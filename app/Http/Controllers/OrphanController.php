<?php

namespace App\Http\Controllers;

use App\Models\Orphan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrphanController extends Controller
{
    /**
     * Display a listing of the orphans.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $orphans = Orphan::all();
        return response()->json($orphans);
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
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'birth' => 'required|date',
            'info' => 'required|in:Yatim,Piatu,Yatim Piatu',
        ]);

        $orphan = Orphan::create($validatedData);

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
        $orphan = Orphan::find($id);

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
        $orphan = Orphan::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Orphan not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'birth' => 'sometimes|required|date',
            'info' => 'sometimes|required|in:Yatim,Piatu,Yatim Piatu',
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
        $orphan = Orphan::find($id);

        if (!$orphan) {
            return response()->json(['message' => 'Orphan not found'], 404);
        }

        $orphan->delete();

        return response()->json(['message' => 'Orphan deleted successfully']);
    }
}
