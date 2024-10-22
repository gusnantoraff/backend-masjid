"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-black">
          <Link href="/">Masjid Tercode</Link>
        </div>
        <nav className="flex space-x-6 items-center relative">
          <Link href="/" className="text-black hover:text-gray-300">Beranda</Link>        
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-black hover:text-gray-300 focus:outline-none"
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
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profil Masjid
                </Link>
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Keuangan
                </Link>
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Kegiatan Terdekat
                </Link>
              </div>
            )}
          </div>
          <Link href="/" className="text-black hover:text-gray-300">Artikel</Link>
          <Link href="/" className="text-black hover:text-gray-300">Galeri</Link>
          <Link href="/" className="text-black hover:text-gray-300">Contact Us</Link>
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">Donasi</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
