"use client"
import React, { useState } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable';
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import ModalForm from '@/components/Modal/ModalJamaah';

export default function Jamaah() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const yatimColumns = [
    { header: 'Nomor', accessor: 'id' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Jenis Kelamin', accessor: 'gender' },
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
          padding:'15px',
          backgroundColor: '#EDF1F8',
          color: 'black',
          borderRadius: '10px',
          width: '100%'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ fontWeight: '600', fontFamily:'Nunito Sans' }} 
        >
          Data Jamaah
        </Typography>
        <Box>
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
          <DataTable columns={yatimColumns} fetchUrl={fetchUrl} />
        </div>
        <ModalForm isOpen={isModalOpen} onClose={closeModal}/>
      </DefaultLaout>
    );
  };

  return <Jamaah />;
};
