"use client";
import React, { useState, useEffect } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel3';
import { Button, Box, Typography, Paper, InputBase, IconButton, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import SearchIcon from '@mui/icons-material/Search';
import ModalForm from '@/components/Modal/ModalJamaah';
import { jsPDF } from "jspdf";
import axios from '@/utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'; 

interface Jamaah {
  nama: string;
  gender: string;
  birth: string;
  kontak: string;
  email: string;
  alamat: string;
  keterangan: string;
}

interface Column {
  header: string;
  accessor: string;
  type?: 'jamaah' | 'yatim-dhuafa';
}

export default function Jamaah() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [jamaahData, setJamaahData] = useState<Jamaah[]>([]);
  const [filteredData, setFilteredData] = useState<Jamaah[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/jamaah');
      setJamaahData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = jamaahData;

    if (status && status !== "Semua") {
      filtered = filtered.filter((jamaah) => jamaah.keterangan === status);
    }

    if (searchTerm) {
      filtered = filtered.filter((jamaah) =>
        jamaah.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jamaah.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jamaah.birth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jamaah.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jamaah.kontak.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jamaah.alamat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [status, searchTerm, jamaahData]);

  const reloadData = () => {
    axios
      .get('/jamaah')
      .then((response) => {
        setJamaahData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error re-fetching data:", error);
      });
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = () => {
    fetchData();
    closeModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handleExport = () => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const doc = new jsPDF("p", "cm", "a4");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Export Date: ${currentDate}`, 1, 1); // Date at the top-left

    const headers = ["No", "Nama", "Jenis Kelamin", "Tanggal Lahir", "Kontak", "Email", "Alamat", "Status"];
    const tableData = jamaahData.map((row, index) => [
      index + 1,
      row.nama,
      row.gender,
      row.birth,
      row.kontak,
      row.email,
      row.alamat,
      row.keterangan
    ]);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Data Jamaah", 10.5, 1, { align: 'center' });

    let yPosition = 2;
    const cellHeight = 0.8;
    const columnWidths = [1, 3, 2.5, 2.5, 3, 4, 4, 3];

    // Set header styles (bold text, no background)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Black text color for header

    doc.setFontSize(10);
    headers.forEach((header, index) => {
      const xPosition = columnWidths.slice(0, index).reduce((a, b) => a + b, 1);
      doc.text(header, xPosition + columnWidths[index] / 2, yPosition, { align: 'center' });
    });

    yPosition += cellHeight;
    doc.setFont("helvetica", "normal"); // Reset to normal font for data rows

    // Data row styles (plain text, no background)
    tableData.forEach((row) => {
      row.forEach((cell, index) => {
        const xPosition = columnWidths.slice(0, index).reduce((a, b) => a + b, 1);
        doc.text(String(cell), xPosition + columnWidths[index] / 2, yPosition, { align: 'center' });
      });

      yPosition += cellHeight;
    });

    doc.save(`${currentDate}_Data Jamaah.pdf`);


  };

  const JamaahColumns: Column[] = [
    { header: 'No', accessor: 'nomor' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Jenis Kelamin', accessor: 'gender' },
    { header: 'Tanggal Lahir', accessor: 'birth' },
    { header: 'Kontak', accessor: 'kontak' },
    { header: 'Email', accessor: 'email' },
    { header: 'Alamat', accessor: 'alamat' },
    { header: 'Status', accessor: 'keterangan' },
    { header: 'Tindakan', accessor: '', type: 'jamaah' },
  ];

  return (
    <DefaultLaout>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#EDF1F8',
            color: 'black',
            borderRadius: '10px',
            width: '100%'
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: '600', fontFamily: 'Nunito Sans' }}
          >
            Data Jamaah
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#14B8A6', color: 'white', marginRight: '10px' }}
              startIcon={<AiOutlinePlus />}
              onClick={openModal}
            >
              Tambah Data
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<AiOutlineUpload />}
              onClick={handleExport}  // Attach export function here
            >
              Export Data
            </Button>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          maxWidth: '600px',  // Limit the width of the container
        }}>
          {/* Search Bar */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0px 10px',  // Adjust padding for consistent height
              borderRadius: '10px',
              backgroundColor: '#F5F7FA',
              boxShadow: 'none',  // Removed shadow from the search bar
              width: '55%',  // Occupy 55% of the width
              height: '40px',  // Set fixed height to match Select
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Paper>

          {/* Status Dropdown */}
          <FormControl sx={{
            minWidth: '180px',
            marginLeft: '10px',  // Reduced space between the search and status dropdown
          }}>
            <Select
              displayEmpty
              value={status}
              onChange={handleStatusChange}
              sx={{
                backgroundColor: '#F5F7FA',
                borderRadius: '10px',
                padding: '0px 10px',  // Adjust padding to match the search bar
                height: '40px',  // Fixed height to match search bar
                border: 'none',
                boxShadow: 'none',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },  // Remove default outline
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: '#888' }}>Status</span>; // Placeholder style
                }
                return selected;
              }}
            >
              <MenuItem value="">
                <span>Pilih Status</span>
              </MenuItem>
              <MenuItem value="Semua">Semua</MenuItem>
              <MenuItem value="aktif">Aktif</MenuItem>
              <MenuItem value="pindah">Pindah</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <DataTable columns={JamaahColumns} data={filteredData} fetchUrl='/jamaah' reloadData={reloadData} />
        </Box>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handleModalSubmit} onSuccess={(message: string) => toast.success(message)}/>
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} />

    </DefaultLaout>
  );
}
