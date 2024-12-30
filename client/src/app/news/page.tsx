"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "@/utils/axios";
import Image from "next/image";

interface Berita {
    id: number;
    judul: string;
    konten: string;
    tanggal_publikasi: string;
    kategori: string;
    status: string;
    foto: string;
}

interface NewsSectionProps {
    id?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ id }) => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [navbarBg, setNavbarBg] = useState(false);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get("/public/berita");
                setBerita(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching berita:", error);
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength
            ? `${text.slice(0, maxLength)}...`
            : text;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        const date = new Date(dateString);
        const wibDate = new Date(date.getTime());

        return (
            new Intl.DateTimeFormat("id-ID", options).format(wibDate) + " WIB"
        );
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                className={`fixed left-0 top-0 z-50 h-[78px] w-full ${navbarBg ? "bg-white" : "bg-white"}`}
            />
            {/* Header */}
            <div
                style={{
                    backgroundImage: "url(/images/jemaah-bg.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
                className="mt-25 flex h-[250px] w-full items-center justify-center"
            >
                <h2 className="flex items-center gap-3 text-center font-poppins text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Berita
                </h2>
            </div>
            <section
                className="flex flex-col items-center bg-white px-4 py-10 font-poppins sm:mt-20 sm:px-6 md:mt-15 md:px-12 lg:px-20 xl:px-28"
                data-aos="fade-down"
                data-aos-delay="200"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Main featured news */}
                <div
                    className="col-span-2 h-full overflow-hidden rounded-lg bg-white shadow-md hover:cursor-pointer lg:col-span-2"
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    <div className="group relative h-full w-full overflow-hidden">
                        <Image
                            src={
                                berita[0]?.foto
                                    ? `http://localhost:8000/storage/${berita[0].foto}`
                                    : "/images/600x400.png"
                            }
                            alt={berita[0]?.judul || "Main News Placeholder"}
                            layout="fill"
                            objectFit="cover"
                            className="h-full w-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-6">
                            <h3 className="mb-2 font-poppins text-2xl font-semibold text-white">
                                {berita[0]?.judul || "Tidak ada berita terbaru"}
                            </h3>
                            <p className="flex items-center font-poppins text-xs text-white">
                                <FaRegCalendarAlt className="mr-2 h-4 w-4 text-white" />
                                {berita[0]?.tanggal_publikasi
                                    ? formatDate(berita[0].tanggal_publikasi)
                                    : "Tidak Tersedia"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* List of smaller news items */}
                <div className="col-span-2 grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-1">
                    {Array.from({ length: 4 }).map((_, index) => {
                        const item = berita[index + 1] || {
                            foto: null,
                            judul: "",
                            tanggal_publikasi: "",
                        };

                        return (
                            <div
                                key={index}
                                className="flex h-full transform flex-col rounded-lg bg-white p-0 shadow-md transition-all duration-300 ease-in-out hover:scale-105 lg:flex-row"
                                data-aos="fade-left"
                                data-aos-delay="200"
                            >
                                <div className="relative h-full w-full flex-shrink-0 overflow-hidden lg:w-60">
                                    <Image
                                        src={
                                            item.foto
                                                ? `http://localhost:8000/storage/${item.foto}`
                                                : "/images/250x160.png"
                                        }
                                        alt={item.judul || "Placeholder"}
                                        layout="fill"
                                        objectFit="cover"
                                        className="h-full w-full rounded-l-lg object-cover"
                                    />
                                </div>
                                <div className="flex w-full flex-col justify-between p-4">
                                    <h3 className="font-poppins text-lg font-semibold text-gray-700">
                                        {truncateText(
                                            item.judul ||
                                                "Tidak ada berita terbaru",
                                            30,
                                        )}
                                    </h3>
                                    <p className="mb-2 flex items-center py-0 font-poppins text-xs font-light text-gray-700">
                                        <FaRegCalendarAlt className="mr-2 h-4 w-4 text-oren" />
                                        {item.tanggal_publikasi
                                            ? formatDate(item.tanggal_publikasi)
                                            : "Tidak Tersedia"}
                                    </p>
                                    <button className="mt-4 font-poppins text-xs text-ijo hover:underline">
                                        Baca Selengkapnya
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
            </section>
            <Footer id="footer" />
        </div>
    );
};

export default NewsSection;
