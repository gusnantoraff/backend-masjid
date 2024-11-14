"use client";
import React, { useState } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel1';
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import ModalForm from '@/components/Modal/ModalAkun';

export default function YatimDhuafa() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const akunColumns = [
    { header: 'No', accessor: 'id' },
    { header: 'First Name', accessor: 'firstname' },
    { header: 'Last Name', accessor: 'lastname' },
    { header: 'Email', accessor: 'email' },
    { header: 'Kontak', accessor: 'phone' },
    { header: 'Tanggal Lahir', accessor: 'birth' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Role', accessor: 'role' },
    { header: 'Tindakan', accessor: '' },
  ];

  const fetchUrl = 'http://localhost:8000/api/users';

  const Akun = () => {
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
         Pengaturan Akun
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#14B8A6', color: 'white', marginRight: '10px' }} 
            startIcon={<AiOutlinePlus />}
            onClick={openModal}
          >
            Tambah Users
          </Button>
        </Box>
      </Box>
      <DataTable 
            columns={akunColumns} 
            fetchUrl={fetchUrl} 
            refresh={refresh} // Pass the refresh prop here
          />
        </div>
        <ModalForm isOpen={isModalOpen} onClose={closeModal}/>
      </DefaultLaout>
    );
  };

  return <Akun />;
};
