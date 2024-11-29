"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search } from "lucide-react";
import { AiOutlineExport, AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import for autoTable support
import ExportDialog from "@/components/filter/ExportGeneralLedger";
import fetchWithAuth from "@/utils/fetch";

const GeneralLedger = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [coaList, setCoaList] = useState([]); // New state for COA data
    const [selectedCoa, setSelectedCoa] = useState(""); // Track selected COA
    const [selectedCoaDetails, setSelectedCoaDetails] = useState(null); // Store selected COA details

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both APIs
                const generalLedgerData = await fetchWithAuth(
                    "http://localhost:8000/api/general-ledger/",
                );
                const coaData = await fetchWithAuth(
                    "http://localhost:8000/api/coa/",
                );

                // Filter COA data to only include items where general_ledger_id is null
                const filteredCoa = coaData.filter(
                    (coa) => coa.general_ledger_id === null,
                );

                // Set filtered COA data for dropdown
                setCoaList(filteredCoa);

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
        const imgData = "/images/BG.png";

        // Add background image
        doc.addImage(
            imgData,
            "JPEG",
            0,
            0,
            doc.internal.pageSize.width,
            doc.internal.pageSize.height,
        );

        // Define headers for the table
        const headers = [
            "No.",
            "Kode Akun",
            "Tanggal",
            "Keterangan",
            "Debit",
            "Kredit",
        ];

        // Prepare the table data
        const tableData = filteredTransactions.map((trx, index) => [
            index + 1,
            trx.kodeAkun,
            trx.tanggal,
            trx.keterangan,
            parseFloat(trx.debit).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
            parseFloat(trx.kredit).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
        ]);

        // Set the creation date and time in the top-left corner
        const creationDate = new Date().toLocaleString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        doc.setTextColor("white");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text(`${creationDate}`, 1, 1);

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("white");
        const topRightText = "by Tercode.com"; // Replace with your desired text
        const marginRight = 1; // 1 cm margin from the right edge
        const rightX = doc.internal.pageSize.width - marginRight;
        doc.text(topRightText, rightX, 1, { align: "right" });

        // Set title to "BUKU BESAR {nama masjid}" and the period below
        const mosqueName = "Nama Masjid"; // Replace this with the actual name of the mosque
        const period = `Periode:`; //${selectedMonth}/${selectedYear};  // Use selectedMonth and selectedYear

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
        const headers = [
            "No.",
            "Kode Akun",
            "Tanggal",
            "Keterangan",
            "Debit",
            "Kredit",
        ];

        // Prepare the table data from filtered transactions
        const csvRows = filteredTransactions.map((trx, index) => [
            index + 1,
            trx.kodeAkun,
            trx.tanggal,
            trx.keterangan,
            parseFloat(trx.debit).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
            parseFloat(trx.kredit).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
            }),
        ]);

        // Add metadata and headers
        const metadata = [
            [
                "Tanggal Dibuat:",
                new Date().toLocaleString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            ],
            ["Buku Besar", `Buku Besar ${"Nama Masjid"}`], // Replace with actual mosque name
            ["Periode", `Periode: ${selectedMonth}/${selectedYear}`], // Replace with actual period if needed
            [], // Add an empty row to separate metadata and table
        ];

        // Combine metadata, headers, and table data into one CSV string
        const csvContent =
            "data:text/csv;charset=utf-8," +
            metadata
                .concat([headers]) // Add headers after metadata
                .concat(csvRows) // Add table rows
                .map((row) => row.join(","))
                .join("\n");

        // Create a temporary anchor element to trigger the download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Buku_Besar_namamasjid_periode.csv");
        document.body.appendChild(link);
        link.click();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddTransaction = async () => {
        if (!selectedCoa || !selectedCoaDetails) {
            console.error("No COA selected or COA details missing!");
            return;
        }

        try {
            const updatedCoa = {
                id: selectedCoaDetails.id,
                general_ledger_id: 1,
                kode_akun: selectedCoaDetails.kode_akun,
                nama_akun: selectedCoaDetails.nama_akun,
                tipe: selectedCoaDetails.tipe,
            };

            const response = await fetch(
                `http://localhost:8000/api/coa/${selectedCoa}`, // Use selectedCoa which is now the id
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedCoa),
                },
            );

            if (response.ok) {
                const data = await response.json();
                console.log("COA updated successfully:", data);
                setIsModalOpen(false);
                // Optionally refresh the COA list or transactions here
            } else {
                const errorData = await response.json();
                console.error("Failed to update COA:", errorData.message);
            }
        } catch (error) {
            console.error("Error updating COA:", error);
        }
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
                                startIcon={<AiOutlineExport />}
                                onClick={() => setExportDialogOpen(true)}
                                style={{
                                    color: "#008080",
                                    borderColor: "#008080",
                                }}
                            >
                                Export
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

            {exportDialogOpen && (
                <ExportDialog
                    open={exportDialogOpen}
                    onClose={() => setExportDialogOpen(false)}
                    onExportPDF={exportToPDF}
                    onExportCSV={exportToCSV}
                />
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-4">
                        <h3 className="mb-4 text-xl font-semibold">
                            Tambah Jurnal
                        </h3>
                        {/* COA Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                COA (Nama Akun)
                            </label>
                            <select
                                value={selectedCoa}
                                onChange={async (e) => {
                                    const coaId = e.target.value; // This will now be the id
                                    setSelectedCoa(coaId);

                                    // Fetch the details for the selected COA using the id
                                    const coaDetailsData = await fetchWithAuth(
                                        `http://localhost:8000/api/coa/${coaId}`,
                                    );

                                    setSelectedCoaDetails(coaDetailsData);
                                }}
                                className="mt-2 block w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih COA</option>
                                {coaList.map((coa) => (
                                    <option key={coa.id} value={coa.id}>
                                        {" "}
                                        {/* Use coa.id here */}
                                        {coa.nama_akun}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button
                            variant="contained"
                            onClick={handleAddTransaction}
                            sx={{
                                backgroundColor: "#14B8A6",
                                color: "white",
                            }}
                        >
                            Simpan
                        </Button>
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
