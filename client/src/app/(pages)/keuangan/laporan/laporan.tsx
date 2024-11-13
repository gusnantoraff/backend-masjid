"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "@/css/satoshi.css";
import { AiOutlineExport } from 'react-icons/ai';
import { ListItemIcon, ListItemText } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Dummy data function
function createData(name, date, amount, description, file, oleh) {
  return { name, date, amount, description, file, oleh };
}

// Define dummy data outside the component to ensure stability
const initialRows = [
  createData('Gaji', '2023-10-12', 5000000, 'Pemasukan bulanan', 'img.jpg', 'Hamba Allah'),
  createData('Bayar Listrik', '2023-10-12', -200000, 'Pengeluaran bulanan', 'img.jpg', 'Hamba Allah'),
  createData('Donasi Masjid', '2023-10-12', 1000000, 'Pemasukan', 'img.jpg', 'Hamba Allah'),
  // Add more data as needed
];

export default function AccessibleTable() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10; // Fixed rows per page

  // Memoized filtered rows based on date and status
  const filteredRows = React.useMemo(() => {
    return initialRows.filter((row) => {
      const rowDate = new Date(row.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const isDateInRange = (!start || rowDate >= start) && (!end || rowDate <= end);
      const isStatusMatch =
        (status === 'pemasukan' && row.amount > 0) ||
        (status === 'pengeluaran' && row.amount < 0) ||
        !status;

      return isDateInRange && isStatusMatch;
    });
  }, [startDate, endDate, status]);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [startDate, endDate, status]);

  // Slice data for the current page
  const paginatedRows = React.useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredRows]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Menu Open/Close
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format) => {
    handleClose();
    console.log(`Exporting to ${format}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Title */}
      <p className='text-3xl font-bold text-black mb-4 px-2 text-center'>Jurnal Laporan</p>

      {/* Filter Form */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', paddingTop: '10px' }}>
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
            style={{ minWidth: 120 }}
          >
            <MenuItem value="">
              <span>Semua</span>
            </MenuItem>
            <MenuItem value="pemasukan">
              <ArrowDownwardIcon style={{ marginRight: '8px', color: 'green' }} />
              <span>Pemasukan</span>
            </MenuItem>
            <MenuItem value="pengeluaran">
              <ArrowUpwardIcon style={{ marginRight: '8px', color: 'red' }} />
              <span>Pengeluaran</span>
            </MenuItem>
          </TextField>
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
            style={{ color: 'blue', borderColor: 'blue' }}
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
            {paginatedRows.map((row, index) => (
              <TableRow key={row.name} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
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
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}
