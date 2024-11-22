"use client";
import React, { useEffect, useState } from "react";

// Definisi tipe props
interface StatsArusProps {
    showDashboardOnly?: boolean; // Properti opsional
    filter: { month: number; year: number }; // Properti untuk filter bulan dan tahun
}

const StatsArus: React.FC<StatsArusProps> = ({ showDashboardOnly = false, filter }) => {
    const [dataStatsList, setDataStatsList] = useState<any[]>([]);

    useEffect(() => {
        // Pastikan filter bulan dan tahun tersedia
        const month = filter?.month ?? new Date().getMonth() + 1;  // Default ke bulan saat ini
        const year = filter?.year ?? new Date().getFullYear();     // Default ke tahun saat ini

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/arus-kas");
                const result = await response.json();

                // Debugging: Log data hasil fetch untuk melihat format tanggal dan data yang diterima
                console.log(result);

                // Filter data berdasarkan bulan dan tahun
                const filteredData = result.map((item: any) => {
                    // Filter penerimaan_kas berdasarkan bulan dan tahun
                    const filteredPenerimaan = item.penerimaan_kas.filter((penerimaan: any) => {
                        const date = new Date(penerimaan.tanggal); // Tanggal yang ada di penerimaan_kas
                        const itemMonth = date.getMonth() + 1; // Bulan dimulai dari 0
                        const itemYear = date.getFullYear();
                        console.log(`Checking penerimaan: ${penerimaan.tanggal}, month: ${itemMonth}, year: ${itemYear}`);
                        return itemMonth === month && itemYear === year;
                    });

                    // Filter pengeluaran_kas berdasarkan bulan dan tahun
                    const filteredPengeluaran = item.pengeluaran_kas.filter((pengeluaran: any) => {
                        const date = new Date(pengeluaran.tanggal); // Tanggal yang ada di pengeluaran_kas
                        const itemMonth = date.getMonth() + 1; // Bulan dimulai dari 0
                        const itemYear = date.getFullYear();
                        console.log(`Checking pengeluaran: ${pengeluaran.tanggal}, month: ${itemMonth}, year: ${itemYear}`);
                        return itemMonth === month && itemYear === year;
                    });

                    // Calculate total pemasukan and pengeluaran based on the filtered data
                    const totalPemasukan = filteredPenerimaan.reduce(
                        (sum: number, penerimaan: any) => sum + parseFloat(penerimaan.jumlah),
                        0
                    );
                    const totalPengeluaran = filteredPengeluaran.reduce(
                        (sum: number, pengeluaran: any) => sum + parseFloat(pengeluaran.jumlah),
                        0
                    );

                    return {
                        sisa_kas_total: item.sisa_kas_total,
                        pemasukan_total: totalPemasukan,
                        pengeluaran_total: totalPengeluaran,
                    };
                });

                // Jika tidak ada data setelah filter
                if (filteredData.length === 0 || !filteredData[0]) {
                    setDataStatsList([]);
                    return;
                }

                // Format data untuk komponen
                const formattedData = [
                    {
                        title: "Total Sisa Kas",
                        value: filteredData[0]?.sisa_kas_total || 0,
                        growthRate: 0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                    {
                        title: "Total Pemasukan",
                        value: filteredData[0]?.pemasukan_total || 0,
                        growthRate: -0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                    {
                        title: "Total Pengeluaran",
                        value: filteredData[0]?.pengeluaran_total || 0,
                        growthRate: 0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                ];

                // Terapkan filter berdasarkan parameter showDashboardOnly
                const filteredDataStats = showDashboardOnly
                    ? formattedData.filter((item) =>
                          ["Total Pemasukan", "Total Pengeluaran"].includes(item.title)
                      )
                    : formattedData;

                setDataStatsList(filteredDataStats);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [filter, showDashboardOnly]);

    // Format angka ke format Rupiah Indonesia
    const formatRupiah = (number: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);

    // Tentukan grid layout berdasarkan jumlah item
    const gridLayout =
        dataStatsList.length === 2
            ? "grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

    return (
        <div className={`grid gap-4 ${gridLayout} 2xl:gap-6`}>
            {dataStatsList.length === 0 ? (
                <div className="text-center text-red-500 font-bold">
                    Tidak ada data untuk bulan dan tahun yang dipilih.
                </div>
            ) : (
                dataStatsList.map((item) => (
                    <div
                        key={item.title}
                        className={`cols-span-1 mt-2 rounded-2xl px-4 py-4 shadow-md ${
                            item.title === "Total Pemasukan"
                                ? " bg-green-200"
                                : item.title === "Total Pengeluaran"
                                ? " bg-red-600"
                                : " bg-amber-500"
                        }`}
                    >
                        <h2 className="w-auto text-xl font-medium text-black dark:text-slate-800">
                            {item.title}
                        </h2>
                        <h2 className="w-auto text-2xl font-bold text-black dark:text-slate-800">
                            {formatRupiah(item.value)}
                        </h2>
                        <div className="mt-2 flex items-center">
                            <div
                                className={`rounded-full px-2 py-1 text-sm font-medium text-white ${
                                    item.growthRate > 0
                                        ? "bg-green-700 border border-green-500"
                                        : "bg-red-700 border border-red-400"
                                }`}
                            >
                                {item.growthRate > 0 ? "+" : ""}
                                {item.growthRate}%
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StatsArus;
