"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import "@/css/satoshi.css";
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import { AiOutlineExport } from 'react-icons/ai';
import {ListItemIcon, ListItemText } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import { jsPDF } from "jspdf";

// Dummy data
function createData(
  name: string,
  date: string,
  amount: number,
  description: string,
  file: string,
  oleh: string,
) {
  return { name, date, amount, description, file, oleh };
}

const rows = [
  createData('Gaji', '2023-10-12', 5000000, 'Pemasukan bulanan', 'img.jpg', 'Hamba Allah'),
  createData('Bayar Listrik', '2023-10-12', -200000, 'Pengeluaran bulanan', 'img.jpg', 'Hamba Allah'),
  createData('Donasi Masjid', '2023-10-12', 1000000, 'Pemasukan', 'img.jpg', 'Hamba Allah'),
  // Tambahkan lebih banyak data jika perlu
];

export default function AccessibleTable() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

// Filtered rows based on date and status
const filteredRows = rows.filter((row) => {
  const rowDate = new Date(row.date);
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const isDateInRange =
    (!start || rowDate >= start) && (!end || rowDate <= end);
  
  // Only include rows with positive amount (Pemasukan)
  const isStatusMatch = row.amount > 0;

  return isDateInRange && isStatusMatch;
});


  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset ke halaman pertama saat jumlah baris per halaman diubah
  };

  // Calculate displayed rows for the current page
  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Handle Menu Open/Close
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleExport = (format) => {
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
                          ].join(","),
                      ),
                  )
                  .join("\n");

          const encodedUri = encodeURI(csvContent);
          const link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "laporan_penerimaan.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else if (format === "PDF") {
          const doc = new jsPDF("p", "cm", "a4");

      // Header tabel
      const headers = [
          "No", "Jenis", "Tanggal", "Jumlah", "Deskripsi", "File", "Oleh",
      ];

      // Data tabel
      const tableData = filteredRows.map((row, index) => [
          index + 1,
          row.name,
          row.date,
          row.amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
          row.description,
          row.file,
          row.oleh,
      ]);

      // Pengaturan header dokumen
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Laporan Keuangan", 10.5, 1, { align: "center" });

      // Posisi awal Y untuk tabel
      let yPosition = 2;
      const cellHeight = 0.8;

      // Lebar kolom
      const columnWidths = [1, 3, 3, 3, 5, 3, 3, 3];

      // Gaya untuk header tabel
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Warna teks hitam

      headers.forEach((header, index) => {
          const xPosition = columnWidths.slice(0, index).reduce((a, b) => a + b, 1);
          doc.text(header, xPosition + columnWidths[index] / 2, yPosition, { align: "center" });
      });

      yPosition += cellHeight;

      // Gaya untuk baris data
      doc.setFont("helvetica", "normal");

      tableData.forEach((row) => {
          row.forEach((cell, index) => {
              const xPosition = columnWidths.slice(0, index).reduce((a, b) => a + b, 1);
              doc.text(String(cell), xPosition + columnWidths[index] / 2, yPosition, { align: "center" });
          });

          yPosition += cellHeight;

          // Jika Y melewati batas halaman, tambahkan halaman baru
          if (yPosition > 28) {
              doc.addPage();
              yPosition = 2;

              headers.forEach((header, index) => {
                  const xPosition = columnWidths.slice(0, index).reduce((a, b) => a + b, 1);
                  doc.text(header, xPosition + columnWidths[index] / 2, yPosition, { align: "center" });
              });

              yPosition += cellHeight;
          }
      });

      // Simpan file PDF
      doc.save("laporan_keuangan.pdf"); 
        };
      setAnchorEl(null);
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
    {/* Title */}
    <p className='text-3xl font-bold text-black mb-4 px-2 mt-2 text-center'>Jurnal Penerimaan</p>

    {/* Filter Form */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', paddingTop: '10px' }}>
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
        <Button
          variant="contained"
          onClick={() => {
            setStartDate('');
            setEndDate('');
            setStatus('');
          }}
        >
          Reset Filter
        </Button>
        <Button
        onClick={handleClick}
        aria-controls="export-menu"
        aria-haspopup="true"
        variant="outlined"
        startIcon={<AiOutlineExport />}
        style={{ color: "#40E0D0", // Hijau toska untuk teks
          borderColor: "#40E0D0", // Hijau toska untuk border 
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
        <MenuItem onClick={() => handleExport('CSV')}>
          <ListItemIcon>
            <GridOnIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Export to CSV" />
        </MenuItem>
        <MenuItem onClick={() => handleExport('PDF')}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Export to PDF" />
        </MenuItem>
      </Menu>
      </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table sx={{ width: '100%', tableLayout: 'auto' }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Jenis</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Tanggal</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Jumlah</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Deskripsi</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>File</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Oleh</TableCell>
              <TableCell sx={{ fontFamily: 'Satoshi', fontWeight: 'bold', fontSize: '16px' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row,index) => (
              <TableRow key={row.name} sx={{
                backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
              }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell style={{ color: row.amount < 0 ? 'red' : 'green' }}>
        {row.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
      </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.file}</TableCell>
                <TableCell>{row.oleh}</TableCell>
                <TableCell>
                  {row.amount < 0 ? (
                    <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                      <ArrowUpwardIcon />
                      <span>Pengeluaran</span>
                    </div>
                  ) : (
                    <div style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
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
        rowsPerPageOptions={[10, 25]}
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
