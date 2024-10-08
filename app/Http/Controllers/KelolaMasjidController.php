<?php

namespace App\Http\Controllers;

use App\Models\KelolaMasjid;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class KelolaMasjidController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $masjid = KelolaMasjid::all();

        return response()->json($masjid, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_masjid' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'kategori' => 'required|string',
            'provinsi' => 'required|string|max:100',
            'kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100', // New field
            'desa' => 'required|string|max:100', // New field
            'RW' => 'required|string|max:10', // New field
            'alamat_lengkap' => 'required|string|max:255', // New field
            'description_text' => 'nullable|string', // New field
            'luas_tanah' => 'required|numeric|min:0',
            'status_tanah' => 'required|string|max:50',
            'luas_bangunan' => 'required|numeric|min:0',
            'tahun_berdiri' => 'required|digits:4|integer|min:1900|max:'.date('Y'),
            'jumlah_jamaah' => 'nullable|integer|min:0',
            'jumlah_muazin' => 'nullable|integer|min:0',
            'jumlah_khatib' => 'nullable|integer|min:0',
            'jumlah_remaja' => 'nullable|integer|min:0', // New field
            'website' => 'nullable|string|max:255', // New field
        ]);

        $masjid = KelolaMasjid::create($validated);

        return response()->json($masjid, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaMasjid $kelola_masjid)
    {
        return response()->json($kelola_masjid, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaMasjid $kelola_masjid)
    {
        $validated = $request->validate([
            'nama_masjid' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'kategori' => 'required|string',
            'provinsi' => 'required|string|max:100',
            'kota' => 'required|string|max:100',
            'kecamatan' => 'required|string|max:100', // New field
            'desa' => 'required|string|max:100', // New field
            'RW' => 'required|string|max:10', // New field
            'alamat_lengkap' => 'required|string|max:255', // New field
            'description_text' => 'nullable|string', // New field
            'luas_tanah' => 'required|numeric|min:0',
            'status_tanah' => 'required|string|max:50',
            'luas_bangunan' => 'required|numeric|min:0',
            'tahun_berdiri' => 'required|digits:4|integer|min:1900|max:'.date('Y'),
            'jumlah_jamaah' => 'nullable|integer|min:0',
            'jumlah_muazin' => 'nullable|integer|min:0',
            'jumlah_khatib' => 'nullable|integer|min:0',
            'jumlah_remaja' => 'nullable|integer|min:0', // New field
            'website' => 'nullable|string|max:255', // New field
        ]);

        $kelola_masjid->update($validated);

        return response()->json($kelola_masjid, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaMasjid $kelola_masjid)
    {
        $kelola_masjid->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
