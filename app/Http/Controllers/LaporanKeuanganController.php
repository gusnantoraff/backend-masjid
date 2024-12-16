<?php

namespace App\Http\Controllers;

use App\Models\LaporanKeuangan;
use App\Models\PenerimaanKas;
use App\Models\PengeluaranKas;
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

    public function getDeleted()
    {
        $deletedData = LaporanKeuangan::onlyTrashed()->get();
        return response()->json($deletedData);
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

    public function restore($ids): JsonResponse
    {
        $idsArray = explode(',', $ids);

        $laporanKeuangan = LaporanKeuangan::onlyTrashed()->whereIn('id', $idsArray)->get();

        if ($laporanKeuangan->isEmpty()) {
            return response()->json(['message' => 'No soft-deleted laporan keuangan found for the given IDs'], 404);
        }

        foreach ($laporanKeuangan as $item) {
            $item->restore();
        }

        return response()->json(['message' => 'Laporan keuangan records restored successfully']);
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
        $laporanKeuangan = [];

        switch ($periode) {
            case 'harian':
                $penerimaanKas = PenerimaanKas::whereDate('tanggal', '>=', now()->subDays(4)->toDateString())
                    ->whereDate('tanggal', '<=', now()->toDateString())
                    ->get();

                $pengeluaranKas = PengeluaranKas::whereDate('tanggal', '>=', now()->subDays(4)->toDateString())
                    ->whereDate('tanggal', '<=', now()->toDateString())
                    ->get();

                $result = [];
                foreach ($penerimaanKas as $item) {
                    if (!isset($result[$item->tanggal])) {
                        $result[$item->tanggal] = [
                            'total_pemasukan' => 0,
                            'total_pengeluaran' => 0
                        ];
                    }
                    $result[$item->tanggal]['total_pemasukan'] += $item->jumlah;
                }

                foreach ($pengeluaranKas as $item) {
                    if (!isset($result[$item->tanggal])) {
                        $result[$item->tanggal] = [
                            'total_pemasukan' => 0,
                            'total_pengeluaran' => 0
                        ];
                    }
                    $result[$item->tanggal]['total_pengeluaran'] += $item->jumlah;
                }

                foreach ($result as $tanggal => $data) {
                    $result[$tanggal]['sisa'] = $data['total_pemasukan'] - $data['total_pengeluaran'];
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

                    // Fetch data from both PenerimaanKas and PengeluaranKas
                    $penerimaanKas = PenerimaanKas::whereBetween('tanggal', [$startOfWeek, $endOfWeek])->get();
                    $pengeluaranKas = PengeluaranKas::whereBetween('tanggal', [$startOfWeek, $endOfWeek])->get();

                    // Calculate total pemasukan and total pengeluaran
                    $totalPemasukan = $penerimaanKas->sum('jumlah');
                    $totalPengeluaran = $pengeluaranKas->sum('jumlah');
                    $sisa = $totalPemasukan - $totalPengeluaran;

                    $laporanKeuangan["Minggu ke-$weekCount"] = [
                        'total_pemasukan' => $totalPemasukan,
                        'total_pengeluaran' => $totalPengeluaran,
                        'sisa' => $sisa,
                    ];

                    $currentWeek->addWeek();
                    $weekCount++;
                }
                break;

            case 'bulanan':
                // Fetch data from both PenerimaanKas and PengeluaranKas for each month
                $penerimaanKas = PenerimaanKas::all();
                $pengeluaranKas = PengeluaranKas::all();

                // Group by month and year
                $penerimaanGrouped = $penerimaanKas->groupBy(function ($item) {
                    return \Carbon\Carbon::parse($item->tanggal)->format('F Y');
                });

                $pengeluaranGrouped = $pengeluaranKas->groupBy(function ($item) {
                    return \Carbon\Carbon::parse($item->tanggal)->format('F Y');
                });

                $result = [];
                foreach ($penerimaanGrouped as $periode => $penerimaan) {
                    $totalPemasukan = $penerimaan->sum('jumlah');
                    $totalPengeluaran = $pengeluaranGrouped->has($periode) ? $pengeluaranGrouped[$periode]->sum('jumlah') : 0;
                    $sisa = $totalPemasukan - $totalPengeluaran;

                    $result[$periode] = [
                        'total_pemasukan' => $totalPemasukan,
                        'total_pengeluaran' => $totalPengeluaran,
                        'sisa' => $sisa,
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
                // Fetch data from both PenerimaanKas and PengeluaranKas for each year
                $penerimaanKas = PenerimaanKas::all();
                $pengeluaranKas = PengeluaranKas::all();

                // Group by year
                $penerimaanGrouped = $penerimaanKas->groupBy(function ($item) {
                    return \Carbon\Carbon::parse($item->tanggal)->year;
                });

                $pengeluaranGrouped = $pengeluaranKas->groupBy(function ($item) {
                    return \Carbon\Carbon::parse($item->tanggal)->year;
                });

                $result = [];
                foreach ($penerimaanGrouped as $year => $penerimaan) {
                    $totalPemasukan = $penerimaan->sum('jumlah');
                    $totalPengeluaran = $pengeluaranGrouped->has($year) ? $pengeluaranGrouped[$year]->sum('jumlah') : 0;
                    $sisa = $totalPemasukan - $totalPengeluaran;

                    $result[$year] = [
                        'total_pemasukan' => $totalPemasukan,
                        'total_pengeluaran' => $totalPengeluaran,
                        'sisa' => $sisa,
                    ];
                }

                $laporanKeuangan = $result;
                break;

            default:
                $laporanKeuangan = [];
                break;
        }

        return response()->json($laporanKeuangan);
    }

}