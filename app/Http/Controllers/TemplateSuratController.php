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
     * Store a newly created template_surat in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'judul_surat' => 'required|string|max:255',
            'isi_surat' => 'required|string',
            'tanda_tangan' => 'nullable|string',
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
            'judul_surat' => 'sometimes|string|max:255',
            'isi_surat' => 'sometimes|string',
            'tanda_tangan' => 'nullable|string',
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

    public function restore(int $id): JsonResponse
    {
        $template = TemplateSurat::onlyTrashed()->find($id);

        if (! $template) {
            return response()->json(['message' => 'template not found or not soft-deleted'], 404);
        }

        // Update status deleted_status ke 0, hapus deleted_at, dan tambahkan restored_at
        $template->restore();

        return response()->json(['message' => 'template restored successfully']);
    }
}
