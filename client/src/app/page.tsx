"use client";
import { useEffect, useState } from 'react';

import Navbar from '@/components/LandingPage/Navbar';
import Banner from '@/components/LandingPage/Banner';
import KegiatanTerdekat from '@/components/LandingPage/Kegiatan';
import Keuangan from '@/components/LandingPage/Keuangan';
import InfoMasjid from '@/components/LandingPage/InfoMasjid';
import Galeri from '@/components/LandingPage/Galeri';
import NewsSection from '@/components/LandingPage/Berita';
import Footer from '@/components/LandingPage/Footer';


const Home = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar className={`fixed top-0 left-0 w-full z-50 h-[78px] ${navbarBg ? "bg-white" : "bg-white"}`} />
      <Banner id="home"  />
      <main className="flex-grow pt-16">

        <div className="container mx-auto px-40 pb-10">
          <InfoMasjid id="infoMasjid" />
          <Keuangan id="keuangan" />
        </div>

        <div className="w-full px-0">
          <KegiatanTerdekat id="kegiatan" />
        </div>

        <div className="container mx-auto px-40">
          <NewsSection id="berita" />
          <Galeri id="galeri" />
        </div>

      </main>
      <Footer id="footer" />
    </div>
  );
};

export default Home;
