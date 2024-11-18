"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditKegiatan from "@/components/EditModal/ModalAkun";
import React, { useState } from "react";
import DataTabel from "@/components/DataTable/DataTabel1";
import { useRouter } from "next/navigation";
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus} from 'react-icons/ai';

const AkunPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [refreshList, setRefreshList] = useState(false);
    const router = useRouter();

    const handleModalClose = () => {
        router.push(`/pengaturan-akun`);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
      };    

    const handleModalSubmit = () => {
        router.push(`/pengaturan-akun`);
        setRefreshList(prev => !prev);
        setIsModalOpen(false);
    };

    return (
        <DefaultLayout>
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
            <DataTabel
                refresh={refreshList}
                columns={[
                    { header: 'No', accessor: 'id' },
                    { header: 'First Name', accessor: 'firstname' },
                    { header: 'Last Name', accessor: 'lastname' },
                    { header: 'Email', accessor: 'email' },
                    { header: 'Kontak', accessor: 'phone' },
                    { header: 'Tanggal Lahir', accessor: 'birth' },
                    { header: 'Gender', accessor: 'gender' },
                    { header: 'Role', accessor: 'role' },
                    { header: 'Tindakan', accessor: '' },
                ]}
                fetchUrl="http://localhost:8000/api/users"
            />
            </div>
            {isModalOpen && (
                <EditKegiatan
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    id={id}
                />
            )}

        </DefaultLayout>
    );
};

export default AkunPage;
