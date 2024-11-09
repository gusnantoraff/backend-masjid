"use client";
import React, { useState } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel3';
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import ModalForm from '@/components/Modal/ModalYatim';

export default function YatimDhuafa() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const yatimColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Kontak', accessor: 'kontak' },
    { header: 'Tanggal Lahir', accessor: 'birth' },
    { header: 'Alamat', accessor: 'alamat' },
    { header: 'Keterangan', accessor: 'keterangan' },
    { header: 'Status', accessor: 'status' },
    { header: 'Tindakan', accessor: '' },
  ];

  const fetchUrl = 'http://localhost:8000/api/yatim-dhuafa';

  const Yatim = () => {
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
          Data Yatim, Piatu, dan Dhuafa
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

  return <Yatim />;
};
