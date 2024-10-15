import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import React from "react";
import { Box } from "@mui/material";
import ButtonDefault from "@/components/Buttons/ButtonDefault";

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
          <div className="cols-apan-1">
          <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: "column", // Mengatur elemen agar berada dalam kolom (vertikal)
        justifyContent: "center",
          alignItems: 'center', 
          marginBottom: '20px', 
          // marginRight: '20px', 
          padding:'15px',
          backgroundColor: '#EDF1F8',
          color: 'black',
          borderRadius: '10px',
          width: '100%'
        }}
      >
        {/* Kotak untuk Judul */}
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#D1E3F8", // Warna latar belakang untuk judul
          borderRadius: "8px",
          marginBottom: "10px", // Jarak antara judul dan tombol
        }}
      >
          Laporan Keuangan Tahunan
      </Box>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2024"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2023"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2022"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2021"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2020"
                >
                </ButtonDefault>
            </Box>
          </div>
          <div className="cols-apan-1">
          <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: "column", // Mengatur elemen agar berada dalam kolom (vertikal)
        justifyContent: "center",
          alignItems: 'center', 
          marginBottom: '20px', 
          // marginLeft: '10px', 
          padding:'15px',
          backgroundColor: '#EDF1F8',
          color: 'black',
          borderRadius: '10px',
          width: '100%'
        }}
      >
        {/* Kotak untuk Judul */}
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#D1E3F8", // Warna latar belakang untuk judul
          borderRadius: "8px",
          marginBottom: "10px", // Jarak antara judul dan tombol
        }}
      >
          Laporan Keuangan Tahunan
      </Box>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2024"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2023"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2022"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2021"
                >
                </ButtonDefault>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2020"
                >
                </ButtonDefault>
            </Box>
          </div>
        </div>
        <div className="cols-apan-1">
          <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: "column", // Mengatur elemen agar berada dalam kolom (vertikal)
        justifyContent: "center",
          alignItems: 'center', 
          marginBottom: '20px', 
          marginRight: '20px', 
          padding:'15px',
          backgroundColor: '#EDF1F8',
          color: 'black',
          borderRadius: '10px',
          width: '100%'
        }}
      >
        {/* Kotak untuk Judul */}
      <Box
        sx={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#D1E3F8", // Warna latar belakang untuk judul
          borderRadius: "8px",
          marginBottom: "10px", // Jarak antara judul dan tombol
        }}
      >
          Laporan Keuangan Tahunan
      </Box>
            <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center w-full mt-2"
                    label="Keuangan 2024"
                >
                </ButtonDefault>
            </Box>
          </div>
      </DefaultLayout>
    </>
  );
}