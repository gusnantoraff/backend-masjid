"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ExportDialog from "@/components/filter/ExportGeneralLedger";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ledgerUrl = "http://localhost:8000/api/general-ledger";
const coaUrl = "http://localhost:8000/api/coa";

const GeneralLedgerPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [coaData, setCoaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: "",
        keterangan: "",
        coa_id: "",
    });

    const fetchData = async () => {
        try {
            const [ledgerRes, coaRes] = await Promise.all([fetch(ledgerUrl), fetch(coaUrl)]);
            const ledgerData = await ledgerRes.json();
            const coaData = await coaRes.json();

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

    const filteredTransactions = transactions.filter((trx) =>
        trx.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalDebit = filteredTransactions.reduce((sum, trx) => sum + parseFloat(trx.debit || 0), 0);
    const totalKredit = filteredTransactions.reduce((sum, trx) => sum + parseFloat(trx.kredit || 0), 0);
    const totalNominal = totalDebit - totalKredit;

    const exportToPDF = () => {
        const doc = new jsPDF("p", "cm", "a4");
        const headers = ["No.", "Kode Akun", "Tanggal", "Keterangan", "Debit", "Kredit"];
        const tableData = filteredTransactions.map((trx, index) => [
            index + 1,
            trx.kodeAkun,
            trx.tanggal,
            trx.keterangan,
            parseFloat(trx.debit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
            parseFloat(trx.kredit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
        ]);

        doc.text("General Ledger Report", 10.5, 1, { align: "center" });
        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 2,
            theme: "striped",
        });

        doc.save("GeneralLedger.pdf");
    };

    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">General Ledger</h1>
            <div className="mt-2 rounded-lg border bg-white shadow-sm">
                <div className="border-b p-6 flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Jurnal Umum</h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-md border py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button
                            variant="outlined"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => setExportDialogOpen(true)}
                            style={{ color: "#008080", borderColor: "#008080" }}
                        >
                            Export PDF
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setIsModalOpen(true)}
                            sx={{ backgroundColor: "#14B8A6", color: "white" }}
                            startIcon={<AiOutlinePlus />}
                        >
                            Tambah Jurnal
                        </Button>
                    </div>
                </div>

                <div className="p-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th>Tanggal</th>
                                <th>Tipe</th>
                                <th>Kode Akun</th>
                                <th>Nama Akun</th>
                                <th>Keterangan</th>
                                <th>Debit</th>
                                <th>Kredit</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((trx, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-4">{trx.tanggal}</td>
                                        <td className="py-4">{trx.jenis}</td>
                                        <td className="py-4">{trx.kodeAkun}</td>
                                        <td className="py-4">{trx.namaAkun}</td>
                                        <td className="py-4">{trx.keterangan}</td>
                                        <td className="py-4">
                                            {parseFloat(trx.debit).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                        <td className="py-4">
                                            {parseFloat(trx.kredit).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                        <td className="py-4 text-right">
                                            {(parseFloat(trx.debit) - parseFloat(trx.kredit)).toLocaleString(
                                                "id-ID",
                                                { style: "currency", currency: "IDR" }
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-4 text-center text-gray-500">
                                        No transactions available.
                                    </td>
                                </tr>
                            )}
                            <tr className="border-t font-bold">
                                <td colSpan={5} className="py-4 text-right">Total</td>
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

            {exportDialogOpen && (
                <ExportDialog
                    open={exportDialogOpen}
                    onClose={() => setExportDialogOpen(false)}
                    onExportPDF={exportToPDF}
                />
            )}
        </DefaultLayout>
    );
};

export default GeneralLedgerPage;
