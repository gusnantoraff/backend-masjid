import React, { useState, useEffect } from "react";
import { FiPhone, FiMapPin } from "react-icons/fi";

// URL API
const fetchUrl = 'http://localhost:8000/api/info-masjid';

interface InfoMasjidData {
    id: number;
    nama_masjid: string;
    alamat: string;
    kontak: string;
    deskripsi: string;
    ad_art: string;
}

const InfoMasjid = () => {
    const [infoMasjid, setInfoMasjid] = useState<InfoMasjidData | null>(null); // Menggunakan interface
    const [loading, setLoading] = useState(true); // Status loading
    const [error, setError] = useState<string | null>(null); // Menangani error

    // Mengambil data masjid dari API
    useEffect(() => {
        const fetchInfoMasjid = async () => {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data: InfoMasjidData[] = await response.json(); // Data berupa array
                setInfoMasjid(data[0]); // Menyimpan data masjid pertama ke state
                setLoading(false); // Set loading menjadi false setelah data diambil
            } catch (error) {
                // setError(error.message); // Menangani error jika terjadi
                setLoading(false); // Set loading menjadi false
            }
        };

        fetchInfoMasjid();
    }, []); // Hanya berjalan sekali saat komponen dimuat

    if (loading) {
        return <div>Loading...</div>; // Menampilkan loading saat data sedang dimuat
    }

    if (error) {
        return <div>Error: {error}</div>; // Menampilkan error jika ada kesalahan
    }

    return (
        <div className="mb-6 mt-4 h-full">
            <div className="mb-4 flex justify-center gap-4">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{infoMasjid?.nama_masjid}</h1> {/* Menggunakan optional chaining */}
                    </div>
                </div>
            </div>
            <div className="m-2 grid grid-cols-1 gap-4">
                {/* Kontak - Nomor Telepon */}
                <div className="flex justify-center items-center">
                    <div>
                        <p className="text-gray-600">
                            <FiPhone className="mr-1 inline" /> {infoMasjid?.kontak}
                        </p>
                    </div>
                </div>

                {/* Kontak - Alamat */}
                <div className="flex justify-center items-center">
                    <div>
                        <p className="text-gray-600">
                            <FiMapPin className="mr-1 inline" /> {infoMasjid?.alamat}
                        </p>
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold">Deskripsi</h1>
                    <p>{infoMasjid?.deskripsi}</p>
                </div>

            </div>
        </div>
    );
};

export default InfoMasjid;
    