import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiCalendar, BiMap } from 'react-icons/bi';
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import Link from 'next/link';

interface Image {
  id: number;
  keterangan: string;
  kategori: string;
  image: string;
}

interface Kegiatan {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  lokasi: string;
  images: Image[];
}

interface KegiatanTerdekatProps {
  id?: string;
}

const KegiatanTerdekat: React.FC<KegiatanTerdekatProps> = ({ id }) => {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kegiatan');
        setKegiatan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section id={id} className="py-40 px-4">
      <h2 className="text-3xl text-gray-700 mb-6 text-center font-poppins">Kegiatan Terdekat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kegiatan.map((item) => (
          <div key={item.id} className="group bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={
                  item.images && item.images.length > 0
                    ? `http://localhost:8000/storage/${item.images[0].image}`
                    : '/images/placeholder.png'
                }
                alt={item.nama_kegiatan}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="px-6 pb-3">
              <h3 className="text-xl text-gray-700 font-semibold mb-2">{item.nama_kegiatan}</h3>
              <div className="flex items-center text-gray-700 mb-2">
                <BiCalendar size={20} style={{ marginRight: '5px', color: '#14B8A6' }} /> {item.tanggal}
              </div>
              <div className="flex items-center text-gray-700 mb-4">
                <BiMap size={20} style={{ marginRight: '5px', color: '#F97F30' }} /> {item.lokasi}
              </div>
            </div>
            <div className="absolute bottom-8 right-6 w-15 h-10 rounded-lg bg-[rgba(20,184,166,0.3)] group-hover:bg-ijo flex justify-center items-center transition-all duration-300 cursor-pointer">
              <Link href="/detail" className="transform group-hover:scale-125">
                <FaArrowRight size={24} className="text-white" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KegiatanTerdekat;
