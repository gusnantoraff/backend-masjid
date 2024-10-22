<?php

namespace App\Http\Controllers;

use App\Models\Images;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    public function index(): JsonResponse
    {
        $images = Images::with('kegiatan')->get();

        return response()->json($images);
    }

    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Image validation
        ]);

        if ($request->hasFile('image')) {
            // Store image in public/storage/images
            $path = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $path;
        }

        $image = Images::create($validatedData);

        return response()->json(['message' => 'Image uploaded successfully', 'image' => $image], 201);
    }

    public function show($id): JsonResponse
    {
        $image = Images::with('kegiatan')->find($id);

        if (! $image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json($image);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $image = Images::find($id);

        if (! $image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $validatedData = $request->validate([
            'kategori' => 'required|string',
            'keterangan' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($image->image);

            // Store new image
            $path = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $path;
        }

        $image->update($validatedData);

        return response()->json(['message' => 'Image updated successfully', 'image' => $image]);
    }

    public function destroy($id): JsonResponse
    {
        $image = Images::find($id);

        if (! $image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        // Delete the image file
        Storage::disk('public')->delete($image->image);

        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
