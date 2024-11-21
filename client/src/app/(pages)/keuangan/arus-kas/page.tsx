"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import StatsArus from "./stats";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { IoMdAdd } from "react-icons/io";
import LaporanKeuangan from "./laporan";
import PendapatanChart from "./pendapatanchart";
import PengeluaranChart from "./pengeluaranchart";
import DateFilter from "./DateFilter";

const penerimaanUrl = "http://localhost:8000/api/penerimaan-kas";
const pengeluaranUrl = "http://localhost:8000/api/pengeluaran-kas";
const coaUrl = "http://localhost:8000/api/coa";

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, title, targetUrl }) => {
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [amount, setAmount] = useState(""); // This will store the unformatted number
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [oleh, setOleh] = useState("");
    const [coaOptions, setCoaOptions] = useState([]);
    const [formError, setFormError] = useState("");

    const jenisOptions =
        title === "Tambah Pemasukan"
            ? ["Infaq", "Donasi", "Zakat"]
            : ["Operasional", "Listrik", "Zakat", "Pembangunan"];

    useEffect(() => {
        const fetchCoaData = async () => {
            try {
                const response = await fetch(coaUrl);
                if (!response.ok) throw new Error("Failed to fetch COA data.");
                const data = await response.json();
                setCoaOptions(data);
            } catch (error) {
                console.error("Error fetching COA data:", error);
            }
        };
        fetchCoaData();
    }, []);

    // Function to format number with dots as thousand separators
    const formatNumberWithDots = (number) => {
        if (!number) return "";
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleAmountChange = (e) => {
        const input = e.target.value.replace(/\./g, ""); // Remove existing dots
        if (!isNaN(input)) {
            setAmount(input); // Update state with unformatted number
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jenis || !tanggal || !amount || !description || !oleh) {
            setFormError("Please complete all required fields.");
            return;
        }

        setFormError("");

        const data = new FormData();
        data.append("jenis", jenis);
        data.append("tanggal", tanggal);
        data.append("jumlah", parseFloat(amount).toFixed(2));
        data.append("deskripsi", description);
        if (file) data.append("image", file);
        data.append("coa_id", oleh);

        try {
            const response = await fetch(targetUrl, {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Submission successful:", result);
                onSubmit();
                onClose();
                setJenis("");
                setTanggal("");
                setAmount("");
                setDescription("");
                setFile(null);
                setOleh("");
            } else {
                const errorResponse = await response.json();
                console.error("Submission failed:", errorResponse);
                alert("Failed to submit transaction.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred during submission.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="z-10 w-4/5 max-w-5xl rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                {formError && (
                    <div className="mb-4 rounded-lg bg-red-100 p-2 text-red-700">
                        {formError}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <label>Jenis:</label>
                            <select
                                value={jenis}
                                onChange={(e) => setJenis(e.target.value)}
                                className="h-12 w-full rounded-lg border p-2"
                            >
                                <option value="">Pilih Jenis</option>
                                {jenisOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/3">
                            <label>Tanggal:</label>
                            <input
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="h-12 w-full rounded-lg border p-2"
                            />
                        </div>
                        <div className="w-1/3">
                            <label>Jumlah:</label>
                            <input
                                type="text"
                                value={formatNumberWithDots(amount)}
                                onChange={handleAmountChange}
                                className="h-12 w-full rounded-lg border p-2"
                                placeholder="Jumlah Rupiah"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label>Deskripsi:</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="h-12 w-full rounded-lg border p-2"
                                placeholder="Deskripsi"
                            />
                        </div>
                        <div className="w-1/2">
                            <label>File:</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                                className="h-12 w-full rounded-lg border p-2"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label>Oleh (COA):</label>
                            <select
                                value={oleh}
                                onChange={(e) => setOleh(e.target.value)}
                                className="h-12 w-full rounded-lg border p-2"
                            >
                                <option value="">Pilih COA</option>
                                {coaOptions.map((coa) => (
                                    <option key={coa.id} value={coa.id}>
                                        {coa.nama_akun}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-gray-300 px-4 py-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Home() {
    const [showModalPemasukan, setShowModalPemasukan] = useState(false);
    const [showModalPengeluaran, setShowModalPengeluaran] = useState(false);

    const handleSubmit = () => {
        console.log("Data submitted successfully.");
        window.location.reload(); // Reload the page to fetch the latest data
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <h1 className="p-2 text-4xl font-bold text-black">
                        Arus Kas
                    </h1>
                </div>
                <div className="col-span-1 flex justify-end gap-2">
                    <ButtonDefault
                        customClasses="bg-green-600 text-white px-4 py-2 rounded-lg"
                        label="Tambah Pemasukan"
                        onClick={() => setShowModalPemasukan(true)}
                    >
                        <IoMdAdd className="text-white" />
                    </ButtonDefault>
                    <ButtonDefault
                        customClasses="bg-red-600 text-white px-4 py-2 rounded-lg"
                        label="Tambah Pengeluaran"
                        onClick={() => setShowModalPengeluaran(true)}
                    >
                        <IoMdAdd className="text-white" />
                    </ButtonDefault>
                </div>
            </div>

            <div className="items-left justify-left flex grid flex-col">
                <div className="mt-2">
                    <DateFilter />
                </div>
            </div>
            <StatsArus />
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="cols-span-1">
                    <h1 className="mt-5 text-center text-2xl font-bold text-black">
                        Pemasukan
                    </h1>
                    <div className="mt-5 flex grid h-auto rounded-xl border border-gray-300 px-4 py-4 shadow-md">
                        <PendapatanChart />
                    </div>
                </div>
                <div className="cols-span-1">
                    <h1 className="mt-5 text-center text-2xl font-bold text-black">
                        Pengeluaran
                    </h1>
                    <div className="mt-5 flex grid h-auto rounded-xl border border-gray-300 px-4 py-4 shadow-md">
                        <PengeluaranChart />
                    </div>
                </div>
            </div>
            <div className="mt-5 flex w-full rounded-xl border border-gray-300 px-4 py-4 shadow-md">
                <LaporanKeuangan
                    isLaporanPage={false}
                    isPenerimaanPage={false}
                    isPengeluaranPage={false}
                    isArusKasPage={true}
                />
            </div>

            <Modal
                isOpen={showModalPemasukan}
                onClose={() => setShowModalPemasukan(false)}
                onSubmit={handleSubmit}
                title="Tambah Pemasukan"
                targetUrl={penerimaanUrl}
            />
            <Modal
                isOpen={showModalPengeluaran}
                onClose={() => setShowModalPengeluaran(false)}
                onSubmit={handleSubmit}
                title="Tambah Pengeluaran"
                targetUrl={pengeluaranUrl}
            />
        </DefaultLayout>
    );
}
