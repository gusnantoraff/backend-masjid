import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import MonthlyFilter from "../arus-kas/DateFilter";
import PendapatanChart from "../arus-kas/pendapatanchart";
import LaporanKeuangan from "./laporan"


export const metadata: Metadata = {
    title: "SIstem Manajemen Masjid",
    description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                
                        <h1 className="p-2 text-4xl font-bold text-black">
                           Penerimaan
                        </h1>
                    
                           <MonthlyFilter/>
                    
               
                <div className="grid grid-cols-2 gap-4">
                    <div className="cols-span-1 rounded-xl px-2 py-2 shadow-md w-full border border-gray-300">
                    <h2 className="w-auto text-3xl font-medium text-black p-2 flex justify-center">
                    Total Penerimaan
                    </h2>
                    <h2 className="w-auto text-3xl font-bold text-black p-2 flex justify-center">
                    Rp 1.500.000,-
                    </h2>
                    <h2 className="w-auto text-xl font-medium text-black p-2 flex justify-center">
                    dalam periode 
                    </h2>
                    <h2 className="w-auto text-xl font-medium text-blue p-2 flex justify-center">
                    October 2024 
                    </h2> 
                    </div>

                    <div className="cols-span-1 rounded-xl border border-gray-300 px-2 py-2 shadow-md w-full">
                    <PendapatanChart/>
                    </div>
                </div>
                <div className="rounded-xl mt-4 px-2 py-2 shadow-md w-full border border-gray-300">
                <LaporanKeuangan/>
                </div>
                
                
            </DefaultLayout>
        </>
    );
}
