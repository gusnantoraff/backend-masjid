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

const JadwalSholat2 = () => {
    const [jadwal, setJadwal] = useState<JadwalSholatData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('/api/provinsi');
                setProvinces(response.data.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
                setError("Error fetching provinces.");
            }
        };

        fetchProvinces();
    }, []);

    const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceName = event.target.value;
        setSelectedProvince(provinceName);
        setSelectedCity("");

        if (provinceName) {
            try {
                const response = await axios.get(`/api/kota?provinsi=${encodeURIComponent(provinceName)}`);
                setCities(response.data.data);
            } catch (error) {
                console.error("Error fetching cities:", error);
                setError("Error fetching cities.");
            }
        }
    };

    useEffect(() => {
        const fetchJadwalSholat = async () => {
            if (!selectedCity) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `/api/cari?provinsi=${encodeURIComponent(selectedProvince)}&kota=${encodeURIComponent(selectedCity)}&bulan=${selectedMonth}&tahun=${selectedYear}`
                );
                setJadwal(response.data.data);
            } catch (error) {
                console.error("Error fetching jadwal sholat:", error);
                setError("Error fetching jadwal sholat.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchJadwalSholat();
    }, [selectedCity, selectedMonth, selectedYear, selectedProvince]);

    const capitalizeFirstLetter = (text: string) => {
        return text
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[1100px] mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Jadwal Sholat</h2>

            <div className="mb-4">
                <label className="block mb-2">Provinsi</label>
                <select value={selectedProvince} onChange={handleProvinceChange} className="border p-2 rounded">
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((province) => (
                        <option key={province.id} value={province.name}>
                            {capitalizeFirstLetter(province.name)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Kota/Kabupaten</label>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border p-2 rounded"
                    disabled={!selectedProvince}
                >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {cities.length > 0 ? (
                        cities.map((city) => (
                            <option key={city.id} value={city.name}>
                               {capitalizeFirstLetter(city.name)}
                            </option>
                        ))
                    ) : (
                        <option value="">Tidak ada data kota/kabupaten</option>
                    )}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Bulan</label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    {Array.from({ length: 12 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Tahun</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    {Array.from({ length: 2073 - 2013 + 1 }, (_, index) => (
                        <option key={2013 + index} value={2013 + index}>
                            {2013 + index}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="table-auto w-full text-center">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tanggal</th>
                        <th className="px-4 py-2">Subuh</th>
                        <th className="px-4 py-2">Dzuhur</th>
                        <th className="px-4 py-2">Ashar</th>
                        <th className="px-4 py-2">Maghrib</th>
                        <th className="px-4 py-2">Isya</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(jadwal) && jadwal.length > 0 ? (
                        jadwal.map((hari) => (
                            <tr key={hari.key} className="bg-gray-100">
                                <td className="border px-4 py-2">{hari.tanggal}</td>
                                <td className="border px-4 py-2">{hari.subuh}</td>
                                <td className="border px-4 py-2">{hari.dzuhur}</td>
                                <td className="border px-4 py-2">{hari.ashar}</td>
                                <td className="border px-4 py-2">{hari.maghrib}</td>
                                <td className="border px-4 py-2">{hari.isya}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default JadwalSholat2;
