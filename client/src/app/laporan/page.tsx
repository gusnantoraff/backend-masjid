"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

// Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface KeuanganProps {
    id?: string;
}

interface RekeningBank {
    id: number;
    nama_bank: string;
    nomor_rekening: string;
    atas_nama: string;
}

interface ReportData {
    total_pemasukan: number;
    total_pengeluaran: number;
    sisa: number;
}

type PeriodType = "harian" | "mingguan" | "bulanan" | "tahunan";

const Keuangan: React.FC<KeuanganProps> = ({ id }) => {
    const [reports, setReports] = useState<
        Record<PeriodType, Record<string, ReportData>>
    >({
        harian: {},
        mingguan: {},
        bulanan: {},
        tahunan: {},
    });
    const [rekeningData, setRekeningData] = useState<RekeningBank | null>(null);
    const [navbarBg, setNavbarBg] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedReport, setSelectedReport] = useState<ReportData | null>(
        null,
    );
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("harian"); // Default to 'harian'

    useEffect(() => {
        axios
            .get("/public/rekening-bank/1")
            .then((response) => setRekeningData(response.data))
            .catch((error) =>
                console.error("Error fetching rekening data", error),
            );

        const fetchReports = async () => {
            setLoading(true);
            try {
                const periods: PeriodType[] = [
                    "harian",
                    "mingguan",
                    "bulanan",
                    "tahunan",
                ];
                const fetchedReports: Record<
                    PeriodType,
                    Record<string, ReportData>
                > = {
                    harian: {},
                    mingguan: {},
                    bulanan: {},
                    tahunan: {},
                };

                for (let period of periods) {
                    const response = await axios.get(
                        "/public/laporan-keuangan2/periode",
                        {
                            params: { periode: period },
                        },
                    );
                    fetchedReports[period] = response.data;
                }

                setReports(fetchedReports);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const formatCurrency = (amount: number) => {
        return `Rp ${amount.toLocaleString()}`;
    };

    const calculateBalance = (pemasukan: number, pengeluaran: number) => {
        return pemasukan - pengeluaran;
    };

    const handleReportClick = (period: PeriodType, date: string) => {
        const report = reports[period][date];
        setSelectedReport(report);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
    };

    const formatDate = (date: string, period: PeriodType) => {
        const d = new Date(date);

        if (period === "harian") {
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            };
            return `Laporan ${d.toLocaleDateString("id-ID", options)}`;
        }

        if (period === "mingguan") {
            const now = new Date();
            const monthName = now.toLocaleString("id-ID", { month: "long" });
            return `${date} Bulan ${monthName}`;
        }

        if (period === "bulanan") {
            const monthName = d.toLocaleString("id-ID", { month: "long" });
            return `Laporan Bulan ${monthName} ${d.getFullYear()}`;
        }

        if (period === "tahunan") {
            return `Laporan Tahun ${d.getFullYear()}`;
        }

        return date;
    };

    // Chart Data Preparation
    const prepareChartData = () => {
        const labels = Object.keys(reports[selectedPeriod]);
        const pemasukanData = labels.map(
            (key) => reports[selectedPeriod][key].total_pemasukan,
        );
        const pengeluaranData = labels.map(
            (key) => reports[selectedPeriod][key].total_pengeluaran,
        );

        return {
            labels,
            datasets: [
                {
                    label: "Pemasukan",
                    data: pemasukanData,
                    backgroundColor: "rgba(34, 197, 94, 0.5)", // green
                },
                {
                    label: "Pengeluaran",
                    data: pengeluaranData,
                    backgroundColor: "rgba(244, 63, 94, 0.5)", // red
                },
            ],
        };
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                className={`fixed left-0 top-0 z-50 h-[78px] w-full ${navbarBg ? "bg-white" : "bg-white"}`}
            />
            {/* Header */}
            <div
                style={{
                    backgroundImage: "url(/images/laporan2-bg.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
                className="mt-25 flex h-[250px] w-full items-center justify-center"
            >
                <h2 className="flex items-center gap-3 text-center font-poppins text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Laporan Keuangan
                </h2>
            </div>
            <section
                id={id}
                className="flex flex-col items-center bg-white px-4 py-10 font-poppins sm:mt-20 sm:px-6 md:mt-15 md:px-12 lg:px-20 xl:px-28"
                data-aos="fade-down"
                data-aos-delay="200"
            >
                <h3 className="mb-4 text-center text-xl font-semibold text-ijo sm:text-2xl">
                    Laporan keuangan mencakup berbagai periode, mulai dari
                    harian, mingguan, bulanan, hingga tahunan. Laporan ini
                    mencakup pendapatan, pengeluaran, serta saldo akhir untuk
                    memastikan transparansi dan akuntabilitas keuangan.{" "}
                </h3>

                <div className="mb-[3rem] flex items-center justify-center py-4">
                    <div className="w-full rounded-lg bg-white p-8 shadow-lg">
                        <h3 className="mb-4 text-center text-xl font-semibold text-teal-700 sm:text-2xl">
                            Informasi Rekening Bank
                        </h3>
                        <div className="w-full space-y-4">
                            <div className="grid grid-cols-3 items-center gap-x-4">
                                <span className="font-semibold text-teal-700">
                                    Nama Bank
                                </span>
                                <span className="text-center font-semibold text-teal-700">
                                    :
                                </span>
                                <span className="text-gray-700">
                                    {rekeningData?.nama_bank ||
                                        "Data tidak tersedia"}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-x-4">
                                <span className="font-semibold text-teal-700">
                                    Nomor Rekening
                                </span>
                                <span className="text-center font-semibold text-teal-700">
                                    :
                                </span>
                                <span className="text-gray-700">
                                    {rekeningData?.nomor_rekening ||
                                        "Data tidak tersedia"}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-x-4">
                                <span className="font-semibold text-teal-700">
                                    Atas Nama
                                </span>
                                <span className="text-center font-semibold text-teal-700">
                                    :
                                </span>
                                <span className="text-gray-700">
                                    {rekeningData?.atas_nama ||
                                        "Data tidak tersedia"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex justify-center">
                    {(
                        [
                            "harian",
                            "mingguan",
                            "bulanan",
                            "tahunan",
                        ] as PeriodType[]
                    ).map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`mx-2 rounded border px-4 py-2 ${selectedPeriod === period ? "bg-ijo text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Render Chart */}
                <div className="flex w-3/4 flex-col items-center justify-center pb-6">
                    <h3 className="mb-4 text-center text-xl font-semibold text-gray-700">
                        {`Chart Laporan ${selectedPeriod}`}
                    </h3>
                    <div className="flex w-full items-center justify-center rounded-lg bg-white p-4 shadow-md">
                        <Bar
                            data={prepareChartData()}
                            options={{ responsive: true }}
                        />
                    </div>
                </div>

                {/* Periode Reports */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.keys(reports[selectedPeriod]).length > 0 ? (
                        Object.keys(reports[selectedPeriod]).map(
                            (key, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-white p-4 shadow-md"
                                >
                                    <h3 className="text-xl font-semibold capitalize text-gray-700">
                                        {formatDate(key, selectedPeriod)}
                                    </h3>
                                    <ul className="mt-4">
                                        <li className="mb-2 font-semibold text-gray-700">
                                            <button
                                                onClick={() =>
                                                    handleReportClick(
                                                        selectedPeriod,
                                                        key,
                                                    )
                                                }
                                                className="w-full text-left text-sm text-oren hover:text-orange-300 hover:underline"
                                            >
                                                Lihat Detail
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ),
                        )
                    ) : (
                        <div className="rounded-lg bg-white p-4 shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Tidak ada laporan untuk periode ini.
                            </h3>
                        </div>
                    )}
                </div>

                {/* Modal or Detailed Report View */}
                {selectedReport && (
                    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-30">
                        <div className="relative w-1/3 rounded-lg bg-white p-6 font-light shadow-lg">
                            <h4 className="mb-4 text-xl font-semibold text-gray-700">
                                Detail Laporan
                            </h4>
                            <p className="mb-2">
                                <strong>Pemasukan:</strong>{" "}
                                {formatCurrency(selectedReport.total_pemasukan)}
                            </p>
                            <p className="mb-2">
                                <strong>Pengeluaran:</strong>{" "}
                                {formatCurrency(
                                    selectedReport.total_pengeluaran,
                                )}
                            </p>
                            <p className="mb-2">
                                <strong>Saldo Akhir:</strong>{" "}
                                {formatCurrency(
                                    calculateBalance(
                                        selectedReport.total_pemasukan,
                                        selectedReport.total_pengeluaran,
                                    ),
                                )}
                            </p>
                            <button
                                onClick={handleCloseModal}
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ijo px-4 py-2 text-2xl text-white"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </section>
            <Footer id="footer" />
        </div>
    );
};

export default Keuangan;
