"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus } from "lucide-react";
import { AiOutlineExport, AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import for autoTable support
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import fetchWithAuth from "@/utils/fetch";

const ledgerUrl = "http://localhost:8000/api/general-ledger";
const coaUrl = "http://localhost:8000/api/coa";

const GeneralLedger = () => {
    const [transactions, setTransactions] = useState([]);
    const [coaData, setCoaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: "",
        keterangan: "",
        coa_id: "",
    });

    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    // Fetch data from both APIs
    const fetchData = async () => {
        try {
            const [ledgerData, coaData] = await Promise.all([
                fetchWithAuth(ledgerUrl),
                fetchWithAuth(coaUrl),
            ]);

            const mappedTransactions = ledgerData.map((trx) => {
                const coa = coaData.find((c) => c.id === trx.coa_id);
                return {
                    ...trx,
                    kodeAkun: coa?.kode_akun || "N/A",
                    namaAkun: coa?.nama_akun || "N/A",
                    jenis: coa?.tipe || "N/A",
                };
            });

            setTransactions(mappedTransactions);
            setCoaData(coaData);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true); // Disable the submit button

        try {
            // Check if the same COA ID and tanggal already exist in the transactions state
            const existingTransaction = transactions.find(
                (trx) =>
                    trx.coa_id === formData.coa_id &&
                    trx.tanggal === formData.tanggal,
            );

            if (existingTransaction) {
                alert(
                    "A General Ledger entry with the same COA ID and Date already exists.",
                );
                return;
            }

            // Proceed with submitting the data to the backend
            const newLedger = await fetchWithAuth(ledgerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    debit: "0.00", // Default value
                    kredit: "0.00", // Default value
                }),
            });

            // Fetch latest transactions
            await fetchData();

            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create transaction. Please try again.");
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    const resetForm = () => {
        setFormData({
            tanggal: "",
            keterangan: "",
            coa_id: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredTransactions = transactions.filter((trx) =>
        trx.namaAkun.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Calculate totals
    const totalDebit = filteredTransactions.reduce(
        (sum, trx) => sum + parseFloat(trx.debit || 0),
        0,
    );
    const totalKredit = filteredTransactions.reduce(
        (sum, trx) => sum + parseFloat(trx.kredit || 0),
        0,
    );
    const totalNominal = totalDebit - totalKredit;

    const handleExport = (format) => {
        if (format === "CSV") {
            exportToCSV();
        } else if (format === "PDF") {
            exportToPDF();
        }
        setExportDialogOpen(false);
    };
    const exportToPDF = () => {
        const doc = new jsPDF("p", "cm", "a4");
        const headers = [
            "No",
            "Jenis",
            "Tanggal",
            "Jumlah",
            "Deskripsi",
            "File",
            "Oleh",
            "Status",
        ];
        const tableData = filteredTransactions.map((row, index) => [
            index + 1,
            row.jenis,
            row.tanggal,
            row.kodeAkun,
            row.namaAkun,
            row.keterangan,
            row.debit.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
            row.kredit.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
            (parseFloat(row.debit) - parseFloat(row.kredit)).toLocaleString(
                "id-ID",
                {
                    style: "currency",
                    currency: "IDR",
                }
            ),
        ]);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Buku Besar Periode " + selectedMonth + "/" + selectedYear, 10.5, 1, {
            align: "center",
        });

        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 2,
            theme: "grid",
        });

        doc.save(`Buku_Besar_Period_${selectedMonth}_${selectedYear}.pdf`);
    };


    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">
                General Ledger
            </h1>

            <div className="mt-2 rounded-lg border bg-white shadow-sm">
                <div className="border-b p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Jurnal Umum
                        </h2>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari transaksi..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="rounded-md border py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <Button
                            variant="outlined"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => setExportDialogOpen(true)}
                            style={{
                                color: "#008080", // Warna teks dan ikon hijau toska
                                borderColor: "#008080", // Warna border hijau toska
                            }}
                        >
                            Export PDF
                        </Button>
                            <Button
                                variant="contained"
                                onClick={() => setIsModalOpen(true)}
                                sx={{
                                    backgroundColor: "#14B8A6",
                                    color: "white",
                                    marginRight: "10px",
                                }}
                                startIcon={<AiOutlinePlus />}
                            >
                                Tambah Jurnal
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Tanggal
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Tipe
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Kode Akun
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Nama Akun
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Keterangan
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Debit
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Kredit
                                    </th>
                                    <th className="pb-3 text-right font-medium text-gray-600">
                                        Nominal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((trx, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-4">
                                                {trx.tanggal}
                                            </td>
                                            <td className="py-4">
                                                {trx.jenis}
                                            </td>
                                            <td className="py-4">
                                                {trx.kodeAkun}
                                            </td>
                                            <td className="py-4">
                                                {trx.namaAkun}
                                            </td>
                                            <td className="py-4">
                                                {trx.keterangan}
                                            </td>
                                            <td className="py-4">
                                                {parseFloat(
                                                    trx.debit,
                                                ).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </td>
                                            <td className="py-4">
                                                {parseFloat(
                                                    trx.kredit,
                                                ).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </td>
                                            <td className="py-4 text-right">
                                                {(
                                                    parseFloat(trx.debit) -
                                                    parseFloat(trx.kredit)
                                                ).toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="py-4 text-center text-gray-500"
                                        >
                                            No transactions available.
                                        </td>
                                    </tr>
                                )}
                                <tr className="border-t font-bold">
                                    <td colSpan={5} className="py-4 text-right">
                                        Total
                                    </td>
                                    <td className="py-4">
                                        {totalDebit.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </td>
                                    <td className="py-4">
                                        {totalKredit.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </td>
                                    <td className="py-4 text-right">
                                        {totalNominal.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-4">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">
                            Tambah Jurnal Baru
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="coa_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tipe
                                    </label>
                                    <select
                                        id="coa_id"
                                        name="coa_id"
                                        required
                                        value={formData.coa_id}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>
                                            Pilih Akun
                                        </option>
                                        {coaData.map((coa) => (
                                            <option key={coa.id} value={coa.id}>
                                                {coa.nama_akun}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

{exportDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-4">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">
                            Pilih Periode untuk Export
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tahun
                                </label>
                                <input
                                    type="number"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Bulan
                                </label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                                >
                                    {/* Populate months */}
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setExportDialogOpen(false)}
                                className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleExport("PDF")}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                <PictureAsPdfIcon fontSize="small" sx={{marginRight: "10px"}}/>
                                Export PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </DefaultLayout>
    );
};

export default GeneralLedger;
