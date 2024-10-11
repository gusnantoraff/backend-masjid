import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React from "react";
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
          <div>
          </div>
      </DefaultLayout>
    </>
  );
}