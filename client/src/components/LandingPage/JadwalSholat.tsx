"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface JadwalSholatData {
  key: string;
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const JadwalSholat = () => {
  const [jadwal, setJadwal] = useState<JadwalSholatData | null>(null);

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const today = getTodayDate();

    const fetchJadwal = async () => {
      try {
        const response = await axios.get('/api/cari');
        const data = response.data;

        const todayJadwal = data.data.find((hari: JadwalSholatData) => hari.key === today);

        if (todayJadwal) {
          setJadwal(todayJadwal);
        } else {
          throw new Error("Jadwal untuk tanggal hari ini tidak ditemukan.");
        }

      } catch (error: any) {
        console.error("Error fetching jadwal sholat:", error);
      }
    };

    fetchJadwal();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[1100px] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Jadwal Sholat Hari Ini</h2>
      <h3 className="text-xl mb-4">Bantul, Yogyakarta</h3>
      {jadwal && (
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Subuh</th>
              <th className="px-4 py-2">Dzuhur</th>
              <th className="px-4 py-2">Ashar</th>
              <th className="px-4 py-2">Maghrib</th>
              <th className="px-4 py-2">Isya</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2">{jadwal.subuh}</td>
              <td className="border px-4 py-2">{jadwal.dzuhur}</td>
              <td className="border px-4 py-2">{jadwal.ashar}</td>
              <td className="border px-4 py-2 font-semibold text-orange-600">{jadwal.maghrib}</td>
              <td className="border px-4 py-2">{jadwal.isya}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JadwalSholat;