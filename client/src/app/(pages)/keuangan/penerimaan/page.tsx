"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import MonthlyFilter from "../arus-kas/DateFilter";
import PendapatanChart from "../arus-kas/pendapatanchart";
import LaporanKeuangan from "../arus-kas/laporan";

const Home = () => {
    const [pemasukanTotal, setPemasukanTotal] = useState(0);

    // Format numbers to Indonesian Rupiah format
    const formatRupiah = (number) =>
      new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
      }).format(number);

    useEffect(() => {
        // Fetch data from API
        const fetchPemasukanTotal = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/arus-kas",
                );
                const result = await response.json();
                if (result && result.length > 0) {
                    setPemasukanTotal(result[0].pemasukan_total);
                }
            } catch (error) {
                console.error("Error fetching pemasukan total:", error);
            }
        };

        fetchPemasukanTotal();
    }, []);

    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">Penerimaan</h1>

            <MonthlyFilter />

            <div className="grid grid-cols-2 gap-4">
                    <div className="cols-span-1 flex w-full flex-col items-center justify-center rounded-xl border border-gray-300 bg-green-200 px-4 py-6 shadow-md">
                        <h2 className="w-auto p-2 text-center text-3xl font-medium text-black">
                            Total Pengeluaran
                        </h2>
                        <h2 className="w-auto p-2 text-center text-3xl font-bold text-black">
                        {formatRupiah(pemasukanTotal)}
                        </h2>
                    </div>
                    

                    <div className="cols-span-1 w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                <PendapatanChart />
            </div>
            </div>

            <div className="mt-4 w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                <LaporanKeuangan
                    isLaporanPage={false}
                    isPenerimaanPage={true}
                    isArusKasPage={false}
                    isPengeluaranPage={false}
                />
            </div>
        </DefaultLayout>
    );
};

export default Home;
