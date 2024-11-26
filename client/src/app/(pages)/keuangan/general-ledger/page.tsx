"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import for autoTable support
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const GeneralLedger = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both APIs
                const generalLedgerResponse = await fetch(
                    "http://localhost:8000/api/general-ledger/",
                );
                const generalLedgerData = await generalLedgerResponse.json();

                const coaResponse = await fetch(
                    "http://localhost:8000/api/coa/",
                );
                const coaData = await coaResponse.json();

                // Merge the data from both API responses
                const allTransactions = generalLedgerData.flatMap((ledger) => {
                    return ledger.coa.flatMap((coa) => {
                        // Find the corresponding COA details from the second API
                        const coaDetails = coaData.find(
                            (item) => item.kode_akun === coa.kode_akun,
                        );

                        if (coaDetails) {
                            const penerimaanKas = coaDetails.penerimaan_kas.map(
                                (item) => ({
                                    tanggal: item.tanggal,
                                    tipe: coa.tipe,
                                    kodeAkun: coa.kode_akun,
                                    namaAkun: coa.nama_akun,
                                    deskripsi: item.deskripsi,
                                    debit: parseFloat(item.jumlah),
                                    kredit: 0,
                                }),
                            );

                            const pengeluaranKas =
                                coaDetails.pengeluaran_kas.map((item) => ({
                                    tanggal: item.tanggal,
                                    tipe: coa.tipe,
                                    kodeAkun: coa.kode_akun,
                                    namaAkun: coa.nama_akun,
                                    deskripsi: item.deskripsi,
                                    debit: 0,
                                    kredit: parseFloat(item.jumlah),
                                }));

                            // Return the combined transactions for both penerimaan_kas and pengeluaran_kas
                            return [...penerimaanKas, ...pengeluaranKas];
                        }

                        return [];
                    });
                });

                setTransactions(allTransactions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredTransactions = transactions.filter((trx) =>
        trx.namaAkun.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Calculate totals
    const totalDebit = filteredTransactions.reduce(
        (sum, trx) => sum + (trx.debit || 0),
        0,
    );
    const totalKredit = filteredTransactions.reduce(
        (sum, trx) => sum + (trx.kredit || 0),
        0,
    );
    const totalNominal = totalDebit - totalKredit;

    const exportToPDF = () => {
        const doc = new jsPDF("p", "cm", "a4");
        const headers = [
            "No",
            "Tanggal",
            "Tipe",
            "Kode Akun",
            "Nama Akun",
            "Deskripsi",
            "Debit",
            "Kredit",
        ];
        const tableData = filteredTransactions.map((row, index) => [
            index + 1,
            row.tanggal,
            row.tipe,
            row.kodeAkun,
            row.namaAkun,
            row.deskripsi,
            row.debit.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
            row.kredit.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
        ]);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Buku Besar", 10.5, 1, { align: "center" });

        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 2,
            theme: "grid",
        });

        doc.save("Buku_Besar.pdf");
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
                                onClick={exportToPDF}
                                style={{
                                    color: "#008080",
                                    borderColor: "#008080",
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
                                    <th>Tanggal</th>
                                    <th>Tipe</th>
                                    <th>Kode Akun</th>
                                    <th>Nama Akun</th>
                                    <th>Deskripsi</th>
                                    <th>Debit</th>
                                    <th>Kredit</th>
                                    <th>Nominal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((trx, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td>{trx.tanggal}</td>
                                        <td>{trx.tipe}</td>
                                        <td>{trx.kodeAkun}</td>
                                        <td>{trx.namaAkun}</td>
                                        <td>{trx.deskripsi}</td>
                                        <td>
                                            {trx.debit.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                        <td>
                                            {trx.kredit.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                },
                                            )}
                                        </td>
                                        <td>
                                            {(
                                                trx.debit + trx.kredit
                                            ).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="font-bold">
                                    <td colSpan={5} className="text-right">
                                        Total
                                    </td>
                                    <td>
                                        {totalDebit.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </td>
                                    <td>
                                        {totalKredit.toLocaleString("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        })}
                                    </td>
                                    <td>
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
                        <h3 className="mb-4 text-xl font-semibold">
                            Tambah Jurnal
                        </h3>
                        {/* Add your modal content here */}
                        <Button
                            variant="contained"
                            onClick={() => setIsModalOpen(false)}
                            sx={{
                                backgroundColor: "#FF0000",
                                color: "white",
                            }}
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default GeneralLedger;
