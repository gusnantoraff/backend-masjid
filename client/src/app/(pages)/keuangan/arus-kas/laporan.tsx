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

export default function AccessibleTable() {
    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/arus-kas",
                );
                const result = await response.json();

                // Format the rows based on the fetched data
                const formattedRows = [];
                result.forEach((item) => {
                    // Handle "penerimaan_kas" as "Pemasukan"
                    item.penerimaan_kas.forEach((pemasukan) => {
                        formattedRows.push({
                            name: pemasukan.jenis,
                            date: pemasukan.tanggal,
                            amount: parseFloat(pemasukan.jumlah),
                            description: pemasukan.deskripsi,
                            file: pemasukan.image || "No File",
                            oleh: pemasukan.coa_id, // Replace with COA lookup if needed
                            status: "Pemasukan",
                        });
                    });

                    // Handle "pengeluaran_kas" as "Pengeluaran"
                    item.pengeluaran_kas.forEach((pengeluaran) => {
                        formattedRows.push({
                            name: pengeluaran.jenis,
                            date: pengeluaran.tanggal,
                            amount: -parseFloat(pengeluaran.jumlah),
                            description: pengeluaran.deskripsi,
                            file: pengeluaran.image || "No File",
                            oleh: pengeluaran.coa_id, // Replace with COA lookup if needed
                            status: "Pengeluaran",
                        });
                    });
                });

                setRows(formattedRows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter rows based on date and status
    const filteredRows = rows.filter((row) => {
        const rowDate = new Date(row.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const isDateInRange =
            (!start || rowDate >= start) && (!end || rowDate <= end);

        const isStatusMatch =
            (status === "pemasukan" && row.status === "Pemasukan") ||
            (status === "pengeluaran" && row.status === "Pengeluaran") ||
            !status;

        return isDateInRange && isStatusMatch;
    });

    // Handle pagination
    const displayedRows = filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
            <p className="mb-4 px-2 text-center text-3xl font-bold text-black">
                Jurnal
            </p>

            {/* Filter Form */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <TextField
                    label="Tanggal Mulai"
                    type="date"
                    size="small"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Tanggal Akhir"
                    type="date"
                    size="small"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    select
                    label="Status"
                    size="small"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ minWidth: "150px" }} // Ensures consistent width
                >
                    <MenuItem value="">Semua</MenuItem>
                    <MenuItem value="pemasukan">
                        <ArrowDownwardIcon
                            style={{ marginRight: "8px", color: "green" }}
                        />
                        Pemasukan
                    </MenuItem>
                    <MenuItem value="pengeluaran">
                        <ArrowUpwardIcon
                            style={{ marginRight: "8px", color: "red" }}
                        />
                        Pengeluaran
                    </MenuItem>
                </TextField>
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
            </div>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Jenis</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Jumlah</TableCell>
                            <TableCell>Deskripsi</TableCell>
                            <TableCell>File</TableCell>
                            <TableCell>Oleh</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.map((row, index) => (
                            <TableRow
                                key={index}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                                }}
                            >
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
                                <TableCell>{row.file}</TableCell>
                                <TableCell>{row.oleh}</TableCell>
                                <TableCell>
                                    {row.status === "Pengeluaran" ? (
                                        <ArrowUpwardIcon
                                            style={{ color: "red" }}
                                        />
                                    ) : (
                                        <ArrowDownwardIcon
                                            style={{ color: "green" }}
                                        />
                                    )}
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
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
