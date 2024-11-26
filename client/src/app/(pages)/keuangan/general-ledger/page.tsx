"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus } from "lucide-react";
import { AiOutlineExport, AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import for autoTable support
import fetchWithAuth from "@/utils/fetch";
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Modal } from "@mui/material";
import ExportDialog from "@/components/filter/ExportGeneralLedger";

const ledgerUrl = "http://localhost:8000/api/general-ledger";
const coaUrl = "http://localhost:8000/api/coa";
const GeneralLedgerPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [coaData, setCoaData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(""); // For account filter
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: "",
        keterangan: "",
        coa_id: "",
    });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [filterActive, setFilterActive] = useState(false); // Toggle filter state

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

    const filteredTransactions = transactions.filter((trx) =>
        (trx.keterangan.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedAccount === "" || trx.namaAkun === selectedAccount) &&
            (trx.tanggal.includes(`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`))
    ));

    const totalDebit = filteredTransactions.reduce((sum, trx) => sum + parseFloat(trx.debit || 0), 0);
    const totalKredit = filteredTransactions.reduce((sum, trx) => sum + parseFloat(trx.kredit || 0), 0);
    const totalNominal = totalDebit - totalKredit;

    const exportToPDF = () => {
        const doc = new jsPDF("p", "cm", "a4");
        const imgData = '/images/BG.png';

        // Add background image
        doc.addImage(imgData, 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

        // Define headers for the table
        const headers = ["No.", "Kode Akun", "Tanggal", "Keterangan", "Debit", "Kredit"];

        // Prepare the table data
        const tableData = filteredTransactions.map((trx, index) => [
            index + 1,
            trx.kodeAkun,
            trx.tanggal,
            trx.keterangan,
            parseFloat(trx.debit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
            parseFloat(trx.kredit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
        ]);

        // Set the creation date and time in the top-left corner
        const creationDate = new Date().toLocaleString("id-ID", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        doc.setTextColor("white");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`${creationDate}`, 1, 1);

        doc.setFont("helvetica", "bold");
        doc.setTextColor("white");
        const topRightText = "oleh Tercode.com";  // Replace with your desired text
        const marginRight = 1;  // 1 cm margin from the right edge
        const rightX = doc.internal.pageSize.width - marginRight;
        doc.text(topRightText, rightX, 1, { align: "right" });

        // Set title to "BUKU BESAR {nama masjid}" and the period below
        const mosqueName = "Nama Masjid";  // Replace this with the actual name of the mosque
        const period = `Periode: ${selectedMonth}/${selectedYear}`;  // Use selectedMonth and selectedYear

        doc.setFont("helvetica", "bold");
        doc.setTextColor("white");
        doc.setFontSize(16);
        doc.text(`Buku Besar ${mosqueName}`, 10.5, 2, { align: "center" });
        doc.text(period, 10.5, 2.5, { align: "center" });

        // Add the table
        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 3,
            theme: "striped",
        });

        // Save the PDF with a specific file name
        doc.save("Buku_Besar_namamasjid_periode.pdf");
    };

    const exportToCSV = () => {
        // Define headers for the CSV
        const headers = ["No.", "Kode Akun", "Tanggal", "Keterangan", "Debit", "Kredit"];

        // Prepare the table data from filtered transactions
        const csvRows = filteredTransactions.map((trx, index) => [
            index + 1,
            trx.kodeAkun,
            trx.tanggal,
            trx.keterangan,
            parseFloat(trx.debit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
            parseFloat(trx.kredit).toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
        ]);

        // Add metadata and headers
        const metadata = [
            ["Tanggal Dibuat:", new Date().toLocaleString("id-ID", {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })],
            ["Buku Besar", `Buku Besar ${"Nama Masjid"}`],  // Replace with actual mosque name
            ["Periode", `Periode: ${selectedMonth}/${selectedYear}`],  // Replace with actual period if needed
            []  // Add an empty row to separate metadata and table
        ];

        // Combine metadata, headers, and table data into one CSV string
        const csvContent =
            "data:text/csv;charset=utf-8," +
            metadata
                .concat([headers])  // Add headers after metadata
                .concat(csvRows)  // Add table rows
                .map(row => row.join(","))  // Join each row into a string
                .join("\n");  // Join all rows with a newline

        // Encode the CSV content and trigger the download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${"Buku_Besar_namamasjid_periode"}.csv`);  // Customize the file name
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
    };

    const handleAccountFilterChange = (e) => {
        setSelectedAccount(e.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddTransaction = () => {
        // Add transaction logic here, based on the formData
        console.log(formData);
        setIsModalOpen(false);  // Close the modal after adding
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
                            startIcon={<AiOutlineExport />}
                            onClick={() => setExportDialogOpen(true)}
                            style={{ color: "#008080", borderColor: "#008080" }}
                        >
                            Export
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

            {/* Modal for Adding Transaction */}
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="add-transaction-modal"
                aria-describedby="modal-to-add-general-ledger-transaction"
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h2 id="add-transaction-modal" className="text-xl font-semibold mb-4">Tambah Jurnal</h2>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="account-select-label">Pilih Akun</InputLabel>
                        <Select
                            labelId="account-select-label"
                            id="account-select"
                            value={formData.coa_id}
                            label="Pilih Akun Nama Akun"
                            onChange={(e) => setFormData({ ...formData, coa_id: e.target.value })}
                        >
                            {coaData.map((coa) => (
                                <MenuItem key={coa.id} value={coa.id}>{coa.nama_akun}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outlined" onClick={handleModalClose}>Batal</Button>
                        <Button variant="contained" color="primary" onClick={handleAddTransaction}>
                            Tambah
                        </Button>
                    </div>
                </Box>
            </Modal>

            {exportDialogOpen && (
                <ExportDialog
                    open={exportDialogOpen}
                    onClose={() => setExportDialogOpen(false)}
                    onExportPDF={exportToPDF}
                    onExportCSV={exportToCSV}
                />
            )}
        </DefaultLayout>
    );
};

export default GeneralLedgerPage;
