"use client";
import React, { useState } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel3';
import { Button, Box, Typography, Paper, InputBase, IconButton, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import SearchIcon from '@mui/icons-material/Search';
import ModalForm from '@/components/Modal/ModalJamaah';

export default function Jamaah() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");  // State for dropdown

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const JamaahColumns = [
    { header: 'No', accessor: 'id' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Jenis Kelamin', accessor: 'gender' },
    { header: 'Tanggal Lahir', accessor: 'birth' },
    { header: 'Kontak', accessor: 'kontak' },
    { header: 'Email', accessor: 'email' },
    { header: 'Alamat', accessor: 'alamat' },
    { header: 'Status', accessor: 'keterangan' },
    { header: 'Tindakan', accessor: '' },
  ];

  const fetchUrl = 'http://localhost:8000/api/jamaah';

  const Jamaah = () => {
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
              >
                Export Data
              </Button>
            </Box>
          </Box>

          {/* Box containing search bar and status */}
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
                  <span>Select status</span>
                </MenuItem>
                <MenuItem value="Semua">Semua</MenuItem>
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Pindah">Pindah</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* DataTable Box with gap below search bar */}
          <Box sx={{ marginTop: '20px' }}>
            <DataTable columns={JamaahColumns} fetchUrl={fetchUrl} />
          </Box>
        </div>
        <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      </DefaultLaout>
    );
  };

  return <Jamaah />;
};
