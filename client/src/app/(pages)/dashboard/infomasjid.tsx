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
    const [infoMasjid, setInfoMasjid] = useState<InfoMasjidData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInfoMasjid = async () => {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data: InfoMasjidData[] = await response.json();
                setInfoMasjid(data[0]);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchInfoMasjid();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mb-4 mt-4 h-full px-4">
            {/* Bagian atas dengan judul di kiri dan kontak di kanan */}
            <div className="flex justify-between items-start mb-4">
                {/* Judul di kiri atas */}
                <div>
                <h1 className="text-2xl font-bold">{infoMasjid?.nama_masjid}</h1>
                <p className="mt-2">{infoMasjid?.deskripsi}</p>
                </div>
                
                
                {/* Kontak di kanan atas */}
                <div className="text-left">
                    <p className="text-gray-600">
                        <FiPhone className="mr-1 inline" /> {infoMasjid?.kontak}
                    </p>
                    <p className="text-gray-600">
                        <FiMapPin className="mr-1 inline" /> {infoMasjid?.alamat}
                    </p>
                </div>
            </div>

            {/* Deskripsi di bawah */}
            <div className="text-center">
                {/* <h1 className="mb-2 text-2xl font-bold">Deskripsi</h1> */}
                
            </div>
        </div>
    );
};

export default InfoMasjid;
