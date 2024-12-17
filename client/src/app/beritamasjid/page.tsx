"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import NewsSection from "@/components/LandingPage/Berita";

const Profil = () => {
    const [navbarBg, setNavbarBg] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const infoMasjidSection = document.getElementById("infoMasjid");
            if (infoMasjidSection) {
                const sectionTop = infoMasjidSection.offsetTop;
                const scrollTop = window.scrollY;

                if (scrollTop >= sectionTop - 50) {
                    setNavbarBg(true);
                } else {
                    setNavbarBg(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                className={`fixed left-0 top-0 z-50 h-[78px] w-full ${navbarBg ? "bg-white" : "bg-white"}`}
            />
            <main>
                <div className="container mx-auto pb-20 mt-25">
                    <NewsSection />
                </div>
            </main>
            <Footer id="footer" />
        </div>
    );
};

export default Profil;
