"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import axios from "@/utils/axios";

interface Jamaah {
    id: number; // bigint(20) UNSIGNED
    gender: "pria" | "wanita"; // enum('pria', 'wanita') NOT NULL
    keterangan: "aktif" | "pindah" | "wafat"; // enum('aktif', 'pindah', 'wafat') NOT NULL DEFAULT 'aktif'
  }

const Profil = () => {
    const [navbarBg, setNavbarBg] = useState(false);
    const [countMuslimAktif, setMuslimAktif] = useState(0);
    const [countMuslimahAktif, setMuslimahAktif] = useState(0);

    useEffect(() => {
        const fetchJamaah = async () => {
          try {
            // Fetch data jamaah dari endpoint
            const response = await axios.get("/jamaah");
    
            // Pastikan data berupa array dan hitung jumlah pria dan wanita aktif
            const data = response.data;
            if (Array.isArray(data)) {
              const priaAktif = data.filter(
                (jamaah) => jamaah.gender === "pria" && jamaah.keterangan === "aktif"
              ).length;
              const wanitaAktif = data.filter(
                (jamaah) =>
                  jamaah.gender === "wanita" && jamaah.keterangan === "aktif"
              ).length;
    
              setMuslimAktif(priaAktif);
              setMuslimahAktif(wanitaAktif);
            } else {
              console.error("Invalid data format. Expected an array.");
            }
          } catch (error) {
            console.error("Error fetching jamaah data:", error);
          }
        };
    
        fetchJamaah();
      }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                className={`fixed left-0 top-0 z-50 h-[78px] w-full ${navbarBg ? "bg-white" : "bg-white"}`}
            />
            <section
                className="mt-10 flex flex-col items-center bg-white px-4 py-10 font-poppins sm:mt-20 sm:px-6 md:mt-15 md:px-12 lg:px-20 xl:px-28"
                data-aos="fade-down"
                data-aos-delay="200"
            >
                <h2 className="flex items-center gap-3 text-center text-center font-poppins text-3xl font-bold text-ijo sm:text-4xl lg:text-5xl">
                    Jamaah
                </h2>
                <hr className="mx-auto my-4 w-2/3 rounded-lg border-2 border-ijo sm:my-6 sm:w-1/2 lg:w-[30%]" />

                <div className="flex span-2 gap-4">
                <div className="mt-8 flex items-center justify-center sm:mt-10">
                    <div className="relative w-full max-w-xs min-w-[150px] overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-ijo p-6 text-center shadow-md sm:max-w-sm sm:p-8">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-300 opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-300 opacity-20"></div>
                        <div className="mb-4">
                            <img
                                src="/images/muslim.png"
                                style={{ width: "64px", height: "64px" }}
                                className="mx-auto animate-bounce text-4xl text-white sm:text-5xl"
                            />
                        </div>
                        <h3 className="text-lg font-bold tracking-wide text-white sm:text-2xl">
                            Akhi
                        </h3>
                        <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                            {countMuslimAktif}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-green-300 to-teal-500"></div>
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-center sm:mt-10">
                    <div className="relative w-full max-w-xs min-w-[150px] overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-ijo p-6 text-center shadow-md sm:max-w-sm sm:p-8">
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-300 opacity-20"></div>
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-300 opacity-20"></div>
                        <div className="mb-4">
                            <img
                                src="/images/muslimah.png"
                                style={{ width: "64px", height: "64px" }}
                                className="mx-auto animate-bounce text-4xl text-white sm:text-5xl"
                            />
                        </div>
                        <h3 className="text-lg font-bold tracking-wide text-white sm:text-2xl">
                            Ukhti
                        </h3>
                        <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                            {countMuslimahAktif}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-green-300 to-teal-500"></div>
                    </div>
                </div>
                </div>
            </section>
            <Footer id="footer" />
        </div>
    );
};

export default Profil;
