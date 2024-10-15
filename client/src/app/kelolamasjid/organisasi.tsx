import React from 'react';
import DataTable from '@/components/DataTable';
import { Button, Box, Typography } from '@mui/material';
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
      "SIstem Manajemen Masjid",
    description: "This is Next.js Home page for NextAdmin Dashboard Kit",
  };

export default function StrukturOrganisasi() {

  const organisasiColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Jabatan', accessor: 'jabatan' },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Kontak', accessor: 'kontak' },
    { header: 'Tindakan', accessor: '' },
  ];

  const fetchUrl = 'http://localhost:8000/api/jamaah';

  const StrukturOrganisasi = () => {
    return (
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
          Struktur Organisasi
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#14B8A6', color: 'white', marginRight: '10px' }} 
            startIcon={<AiOutlinePlus />}
          >
            Tambah Data
          </Button>
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<AiOutlineUpload />}
          >
            Import Data
          </Button>
        </Box>
      </Box>
          <DataTable columns={organisasiColumns} fetchUrl={fetchUrl} />
        </div>
    );
  };

  return <StrukturOrganisasi />;
};
