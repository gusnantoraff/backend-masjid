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
  return (
    <div>
      <Navbar />
      <Banner />
      <main>
        <div className="container">
          <InfoMasjid />
          <Keuangan />
          <KegiatanTerdekat />
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Jadwal Sholat</h2>
          <JadwalSholat2 />
          <Pengumuman />
          <NewsSection />
          <Galeri />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
