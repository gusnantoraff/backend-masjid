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
    
    const isStatusMatch =
      (status === 'pemasukan' && row.amount > 0) ||
      (status === 'pengeluaran' && row.amount < 0) ||
      !status;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <p className='text-2xl font-bold text-black mb-4 px-2'>Jurnal</p>
      {/* Filter Form */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingTop: '10px' }}>
        <TextField
          label="Tanggal Mulai"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Tanggal Akhir"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ minWidth: 120 }}
        >
          <MenuItem value="">Semua</MenuItem>
          <MenuItem value="pemasukan">Pemasukan</MenuItem>
          <MenuItem value="pengeluaran">Pengeluaran</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          onClick={() => {
            setStartDate('');
            setEndDate('');
            setStatus('');
          }}
        >
          Reset Filter
        </Button>
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
            {displayedRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
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
