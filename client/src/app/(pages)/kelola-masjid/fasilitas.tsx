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

export default function FasilitasMasjid() {

  const fasilitasColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nama Fasilitas', accessor: 'nama_fasilitas' },
    { header: 'Deskripsi', accessor: 'deskripsi' },
    { header: 'Tindakan', accessor: '' },
  ];

  const fetchUrl = 'http://localhost:8000/api/fasilitas';

  const FasilitasMasjid = () => {
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
          Fasilitas
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
          <DataTable columns={fasilitasColumns} fetchUrl={fetchUrl} />
        </div>
    );
  };

  return <FasilitasMasjid />;
};
