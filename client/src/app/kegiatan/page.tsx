import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React from "react";
import Kegiatan from "@/components/Kegiatan";

export const metadata: Metadata = {
  title:
    "Sistem Manajemen Masjid",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-1 xl:grid-cols-[70%_30%] gap-4">
          <div className="col-span-1 xl:col-span-1">
          </div>
          <div className="col-span-1">
            <Kegiatan/>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}