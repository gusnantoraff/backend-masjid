"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import MonthlyFilter from "../arus-kas/DateFilter";
import PengeluaranChart from "../arus-kas/pengeluaranchart";
import LaporanKeuangan from "../arus-kas/laporan";



const Home = () => {
    const [pengeluaranTotal, setPengeluaranTotal] = useState(0);

    // Format numbers to Indonesian Rupiah format
    const formatRupiah = (number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);

    useEffect(() => {
        // Fetch data from API
        const fetchPengeluaranTotal = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/arus-kas",
                );
                const result = await response.json();
                if (result && result.length > 0) {
                    setPengeluaranTotal(result[0].pengeluaran_total);
                }
            } catch (error) {
                console.error("Error fetching Pengeluaran total:", error);
            }
        };

        fetchPengeluaranTotal();
    }, []);
    return (
        <>
            <DefaultLayout>
                <h1 className="p-2 text-4xl font-bold text-black">
                    Pengeluaran
                </h1>

                <MonthlyFilter />

                <div className="grid grid-cols-2 gap-4">
                    <div className="cols-span-1 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-red-600 px-4 py-6 shadow-md">
                        <h2 className="w-auto p-2 text-center text-3xl font-medium text-black">
                            Total Pengeluaran
                        </h2>
                        <h2 className="w-auto p-2 text-center text-3xl font-bold text-black">
                        {formatRupiah(pengeluaranTotal)}
                        </h2>
                    </div>

                    <div className="cols-span-1 w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                        <PengeluaranChart />
                    </div>
                </div>
                <div className="mt-4 w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                    <LaporanKeuangan
                        isArusKasPage={false}
                        isLaporanPage={false}
                        isPenerimaanPage={false}
                        isPengeluaranPage={true}
                    />
                </div>
            </DefaultLayout>
        </>
    );
}

export default Home;
