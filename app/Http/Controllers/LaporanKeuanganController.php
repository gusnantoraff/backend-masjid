<?php

namespace App\Http\Controllers;

use App\Models\LaporanKeuangan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class LaporanKeuanganController extends Controller
{
    /**
     * Display a listing of the laporan_keuangan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::all();
        return response()->json($laporanKeuangan);
    }

    /**
     * Store a newly created laporan_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'periode' => 'required|date',
            'total_pemasukan' => 'required|numeric',
            'total_pengeluaran' => 'required|numeric',
        ]);

        $laporanKeuangan = LaporanKeuangan::create($validatedData);

        return response()->json(['message' => 'Laporan Keuangan created successfully', 'laporanKeuangan' => $laporanKeuangan], 201);
    }

    /**
     * Display the specified laporan_keuangan.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function show(int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        return response()->json($laporanKeuangan);
    }

    /**
     * Update the specified laporan_keuangan in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        $validatedData = $request->validate([
            'periode' => 'sometimes|date',
            'total_pemasukan' => 'sometimes|numeric',
            'total_pengeluaran' => 'sometimes|numeric',
        ]);

        $laporanKeuangan->update($validatedData);

        return response()->json(['message' => 'Laporan Keuangan updated successfully', 'laporanKeuangan' => $laporanKeuangan]);
    }

    /**
     * Remove the specified laporan_keuangan from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::find($id);

        if (!$laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found'], 404);
        }

        $laporanKeuangan->delete();

        return response()->json(['message' => 'Laporan Keuangan soft deleted successfully']);
    }

    public function restore(int $id): JsonResponse
    {
        $laporanKeuangan = LaporanKeuangan::onlyTrashed()->find($id);

        if (! $laporanKeuangan) {
            return response()->json(['message' => 'Laporan Keuangan not found or not soft-deleted'], 404);
        }

        // Update status deleted_status ke 0, hapus deleted_at, dan tambahkan restored_at
        $laporanKeuangan->restore();

        return response()->json(['message' => 'Laporan Keuangan restored successfully']);
    }

    /**
     * Get laporan keuangan berdasarkan periode.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPeriode(Request $request): JsonResponse
    {
        $request->validate([
            'periode' => 'required|string|in:harian,mingguan,bulanan,tahunan',
        ]);

        $periode = $request->periode;

        switch ($periode) {
            case 'harian':
                $startDate = now()->subDays(4)->toDateString();
                $endDate = now()->toDateString();

                $laporanKeuangan = LaporanKeuangan::whereBetween('periode', [
                    $startDate,
                    $endDate
                ])->orderBy('periode', 'asc')
                    ->get();

                $result = [];
                foreach ($laporanKeuangan as $laporan) {
                    $result[$laporan->periode] = [
                        'total_pemasukan' => $laporan->total_pemasukan,
                        'total_pengeluaran' => $laporan->total_pengeluaran,
                        'sisa' => $laporan->total_pemasukan - $laporan->total_pengeluaran,
                    ];
                }

                $laporanKeuangan = $result;
                break;

            case 'mingguan':
                $startOfMonth = now()->startOfMonth();
                $endOfMonth = now()->endOfMonth();

                $currentWeek = $startOfMonth->copy();
                $weekCount = 1;

                while ($currentWeek->lte($endOfMonth)) {
                    $startOfWeek = $currentWeek->copy()->startOfWeek();
                    $endOfWeek = $currentWeek->copy()->endOfWeek();

                    $laporanMingguan = LaporanKeuangan::whereBetween('periode', [
                        $startOfWeek->toDateString(),
                        $endOfWeek->toDateString(),
                    ])->get();

                    $totalPemasukan = $laporanMingguan->sum('total_pemasukan');
                    $totalPengeluaran = $laporanMingguan->sum('total_pengeluaran');
                    $sisa = $totalPemasukan - $totalPengeluaran;

                    $laporanKeuangan["Minggu ke-$weekCount " . $startOfMonth->format('F Y')] = [
                        'total_pemasukan' => $totalPemasukan,
                        'total_pengeluaran' => $totalPengeluaran,
                        'sisa' => $sisa,
                    ];

                    $currentWeek->addWeek();
                    $weekCount++;
                }
                break;

                case 'bulanan':
                    $laporanKeuangan = LaporanKeuangan::all();
                
                    $laporanGrouped = $laporanKeuangan->groupBy(function ($item) {
                        return \Carbon\Carbon::parse($item->periode)->format('F Y'); 
                    });
                
                    $result = [];
                    foreach ($laporanGrouped as $periode => $laporan) {
                        $totalPemasukan = $laporan->sum('total_pemasukan');
                        $totalPengeluaran = $laporan->sum('total_pengeluaran');
                        $sisa = $totalPemasukan - $totalPengeluaran;
                
                        $result[$periode] = [
                            'total_pemasukan' => $totalPemasukan,
                            'total_pengeluaran' => $totalPengeluaran,
                            'sisa' => $sisa
                        ];
                    }
                
                    uksort($result, function ($a, $b) {
                        $dateA = \Carbon\Carbon::createFromFormat('F Y', $a);
                        $dateB = \Carbon\Carbon::createFromFormat('F Y', $b);
                
                        return $dateA->lt($dateB) ? -1 : 1;
                    });
                
                    $laporanKeuangan = $result;
                    break;
                

            case 'tahunan':
                $laporanKeuangan = LaporanKeuangan::all();

                $laporanTahunan = $laporanKeuangan->groupBy(function ($item) {
                    return Carbon::parse($item->periode)->year;
                });

                $result = $laporanTahunan->map(function ($laporan) {
                    $totalPemasukan = $laporan->sum('total_pemasukan');
                    $totalPengeluaran = $laporan->sum('total_pengeluaran');
                    $sisa = $totalPemasukan - $totalPengeluaran;

                    return [
                        'total_pemasukan' => $totalPemasukan,
                        'total_pengeluaran' => $totalPengeluaran,
                        'sisa' => $sisa
                    ];
                });

                $laporanKeuangan = $result->toArray();
                break;

            default:
                $laporanKeuangan = [];
                break;
        }

        return response()->json($laporanKeuangan);
    }

}