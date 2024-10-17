import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Stats from "./stats";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { IoMdAdd } from "react-icons/io";
import StatsLine from "@/components/DataStats/stats1";

export const metadata: Metadata = {
  title:
    "SIstem Manajemen Masjid",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-2 gap-4">
          <div className="cols-span-1">
            <h1 className="p-2 text-4xl font-bold text-black">Keuangan</h1>
          </div>
          <div className="cols-span-1">
            <div className="flex justify-end">
            <ButtonDefault link="/"
                    customClasses="mt-2 bg-cyan-400 text-white px-4 py-2 rounded-xl flex items-center"
                    label="Tambah Laporan"><IoMdAdd className="text-white"/></ButtonDefault>
                    </div>
          </div>
        </div>
        <Stats/>
        <div className="flex border border-gray-300 rounded-xl shadow-md px-2 py-2 mt-5 w-full">
        <StatsLine/>
        </div>
      </DefaultLayout>
    </>
  );
}