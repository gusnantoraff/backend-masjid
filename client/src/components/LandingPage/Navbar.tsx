"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${className}`}>
      <div className="container mx-auto px-20 py-2 flex justify-between items-center">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo-ijo.png"}
            alt="Logo"
            priority
            className="dark:hidden"
            style={{
              width: "auto",
              height: "60px",
            }}
          />
        </Link>
        <nav className="flex space-x-8 items-center relative font-poppins text-lg font-semibold">
          <Link href="/" className="text-gray-700 hover:text-gray-500">Beranda</Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-700 hover:text-gray-500 focus:outline-none"
            >
              Info Masjid
              <FaAngleDown className='ml-2' />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 border border-gray-200 rounded-lg shadow-lg z-20 backdrop-filter backdrop-blur-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <button onClick={() => scrollToSection("infoMasjid")} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 text-left">Profil Masjid</button>
                <button onClick={() => scrollToSection("keuangan")} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 text-left">Keuangan</button>
                <button onClick={() => scrollToSection("kegiatan")} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 text-left">Kegiatan Terdekat</button>
              </div>
            )}
          </div>
          <button onClick={() => scrollToSection("pengumuman")} className="text-gray-700 hover:text-gray-500">Pengumuman</button>
          <button onClick={() => scrollToSection("berita")} className="text-gray-700 hover:text-gray-500">Artikel</button>
          <button onClick={() => scrollToSection("galeri")} className="text-gray-700 hover:text-gray-500">Galeri</button>
          <button className="bg-ijo text-white py-2 px-4 rounded-lg hover:bg-green-light-7">
            <Link href="/contact">Kontak</Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
