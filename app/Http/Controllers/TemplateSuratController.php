<?php

namespace App\Http\Controllers;

use App\Models\TemplateSurat;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TemplateSuratController extends Controller
{
    /**
     * Display a listing of the template_surat.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $templateSurat = TemplateSurat::all();
        return response()->json($templateSurat);
    }

    /**
     * Display a listing of the soft-deleted template_surat.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDeleted(): JsonResponse
    {
        $deletedData = TemplateSurat::onlyTrashed()->get();
        return response()->json($deletedData);
    }

    /**
     * Store a newly created template_surat in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'judul_surat' => 'nullable|string|max:255',
            'isi_surat' => 'required|string',
            'tanggal' => 'required|date',
            'nomor' => 'nullable|string|max:255',
            'hal' => 'nullable|string|max:255',
            'lampiran' => 'nullable|string|max:255',
            'penerima' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'nama_ttd' => 'nullable|string',
            'stempel' => 'nullable|string',
        ]);

        $templateSurat = TemplateSurat::create($validatedData);

        return response()->json(['message' => 'Template Surat created successfully', 'templateSurat' => $templateSurat], 201);
    }

    /**
     * Display the specified template_surat.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $templateSurat = TemplateSurat::find($id);

        if (!$templateSurat) {
            return response()->json(['message' => 'Template Surat not found'], 404);
        }

        return response()->json($templateSurat);
    }

    /**
     * Update the specified template_surat in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $templateSurat = TemplateSurat::find($id);

        if (!$templateSurat) {
            return response()->json(['message' => 'Template Surat not found'], 404);
        }

        $validatedData = $request->validate([
            'judul_surat' => 'nullable|string|max:255',
            'isi_surat' => 'sometimes|string',
            'tanggal' => 'sometimes|date',
            'nomor' => 'nullable|string|max:255',
            'hal' => 'nullable|string|max:255',
            'lampiran' => 'nullable|string|max:255',
            'penerima' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'nama_ttd' => 'nullable|string',
            'stempel' => 'nullable|string',
        ]);

        $templateSurat->update($validatedData);

        return response()->json(['message' => 'Template Surat updated successfully', 'templateSurat' => $templateSurat]);
    }

    /**
     * Remove the specified template_surat from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $templateSurat = TemplateSurat::find($id);

        if (!$templateSurat) {
            return response()->json(['message' => 'Template Surat not found'], 404);
        }

        $templateSurat->delete();

        return response()->json(['message' => 'Template Surat deleted successfully']);
    }

    /**
     * Restore the soft-deleted template_surat.
     *
     * @param string $ids
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(string $ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $templateSurat = TemplateSurat::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($templateSurat->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted template surat found for the given IDs'], 404);
        }

        foreach ($templateSurat as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Template surat records restored successfully']);
    }
}
