import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartPendapatan from "@/components/Charts/ChartPendapatan";
import ChartPengeluaran from "@/components/Charts/ChartPengeluaran";
import Kegiatan from "@/components/Kegiatan";
import InfoMasjid from "./infomasjid";

export const metadata: Metadata = {
    title: "SIstem Manajemen Masjid",
    description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <div className="rounded-lg border border-gray-500 mb-4">
                    <div className="grid h-full grid-cols-1 gap-2 xl:grid-cols-[70%_30%]">
                        <div className="col-span-1 h-full p-4">
                            <img
                                src="/images/masjid.jpg"
                                alt="Deskripsi Foto"
                                className="w-full"
                                style={{ height: "35rem" }}
                            />
                        </div>

                        <div className="col-span-1 p-2">
                            <InfoMasjid />
                        </div>
                    </div>
                    <div className="p-4">
                        <h1 className="mb-2 text-2xl font-bold">Deskripsi</h1>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Commodi impedit quidem error magnam nulla deleniti
                        eum porro, praesentium fugit ipsa exercitationem
                        corrupti voluptatem minus rem! Molestiae culpa cumque
                        quos labore?
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%]">
                    <div className="col-span-1 pt-2">
                        <div className="mb-6">
                            <DataStatsOne />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <ChartPendapatan />
                            </div>
                            <div className="w-1/2">
                                <ChartPengeluaran />
                            </div>
                        </div>
                    </div>

                    {/* Right section: News */}
                    <div className="col-span-1 mr-4">
                        <Kegiatan/>  
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
