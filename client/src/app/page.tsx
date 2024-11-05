"use client";
import { useEffect } from 'react';
import AOS from 'aos';

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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });

    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Banner />
      <main className="flex-grow">
        <div className="container mx-auto">
          <InfoMasjid data-aos="fade-up" />
          <Keuangan data-aos="fade-right" />
          <KegiatanTerdekat data-aos="fade-left" />
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Jadwal Sholat</h2>
          <JadwalSholat2 data-aos="zoom-in" />
          <Pengumuman data-aos="fade-up" />
          <NewsSection data-aos="fade-right" />
          <Galeri data-aos="fade-left" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
