<?php

namespace App\Http\Controllers;

use App\Models\PesanWebsite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PesanWebsiteController extends Controller
{
    /**
     * Display a listing of the pesan_website.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $pesanWebsite = PesanWebsite::all();
        return response()->json($pesanWebsite);
    }

    /**
     * Store a newly created pesan_website in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'nama_pengirim' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $pesanWebsite = PesanWebsite::create($validatedData);

        return response()->json(['message' => 'Pesan Website created successfully', 'pesanWebsite' => $pesanWebsite], 201);
    }

    /**
     * Display the specified pesan_website.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $pesanWebsite = PesanWebsite::find($id);

        if (!$pesanWebsite) {
            return response()->json(['message' => 'Pesan Website not found'], 404);
        }

        return response()->json($pesanWebsite);
    }

    /**
     * Update the specified pesan_website in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $pesanWebsite = PesanWebsite::find($id);

        if (!$pesanWebsite) {
            return response()->json(['message' => 'Pesan Website not found'], 404);
        }

        $validatedData = $request->validate([
            'nama_pengirim' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'pesan' => 'sometimes|string',
            'tanggal' => 'sometimes|date',
        ]);

        $pesanWebsite->update($validatedData);

        return response()->json(['message' => 'Pesan Website updated successfully', 'pesanWebsite' => $pesanWebsite]);
    }

    /**
     * Remove the specified pesan_website from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $pesanWebsite = PesanWebsite::find($id);

        if (!$pesanWebsite) {
            return response()->json(['message' => 'Pesan Website not found'], 404);
        }

        $pesanWebsite->delete();

        return response()->json(['message' => 'Pesan Website deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $pesanWebsite = PesanWebsite::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($pesanWebsite->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted pesan website found for the given IDs'], 404);
        }

        foreach ($pesanWebsite as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Pesan website records restored successfully']);
    }
}
