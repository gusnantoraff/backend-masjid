"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface JadwalSholatData {
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
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const convertToDate = (time: string, isNextDay = false): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    if (isNextDay) date.setDate(date.getDate() + 1);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const calculateTimeLeft = (nextPrayerTime: Date): string => {
    const now = new Date();
    const diff = Math.abs(nextPrayerTime.getTime() - now.getTime());
    const hoursLeft = Math.floor(diff / 1000 / 60 / 60);
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hoursLeft} jam ${minutesLeft} menit`;
  };

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const response = await axios.get('/api/jadwal-harian');
        const data = response.data?.data?.jadwal;
        if (data) {
          setJadwal(data);

          const prayerTimes = [
            { name: "Subuh", time: data.subuh },
            { name: "Dzuhur", time: data.dzuhur },
            { name: "Ashar", time: data.ashar },
            { name: "Maghrib", time: data.maghrib },
            { name: "Isya", time: data.isya },
          ];

          const now = new Date();
          let nextPrayerTime: Date | null = null;
          let nextPrayerName: string | null = null;

          for (let i = 0; i < prayerTimes.length; i++) {
            const prayerTime = convertToDate(prayerTimes[i].time);
            if (prayerTime > now) {
              nextPrayerTime = prayerTime;
              nextPrayerName = prayerTimes[i].name;
              break;
            }
          }

          if (!nextPrayerTime || !nextPrayerName) {
            nextPrayerTime = convertToDate(prayerTimes[0].time, true);
            nextPrayerName = prayerTimes[0].name;
          }

          if (nextPrayerTime && nextPrayerName) {
            setNextPrayer(nextPrayerName);
            setTimeLeft(calculateTimeLeft(nextPrayerTime));
          }
        } else {
          throw new Error("Jadwal untuk tanggal hari ini tidak ditemukan.");
        }
      } catch (error: any) {
        console.error("Error fetching jadwal sholat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJadwal();
  }, []);

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-[1100px] mx-auto"
      style={{
        backgroundImage: "url('/images/BG.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="mt-6 text-white font-semibold font-poppins">
        <p className="text-lg sm:text-xl md:text-2xl">
          Jadwal shalat berikutnya <strong className="text-xl sm:text-2xl">{nextPrayer}</strong>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl">
          Akan dimulai dalam <strong className="text-xl sm:text-2xl">{timeLeft}</strong> lagi
        </p>
      </div>
      <hr className="my-6 border-white w-[88%] mx-auto" />
  
      {isLoading ? (
        <p className="text-center text-white font-semibold text-lg sm:text-xl md:text-2xl font-poppins">Loading...</p>
      ) : (
        jadwal && (
          <>
            {/* Tabel untuk layar besar */}
            <div className="hidden md:block w-full mb-6">
              <table className="table-auto w-full text-center text-white font-semibold font-poppins">
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
                  <tr className="font-light font-poppins">
                    <td className="px-4 py-2">{jadwal.subuh} WIB</td>
                    <td className="px-4 py-2">{jadwal.dzuhur} WIB</td>
                    <td className="px-4 py-2">{jadwal.ashar} WIB</td>
                    <td className="px-4 py-2">{jadwal.maghrib} WIB</td>
                    <td className="px-4 py-2">{jadwal.isya} WIB</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            {/* Tabel untuk layar kecil (md dan sm) */}
            <div className="block md:hidden w-full mb-6">
              {/* Tabel 1: Shalat Pagi */}
              <table className="table-auto w-full text-center text-white font-semibold font-poppins mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Subuh</th>
                    <th className="px-4 py-2">Dzuhur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-light font-poppins">
                    <td className="px-4 py-2">{jadwal.subuh} <br/> WIB</td>
                    <td className="px-4 py-2">{jadwal.dzuhur} <br/> WIB</td>
                  </tr>
                </tbody>
              </table>
  
              {/* Tabel 2: Shalat Sore */}
              <table className="table-auto w-full text-center text-white font-semibold font-poppins">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Ashar</th>
                    <th className="px-4 py-2">Maghrib</th>
                    <th className="px-4 py-2">Isya</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-light font-poppins">
                    <td className="px-4 py-2">{jadwal.ashar} <br/> WIB</td>
                    <td className="px-4 py-2">{jadwal.maghrib} <br/> WIB</td>
                    <td className="px-4 py-2">{jadwal.isya} <br/> WIB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default JadwalSholat;
