import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartPendapatan from "@/components/Charts/ChartPendapatan";
import ChartPengeluaran from "@/components/Charts/ChartPengeluaran";
import Kegiatan from "@/components/Kegiatan";

export const metadata: Metadata = {
  title:
    "SIstem Manajemen Masjid",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* Grid container for main content and news section */}
        <div className="grid grid-cols-1 xl:grid-cols-[70%_30%] gap-4">
          {/* Left section: Data and Charts */}
          <div className="col-span-1 xl:col-span-1">
            <div className="mb-6">
              <DataStatsOne />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <ChartPendapatan/>
              </div>
              <div className="w-1/2">
                <ChartPengeluaran />
              </div>
            </div>
          </div>

          {/* Right section: News */}
          <div className="col-span-1">
            <Kegiatan/>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}