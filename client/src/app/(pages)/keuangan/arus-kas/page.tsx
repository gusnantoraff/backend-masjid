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
const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [jenis, setJenis] = useState("infaq");
    const [tanggal, setTanggal] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [oleh, setOleh] = useState("");
    const [status, setStatus] = useState("pemasukan");
    const [coaOptions, setCoaOptions] = useState([]);
    const [formError, setFormError] = useState(""); // Error state for validation

    // Fetch COA options for "Oleh" dropdown
    useEffect(() => {
        const fetchCoaData = async () => {
            try {
                const response = await fetch(coaUrl);
                const data = await response.json();
                setCoaOptions(data); // Set options for "Oleh" dropdown
            } catch (error) {
                console.error("Error fetching COA data:", error);
            }
        };
        fetchCoaData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if any required field is empty
        if (!jenis || !tanggal || !amount || !description || !oleh || !status) {
            setFormError("Please complete all required fields.");
            return;
        }

        // Clear any previous errors if form is complete
        setFormError("");

        const data = new FormData();
        data.append("jenis", jenis);
        data.append("tanggal", tanggal);
        data.append("amount", parseFloat(amount));
        data.append("description", description);
        data.append("file", file);
        data.append("oleh", oleh);
        data.append("status", status);

        const targetUrl =
            status === "pemasukan" ? penerimaanUrl : pengeluaranUrl;

        try {
            const response = await fetch(targetUrl, {
                method: "POST",
                body: data,
            });
            if (response.ok) {
                const result = await response.json();
                onSubmit(result);
                onClose();
                // Reset form after submission
                setJenis("infaq");
                setTanggal("");
                setAmount("");
                setDescription("");
                setFile(null);
                setOleh("");
                setStatus("pemasukan");
            } else {
                console.error("Submission failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={onClose}
                ></div>
                <div className="z-10 w-4/5 max-w-5xl rounded-lg bg-white p-4 shadow-lg">
                    <h2 className="mb-4 text-xl font-bold">Tambah Arus Kas</h2>
                    {/* Display error message if form is incomplete */}
                    {formError && (
                        <div className="mb-4 rounded-lg bg-red-100 p-2 text-red-700">
                            {formError}
                        </div>
                    )}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex justify-between gap-4">
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Jenis: <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={jenis}
                                    onChange={(e) => setJenis(e.target.value)}
                                    className="h-12 w-full rounded-lg border p-2"
                                    required
                                >
                                    <option value="infaq">Infaq</option>
                                    <option value="donasi">Donasi</option>
                                    <option value="operasioal">Operasional</option>
                                    <option value="listrik">Listrik</option>
                                </select>
                            </div>
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Tanggal: <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className="h-12 w-full rounded-lg border p-2"
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Jumlah: <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="h-12 w-full rounded-lg border p-2"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Deskripsi: <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="h-12 w-full rounded-lg border p-2"
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    File:
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="h-12 w-full rounded-lg border p-2"
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Oleh: <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={oleh}
                                    onChange={(e) => setOleh(e.target.value)}
                                    className="h-12 w-full rounded-lg border p-2"
                                    required
                                >
                                    <option value="">Select an option</option>
                                    {coaOptions.map((coa) => (
                                        <option key={coa.id} value={coa.id}>
                                            {coa.nama_akun}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/3">
                                <label className="mb-1 block">
                                    Status: <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="h-12 w-full rounded-lg border p-2"
                                >
                                    <option value="pemasukan">Pemasukan</option>
                                    <option value="pengeluaran">Pengeluaran</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 rounded-lg bg-gray-300 px-4 py-2 text-black"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                            onClick={handleSubmit}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        )     
        );        
};

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (data) => {
        console.log("Submitted Data:", data);
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-2 gap-4">
                <div className="cols-span-1">
                    <h1 className="p-2 text-4xl font-bold text-black">
                        Arus Kas
                    </h1>
                </div>
                <div className="cols-span-1 gap-4">
                    <div className="flex justify-end">
                        <ButtonDefault
                            customClasses="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center"
                            label="Tambah Arus Kas"
                            onClick={() => setShowModal(true)}
                        >
                            <IoMdAdd className="text-white" />
                        </ButtonDefault>
                    </div>
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
                <LaporanKeuangan />
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
            />
        </DefaultLayout>
    );
}
