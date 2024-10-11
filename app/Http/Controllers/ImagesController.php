<?php

namespace App\Http\Controllers;

use App\Models\Images;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display a listing of all images.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $images = Images::all();
        return response()->json($images);
    }

    /**
     * Store a newly created image in storage for a specific model.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $modelType
     * @param int $modelId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, string $modelType, int $modelId): JsonResponse
    {
        // Determine the model class based on the type
        $modelClass = $this->getModelClass($modelType);
        $model = $modelClass::find($modelId);

        if (!$model) {
            return response()->json(['message' => 'Model not found'], 404);
        }

        $validatedData = $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'required|string',
        ]);

        // Handle the file upload
        $file = $request->file('foto');
        $filePath = $file->store('images', 'public');

        // Create the image record
        $image = $model->images()->create([
            'image' => $filePath,
            'kategori' => $modelType,
            'keterangan' => $validatedData['keterangan'],
        ]);

        return response()->json(['message' => 'Image uploaded successfully', 'image' => $image], 201);
    }

    /**
     * Display the specified image.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $image = Images::with('imageable')->find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json($image);
    }

    /**
     * Update the specified image in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $image = Images::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $validatedData = $request->validate([
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'sometimes|string',
        ]);

        // Handle file upload if exists
        if ($request->hasFile('foto')) {
            Storage::disk('public')->delete($image->image);
            $file = $request->file('foto');
            $filePath = $file->store('images', 'public');
            $image->update(['image' => $filePath]);
        }

        $image->update($validatedData);

        return response()->json(['message' => 'Image updated successfully', 'image' => $image]);
    }

    /**
     * Remove the specified image from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $image = Images::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        Storage::disk('public')->delete($image->image);
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }

    /**
     * Get the fully qualified model class name.
     *
     * @param string $modelType
     * @return string|null
     */
    private function getModelClass(string $modelType): ?string
    {
        $models = [
            'kegiatan' => Kegiatan::class,
            // Add other models here as needed
        ];

        return $models[$modelType] ?? null;
    }
}
