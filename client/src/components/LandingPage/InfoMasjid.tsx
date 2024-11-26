import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import { FaMosque, FaCheckCircle } from 'react-icons/fa';

interface Facility {
  id: number;
  nama_fasilitas: string;
  deskripsi: string;
}

interface InfoMasjid {
  id: number;
  nama_masjid: string;
  deskripsi: string;
  fasilitas: Facility[];
}

interface InfoMasjidProps {
  id?: string;
}

const InfoMasjid: React.FC<InfoMasjidProps> = ({ id }) => {
  const [infoMasjid, setInfoMasjid] = useState<InfoMasjid | null>(null);

  useEffect(() => {
    const fetchMasjidData = async () => {
      try {
        const response = await axios.get('/info-masjid');
        setInfoMasjid(response.data[0]);
      } catch (error) {
        console.error("Error fetching masjid data:", error);
      }
    };

    fetchMasjidData();
  }, []);

  if (!infoMasjid) {
    return <div></div>;
  }

  const { nama_masjid, deskripsi, fasilitas } = infoMasjid;

  return (
    <section
      id={id}
      className="py-35 px-4 flex flex-col items-center bg-white font-poppins"
      data-aos="fade-down"
      data-aos-delay="200"
    >
      {/* Header */}
      <h2 className="text-4xl text-ijo font-bold flex items-center gap-3">
        <FaMosque /> Profil {nama_masjid}
      </h2>
      <hr className="my-6 mb-6 border-ijo w-[30%] mx-auto border-2 rounded-lg" />

      {/* Deskripsi */}
      <div className="w-full bg-teal-50 p-8 shadow-md rounded-lg mt-8 text-gray-700">
        <h3 className="text-2xl font-semibold mb-4 text-teal-700">Tentang {nama_masjid}</h3>
        <p className="leading-relaxed text-justify">{deskripsi}</p>
      </div>

      {/* Total Fasilitas */}
      <div className="mt-10 flex justify-center items-center">
        <div className="bg-gradient-to-br from-teal-500 to-ijo shadow-md rounded-lg p-6 text-center w-80 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-300 opacity-20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-300 opacity-20 rounded-full"></div>
          <div className="mb-4">
            <FaCheckCircle className="text-white text-5xl mx-auto animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-wide">Total Fasilitas</h3>
          <p className="text-white text-3xl font-semibold mt-3">{fasilitas.length}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-teal-500 rounded-full"></div>
        </div>
      </div>

    </section>
  );
};

export default InfoMasjid;
