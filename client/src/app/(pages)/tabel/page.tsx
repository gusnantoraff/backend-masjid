"use client";
import React, { useState, useEffect, useMemo } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import fetchWithAuth from "@/utils/fetch";
import axios from "@/utils/axios";
import { SlActionUndo } from "react-icons/sl";
import { Checkbox } from "@mui/material";
import { Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TabelKeuangan = () => {
    const [rows, setRows] = useState([]);
    const [coaMap, setCoaMap] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIds, setSelectedIds] = useState({
        Pemasukan: [],
        Pengeluaran: [],
    });
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isRestore, setIsRestore] = useState(false); // Mengelola mode restore
    const [restoreItems, setRestoreItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const COAUrl = "/coa";

    const months = [
        { value: "01", label: "Januari" },
        { value: "02", label: "Februari" },
        { value: "03", label: "Maret" },
        { value: "04", label: "April" },
        { value: "05", label: "Mei" },
        { value: "06", label: "Juni" },
        { value: "07", label: "Juli" },
        { value: "08", label: "Agustus" },
        { value: "09", label: "September" },
        { value: "10", label: "Oktober" },
        { value: "11", label: "November" },
        { value: "12", label: "Desember" },
    ];

    useEffect(() => {
        const fetchCoaData = async () => {
            try {
                setLoading(true);
                const coaurl = COAUrl;
                const response = await axios.get(coaurl);
    
                const coaMapping = {};
                response.data.forEach((coa) => {
                    coaMapping[coa.id] = {
                        nama_akun: coa.nama_akun,
                        tipe: coa.tipe,
                    };
                });
    
                setCoaMap(coaMapping); // This sets the COA map
            } catch (error) {
                console.error("Error fetching COA data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        const fetchPenerimaanKas = async (coaMapping) => {
            try {
                const url = isRestore
                    ? `/penerimaan-kas/deleted`
                    : `/penerimaan-kas`;
                const response = await axios.get(url);
    
                return response.data.map((pemasukan) => ({
                    id: pemasukan.id,
                    name: pemasukan.jenis,
                    date: pemasukan.tanggal,
                    amount: parseFloat(pemasukan.jumlah),
                    tipe: coaMapping[pemasukan.coa_id]?.tipe || "N/A",
                    description: pemasukan.deskripsi,
                    file: pemasukan.image || "No File",
                    oleh: coaMapping[pemasukan.coa_id]?.nama_akun || "Unknown",
                    status: "Pemasukan",
                }));
            } catch (error) {
                console.error("Error fetching Penerimaan Kas:", error);
                return [];
            }
        };
    
        const fetchPengeluaranKas = async (coaMapping) => {
            try {
                const url = isRestore
                    ? `/pengeluaran-kas/deleted`
                    : `/pengeluaran-kas`;
                const response = await axios.get(url);
    
                return response.data.map((pengeluaran) => ({
                    id: pengeluaran.id,
                    name: pengeluaran.jenis,
                    date: pengeluaran.tanggal,
                    amount: -parseFloat(pengeluaran.jumlah),
                    tipe: coaMapping[pengeluaran.coa_id]?.tipe || "N/A",
                    description: pengeluaran.deskripsi,
                    file: pengeluaran.image || "No File",
                    oleh: coaMapping[pengeluaran.coa_id]?.nama_akun || "Unknown",
                    status: "Pengeluaran",
                }));
            } catch (error) {
                console.error("Error fetching Pengeluaran Kas:", error);
                return [];
            }
        };
    
        const fetchData = async () => {
            try {
                setLoading(true);

                console.log("Fetching COA data...");
                await fetchCoaData();
                console.log("COA data fetched.");
        
                console.log("Fetching Penerimaan Kas data...");
                const penerimaanKas = await fetchPenerimaanKas(coaMap);
                console.log("Penerimaan Kas data fetched:", penerimaanKas);
        
                console.log("Fetching Pengeluaran Kas data...");
                const pengeluaranKas = await fetchPengeluaranKas(coaMap);
                console.log("Pengeluaran Kas data fetched:", pengeluaranKas);

                const combinedData = [...penerimaanKas, ...pengeluaranKas];
                console.log("Combined Data (Before Filtering):", combinedData);
        
                combinedData.forEach((item, index) => {
                    if (item.deleted_status === undefined) {
                        console.error(`Error: 'deleted_status' is missing in item at index ${index}`, item);
                    }
                });
        
                // Filter data based on restore mode
                const filteredData = [...penerimaanKas, ...pengeluaranKas].filter(
                    (item) => (isRestore ? item.deleted_status === 1 : true)
                );
                
        
                console.log("Filtered Data (After Filtering):", filteredData);
        
                // Set filtered rows to the state
                if (filteredData.length === 0) {
                    console.warn("No data matched the filter condition.");
                }
                setRows(filteredData); 
        
            } catch (error) {
                console.error("Error fetching data:", error.message);
                console.error("Stack trace:", error.stack);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData(); // Call the function to fetch the data
         // Call the function to fetch the data
        
    
    }, [isRestore]); // Only depend on isRestore, no longer on coaMap
    
    const displayedRows = useMemo(() => {
        // Ensure the data for the current page is correctly sliced.
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows, page, rowsPerPage]);
    

    const handleSelect = (id, status) => {
        setSelectedIds((prevSelectedIds) => {
            // Tentukan daftar ID berdasarkan status (Pemasukan atau Pengeluaran)
            const currentSelectedIds = prevSelectedIds[status] || [];

            if (currentSelectedIds.includes(id)) {
                // Jika ID sudah ada di selectedIds, maka hilangkan
                return {
                    ...prevSelectedIds,
                    [status]: currentSelectedIds.filter((item) => item !== id),
                };
            } else {
                // Jika ID belum ada, tambahkan
                return {
                    ...prevSelectedIds,
                    [status]: [...currentSelectedIds, id],
                };
            }
        });
    };

    const handleSelectId = (id, status) => {
        setSelectedIds((prevSelectedIds) => {
            const currentSelectedIds = prevSelectedIds[status] || [];

            if (currentSelectedIds.includes(id)) {
                // Jika ID sudah ada, hapus dari daftar terpilih
                return {
                    ...prevSelectedIds,
                    [status]: currentSelectedIds.filter((item) => item !== id),
                };
            } else {
                // Jika ID belum ada, tambahkan ke daftar terpilih
                return {
                    ...prevSelectedIds,
                    [status]: [...currentSelectedIds, id],
                };
            }
        });
    };

    const handleDelete = async () => {
        const selectedPemasukan = selectedIds.Pemasukan || [];
        const selectedPengeluaran = selectedIds.Pengeluaran || [];

        if (
            selectedPemasukan.length === 0 &&
            selectedPengeluaran.length === 0
        ) {
            setErrorMessage("Tidak ada data yang dipilih.");
            return;
        }

        try {
            // Hapus data Pemasukan
            for (const id of selectedPemasukan) {
                await axios.delete(`/penerimaan-kas/${id}`);
            }

            // Hapus data Pengeluaran
            for (const id of selectedPengeluaran) {
                await axios.delete(`/pengeluaran-kas/${id}`);
            }

            // Filter data yang sudah dihapus
            const updatedRows = rows.filter(
                (item) =>
                    !selectedPemasukan.includes(item.id) &&
                    !selectedPengeluaran.includes(item.id),
            );

            setRows(updatedRows);
            setSelectedIds({ Pemasukan: [], Pengeluaran: [] }); // Reset selectedIds setelah penghapusan
            setSuccessMessage("Data berhasil dihapus.");
            setIsDeleteModalOpen(false); // Menutup modal setelah berhasil
        } catch (error) {
            console.error("Error deleting data:", error);
            setErrorMessage("Gagal menghapus data. Silakan coba lagi.");
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const closeAlert = () => {
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleRestoreSubmit = async () => {
        // Combine selected IDs from both Pemasukan and Pengeluaran
        const selectedPemasukan = selectedIds.Pemasukan || [];
        const selectedPengeluaran = selectedIds.Pengeluaran || [];

        // If there are no selected IDs for both, show error
        if (
            selectedPemasukan.length === 0 &&
            selectedPengeluaran.length === 0
        ) {
            setErrorMessage("Tidak ada data yang dipilih untuk dipulihkan.");
            return;
        }

        try {
            // Restoring selected Pemasukan
            for (const id of selectedPemasukan) {
                await axios.patch(`/penerimaan-kas/${id}/restore`);
            }

            // Restoring selected Pengeluaran
            for (const id of selectedPengeluaran) {
                await axios.patch(`/pengeluaran-kas/${id}/restore`);
            }

            // Reset selected IDs after restore
            setSelectedIds({ Pemasukan: [], Pengeluaran: [] });
            setIsRestore(false); // Exit restore mode
            setSuccessMessage("Data yang dipilih berhasil dipulihkan.");
        } catch (error) {
            console.error("Error restoring data:", error);
            setErrorMessage("Gagal memulihkan data. Silakan coba lagi.");
        }
    };


    return (
        <>
            {errorMessage && (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-red-500 p-4 text-white">
                    {errorMessage}
                    <button
                        onClick={closeAlert}
                        className="text-white hover:text-gray-300"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}
            {successMessage && (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-green-500 p-4 text-white">
                    {successMessage}
                    <button
                        onClick={closeAlert}
                        className="text-white hover:text-gray-300"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#FFB80D",
                    color: "white",
                    marginRight: "10px",
                }}
                startIcon={<SlActionUndo />}
                onClick={() => setIsRestore(!isRestore)}
            >
                {isRestore ? "Cancel Restore" : "Restore Data"}
            </Button>

            <table className="border-grey-200 min-w-full border bg-white dark:bg-dark-2 dark:text-slate-200">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Jenis
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Tanggal
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Jumlah
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Tipe
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            File
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Oleh
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            Status
                        </th>
                        <th className="border-b px-4 py-2 text-left dark:border-gray-dark">
                            {isRestore ? (
                                <Checkbox
                                    checked={
                                        selectedIds.length === rows.length &&
                                        rows.length > 0
                                    }
                                    indeterminate={
                                        selectedIds.length > 0 &&
                                        selectedIds.length < rows.length
                                    }
                                    onChange={() => {}}
                                />
                            ) : (
                                "Aksi"
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedRows.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } dark:bg-dark-3 dark:odd:bg-dark-2`}
                        >
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.name} {/* Displaying the "name" field */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {new Date(item.date).toLocaleDateString()}{" "}
                                {/* Formatting the date */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.amount.toFixed(2)}{" "}
                                {/* Formatting the amount to 2 decimal places */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.tipe} {/* Displaying the "tipe" field */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.file} {/* Displaying the "file" field */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.oleh} {/* Displaying the "oleh" field */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                {item.status}{" "}
                                {/* Displaying the "status" field */}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                <div className="flex justify-start gap-2">
                                    {isRestore ? (
                                        // Saat dalam mode restore, hanya tampilkan checkbox
                                        <Checkbox
                                            checked={
                                                selectedIds[
                                                    item.status
                                                ]?.includes(item.id) || false
                                            } // Use item.status to dynamically reference the correct array
                                            onChange={() =>
                                                handleSelectId(
                                                    item.id,
                                                    item.status,
                                                )
                                            }
                                            inputProps={{
                                                "aria-label":
                                                    "Restore Checkbox",
                                            }}
                                        />
                                    ) : (
                                        // Saat tidak dalam mode restore, tampilkan tombol aksi
                                        <>
                                            <button
                                                className="flex items-center text-blue-500"
                                                onClick={() => {
                                                    handleSelectId(
                                                        item.id,
                                                        item.status,
                                                    ); // Memilih ID saat ikon mata diklik
                                                    setSelectedId(item.id); // Menyimpan ID untuk detail // Pilih ID item
                                                    setIsDetailModalOpen(true);
                                                }}
                                            >
                                                <FaEye size={20} />
                                            </button>
                                            <button
                                                className="flex items-center text-red-500"
                                                onClick={() => {
                                                    handleSelectId(
                                                        item.id,
                                                        item.status,
                                                    ); // Memilih ID saat ikon mata diklik
                                                    setSelectedId(item.id); // Menyimpan ID untuk detail // Pilih ID item
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isRestore && (
                <Box
                    sx={{
                        marginTop: 2,
                        textAlign: "right",
                        padding: "0 10px 10px 0",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleRestoreSubmit}
                        disabled={selectedIds.length === 0}
                        sx={{ backgroundColor: "#14B8A6", marginTop: "10px" }}
                    >
                        Restore Pilihan
                    </Button>
                </Box>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-lg bg-white p-6">
                        <h3 className="text-lg font-bold">
                            Are you sure you want to delete this item?
                        </h3>
                        <div className="mt-4">
                            <button
                                onClick={handleDelete}
                                className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="rounded bg-gray-300 px-4 py-2"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TabelKeuangan;
