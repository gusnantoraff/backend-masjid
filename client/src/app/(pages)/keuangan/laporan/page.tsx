import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Stats from "../arus-kas/stats";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { IoMdAdd } from "react-icons/io";
import StatsLine from "@/components/DataStats/stats1";
import LaporanKeuangan from "./laporan";

export const metadata: Metadata = {
    title: "SIstem Manajemen Masjid",
    description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-2 gap-4">
                    <div className="cols-span-1">
                        <h1 className="p-2 text-4xl font-bold text-black">
                           Laporan Keuangan
                        </h1>
                    </div>
                </div>
                <Stats />
                <div className="mt-5 flex w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                    <StatsLine />
                </div>
                <div className="mt-5 flex w-full rounded-xl border border-gray-300 px-4 py-4 shadow-md">
                    <LaporanKeuangan />
                </div>
            </DefaultLayout>
        </>
    );
}
