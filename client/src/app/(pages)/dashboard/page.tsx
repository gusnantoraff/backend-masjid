"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartPendapatan from "@/components/Charts/ChartPendapatan";
import ChartPengeluaran from "@/components/Charts/ChartPengeluaran";
import Kegiatan from "@/components/Kegiatan";
import InfoMasjid from "./infomasjid";
import ListKegiatan from "@/components/KegiatanComponents/ListKegiatan";
import StatsArus from "./stats";

export default function Home() {
    const [refreshList, setRefreshList] = useState(false);

    const handleRefresh = () => {
        setRefreshList((prev) => !prev);
    };

    return (
        <>
            <DefaultLayout>
                <div className="mb-4 rounded-lg border border-gray-200 shadow-md">
                    
                        

                            <InfoMasjid />
                       
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%]">
                    <div className="col-span-1 pt-2">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <ChartPendapatan />
                            </div>
                            <div className="w-1/2">
                                <ChartPengeluaran />
                            </div>
                        </div>
                        <div className="w-full">
                            <StatsArus />
                        </div>
                    </div>

                    {/* Right section: News */}
                    <div className="col-span-1 mr-2">
                        <Kegiatan />
                        <ListKegiatan refresh={refreshList} />
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
