"use client";

import React, { useEffect, useState } from "react";

// Definisi tipe props
interface StatsArusProps {
    showDashboardOnly?: boolean; // Properti opsional
}

const StatsArus: React.FC<StatsArusProps> = ({ showDashboardOnly = false }) => {
    const [dataStatsList, setDataStatsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/arus-kas",
                );
                const result = await response.json();

                // Format data untuk komponen
                const formattedData = [
                    {
                        title: "Total Sisa Kas",
                        value: result[0]?.sisa_kas_total || 0,
                        growthRate: 0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                    {
                        title: "Total Pemasukan",
                        value: result[0]?.pemasukan_total || 0,
                        growthRate: -0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                    {
                        title: "Total Pengeluaran",
                        value: result[0]?.pengeluaran_total || 0,
                        growthRate: 0.43, // Logika pertumbuhan aktual jika tersedia
                    },
                ];

                // Terapkan filter berdasarkan parameter
                const filteredData = showDashboardOnly
                    ? formattedData.filter((item) =>
                          ["Total Pemasukan", "Total Pengeluaran"].includes(
                              item.title,
                          ),
                      )
                    : formattedData;

                setDataStatsList(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [showDashboardOnly]);

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
            {dataStatsList.map((item) => (
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
            ))}
        </div>
    );
};

export default StatsArus;
