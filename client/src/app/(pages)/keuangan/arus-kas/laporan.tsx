"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Menu from "@mui/material/Menu";
import MenuItemMUI from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { AiOutlineExport } from "react-icons/ai";
import { jsPDF } from "jspdf";

export default function AccessibleTable({
    isLaporanPage,
    isPenerimaanPage,
    isPengeluaranPage,
    isArusKasPage,
}) {
    const [rows, setRows] = useState([]);
    const [coaMap, setCoaMap] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(""); // Filter bulan
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);

    const pageTitle = isLaporanPage
        ? "Laporan Keuangan"
        : isPenerimaanPage
          ? "Penerimaan"
          : isPengeluaranPage
            ? "Pengeluaran"
            : isArusKasPage
              ? "Jurnal Arus Kas"
              : "";

    const exportFileName = isLaporanPage
        ? "laporan_keuangan"
        : isPenerimaanPage
          ? "laporan_penerimaan"
          : isPengeluaranPage
            ? "laporan_pengeluaran"
            : "";

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
                const response = await fetch("http://localhost:8000/api/coa");
                const result = await response.json();
                const coaMapping = {};
                result.forEach((coa) => {
                    coaMapping[coa.id] = coa.nama_akun;
                });
                setCoaMap(coaMapping);
            } catch (error) {
                console.error("Error fetching COA data:", error);
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/arus-kas",
                );
                const result = await response.json();

                const formattedRows = [];
                result.forEach((item) => {
                    item.penerimaan_kas.forEach((pemasukan) => {
                        formattedRows.push({
                            name: pemasukan.jenis,
                            date: pemasukan.tanggal,
                            amount: parseFloat(pemasukan.jumlah),
                            description: pemasukan.deskripsi,
                            file: pemasukan.image || "No File",
                            oleh: pemasukan.coa_id,
                            status: "Pemasukan",
                        });
                    });

                    item.pengeluaran_kas.forEach((pengeluaran) => {
                        formattedRows.push({
                            name: pengeluaran.jenis,
                            date: pengeluaran.tanggal,
                            amount: -parseFloat(pengeluaran.jumlah),
                            description: pengeluaran.deskripsi,
                            file: pengeluaran.image || "No File",
                            oleh: pengeluaran.coa_id,
                            status: "Pengeluaran",
                        });
                    });
                });

                setRows(formattedRows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCoaData();
        fetchData();
    }, []);

    const mappedRows = rows.map((row) => ({
        ...row,
        oleh: coaMap[row.oleh] || row.oleh,
    }));

    const filteredRows = mappedRows.filter((row) => {
        const rowDate = new Date(row.date); // Ubah string menjadi Date object
        const start = startDate ? new Date(startDate) : null; // Pastikan startDate menjadi Date object
        const end = endDate ? new Date(endDate) : null; // Pastikan endDate menjadi Date object

        // Mengatur kondisi untuk rentang tanggal
        const isDateInRange =
            (!start || rowDate >= start) && (!end || rowDate <= end);

        // Memeriksa apakah bulan yang dipilih sesuai
        const isMonthMatch =
            !selectedMonth ||
            rowDate.getMonth() + 1 === parseInt(selectedMonth); // +1 karena getMonth() mengembalikan 0 untuk Januari

        const isStatusMatch =
            (isLaporanPage ||
                isArusKasPage ||
                (isPenerimaanPage && row.status === "Pemasukan") ||
                (isPengeluaranPage && row.status === "Pengeluaran")) &&
            (!status ||
                (status === "pemasukan" && row.status === "Pemasukan") ||
                (status === "pengeluaran" && row.status === "Pengeluaran"));

        return isDateInRange && isMonthMatch && isStatusMatch;
    });

    const displayedRows = filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExport = (format) => {
        if (!isArusKasPage) {
            if (format === "CSV") {
                const csvContent =
                    "data:text/csv;charset=utf-8," +
                    ["Jenis,Tanggal,Jumlah,Deskripsi,File,Oleh,Status"]
                        .concat(
                            filteredRows.map((row) =>
                                [
                                    row.name,
                                    row.date,
                                    row.amount,
                                    row.description,
                                    row.file,
                                    row.oleh,
                                    row.status,
                                ].join(","),
                            ),
                        )
                        .join("\n");

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `${exportFileName}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else if (format === "PDF") {
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
                const tableData = filteredRows.map((row, index) => [
                    index + 1,
                    row.name,
                    row.date,
                    row.amount.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }),
                    row.description,
                    row.file,
                    row.oleh,
                    row.status,
                ]);
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text(pageTitle, 10.5, 1, { align: "center" });

                doc.autoTable({
                    head: [headers],
                    body: tableData,
                    startY: 2,
                    theme: "grid",
                });

                doc.save(`${exportFileName}.pdf`);
            }
        }

        setAnchorEl(null);
    };

    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
            <p className="mb-4 mt-2 px-2 text-center text-3xl font-bold text-black">
                {pageTitle}
            </p>

            {/* Filters */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <div
                    style={{ display: "flex", gap: "16px", paddingTop: "10px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "16px",
                                paddingTop: "10px",
                            }}
                        >
                            <TextField
                                label="Tanggal Mulai"
                                type="date"
                                size="small"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Tanggal Akhir"
                                type="date"
                                size="small"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {isArusKasPage && (
                                <TextField
                                    select
                                    label="Status"
                                    size="small"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ minWidth: 120 }}
                                >
                                    <MenuItem value="">
                                        <span>Semua</span>
                                    </MenuItem>
                                    <MenuItem value="pemasukan">
                                        <ArrowDownwardIcon
                                            style={{
                                                marginRight: "8px",
                                                color: "green",
                                            }}
                                        />
                                        <span>Pemasukan</span>
                                    </MenuItem>
                                    <MenuItem value="pengeluaran">
                                        <ArrowUpwardIcon
                                            style={{
                                                marginRight: "8px",
                                                color: "red",
                                            }}
                                        />
                                        <span>Pengeluaran</span>
                                    </MenuItem>
                                </TextField>
                            )}
                            {(isPenerimaanPage || isPengeluaranPage) && (
                                <TextField
                                    select
                                    label="Pilih Bulan"
                                    size="small"
                                    value={selectedMonth}
                                    onChange={(e) =>
                                        setSelectedMonth(e.target.value)
                                    }
                                    style={{ minWidth: "150px" }}
                                >
                                    <MenuItem value="">Semua Bulan</MenuItem>
                                    {months.map((month) => (
                                        <MenuItem
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setStartDate("");
                                    setEndDate("");
                                    setStatus("");
                                }}
                            >
                                Reset Filter
                            </Button>
                            {!isArusKasPage && (
                                <>
                                    <Button
                                        onClick={handleClick}
                                        variant="outlined"
                                        startIcon={<AiOutlineExport />}
                                        style={{
                                            color: "#008080", // Warna teks dan ikon hijau toska
                                            borderColor: "#008080", // Warna border hijau toska
                                        }}
                                    >
                                        Export
                                    </Button>
                                    <Menu
                                        id="export-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItemMUI
                                            onClick={() => handleExport("CSV")}
                                        >
                                            <ListItemIcon>
                                                <GridOnIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Export to CSV" />
                                        </MenuItemMUI>
                                        <MenuItemMUI
                                            onClick={() => handleExport("PDF")}
                                        >
                                            <ListItemIcon>
                                                <PictureAsPdfIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Export to PDF" />
                                        </MenuItemMUI>
                                    </Menu>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Jenis
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Tanggal
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Jumlah
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Deskripsi
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                File
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Oleh
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontFamily: "Satoshi",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell
                                    style={{
                                        color: row.amount < 0 ? "red" : "green",
                                    }}
                                >
                                    {row.amount.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "10px",
                                    }}
                                >
                                    {row.file}
                                </TableCell>
                                <TableCell>{row.oleh}</TableCell>
                                <TableCell>
                                    {row.amount < 0 ? (
                                        <div
                                            style={{
                                                color: "red",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ArrowUpwardIcon />
                                            <span>Pengeluaran</span>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                color: "green",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ArrowDownwardIcon />
                                            <span>Pemasukan</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}
