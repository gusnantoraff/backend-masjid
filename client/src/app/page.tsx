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
import JadwalSholat2 from '@/components/LandingPage/JadwalSholat2';
import Pengumuman from '@/components/LandingPage/Pengumuman';

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
      <Banner />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-20">
          <InfoMasjid id="infoMasjid" />
          <Keuangan id="keuangan" />
          <KegiatanTerdekat id="kegiatan" />
          <Pengumuman id="pengumuman" />
          <NewsSection id="berita" />
          <Galeri id="galeri" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
