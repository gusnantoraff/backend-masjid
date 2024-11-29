<?php

namespace App\Http\Controllers;

use App\Models\Images;
use App\Models\Kegiatan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Display a listing of all images.
     */
    public function index(Request $request): JsonResponse
    {
        $kategori = $request->query('kategori');

        $query = Images::query();

        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $images = $query->get();

        return response()->json($images);
    }

    /**
     * Store a newly created image in storage for a specific model.
     */
    public function store(Request $request, string $modelType, int $modelId = null): JsonResponse
    {
        $modelClass = $this->getModelClass($modelType);
        $model = $modelClass::find($modelId);

        if (!$model) {
            return response()->json(['message' => 'Model not found'], 404);
        }

        $validatedData = $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'required|string',
        ]);

        $file = $request->file('foto');
        $filePath = $file->store('images', 'public');

        $image = $model->images()->create([
            'image' => $filePath,
            'kategori' => $modelType,
            'keterangan' => $validatedData['keterangan'],
        ]);

        return response()->json(['message' => 'Image uploaded successfully', 'image' => $image], 201);
    }

    /**
     * Handle image upload specifically for 'galeri' category.
     */
    public function storeForGaleri(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'keterangan' => 'required|string',
            'kategori' => 'required|string|in:galeri',
        ]);

        $file = $request->file('image');
        $filePath = $file->store('images', 'public');

        $image = Images::create([
            'image' => $filePath,
            'keterangan' => $validatedData['keterangan'],
            'kategori' => $validatedData['kategori'],
        ]);

        return response()->json(['message' => 'Image Galeri uploaded successfully', 'image' => $image], 201);
    }
    /**
     * Display the specified image.
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
     */
    public function destroy(int $id): JsonResponse
    {
        $image = Images::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        Storage::disk('public')->delete($image->image);
        $image->delete();

        return response()->json(['message' => 'Image soft deleted successfully']);
    }

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $images = Images::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($images->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted images found for the given IDs'], 404);
        }

        foreach ($images as $image) {
            $image->restore();
        }

        return response()->json(['message' => 'Images restored successfully']);
    }


    /**
     * Get the fully qualified model class name.
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
