"use client";
import React, { useState } from 'react';
import DefaultLaout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel1';
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import ModalForm from '@/components/Modal/ModalAkun';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SlActionUndo } from "react-icons/sl";
import axios from '@/utils/axios';

interface Column {
  header: string;
  accessor: string;
  type?: 'berita' | 'pengaturan-akun';
}

export default function YatimDhuafa() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isRestore, setIsRestore] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRestore = async (id: number, type: 'berita' | 'pengaturan-akun') => {
    try {
      await axios.post(`/${type}/${id}/restore`);
      alert('Data restored successfully');
    } catch (error) {
      alert('Failed to restore data');
    }
  };


  const akunColumns: Column[] = [
    { header: 'No', accessor: 'nomor' },
    { header: 'First Name', accessor: 'firstname' },
    { header: 'Last Name', accessor: 'lastname' },
    { header: 'Email', accessor: 'email' },
    { header: 'Kontak', accessor: 'phone' },
    { header: 'Tanggal Lahir', accessor: 'birth' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Role', accessor: 'role' },
    { header: 'Tindakan', accessor: '', type: 'pengaturan-akun' },
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
              sx={{ backgroundColor: '#FFB80D', color: 'white', marginRight: '10px' }}
              startIcon={<SlActionUndo />}
              onClick={() => setIsRestore(!isRestore)}
            >
              {isRestore ? 'Cancel Restore' : 'Restore Data'}
            </Button>
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
            isRestore={isRestore} 
            onRestore={handleRestore}
          />
        </div>
        <ModalForm isOpen={isModalOpen} onClose={closeModal} onSuccess={(message: string) => toast.success(message)}/>
        <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} />
      </DefaultLaout>
    );
  };

  return <Akun />;
};
