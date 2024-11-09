"use client";
import ArticleForm from '@/components/Berita';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import DataTable from '@/components/DataTable/DataTabel1';

export default function Artikel() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [reloadData, setReloadData] = useState(false);


  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleTambahBerita = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    setReloadData(prev => !prev);
    setIsFormVisible(false);
  };

  const beritaColumns = [
    { header: 'No', accessor: 'nomor' },
    { header: 'Judul', accessor: 'judul' },
    { header: 'Tanggal Publikasi', accessor: 'tanggal_publikasi' },
    { header: 'Kategori', accessor: 'kategori' },
    { header: 'Konten', accessor: 'konten' },
    { header: 'Status', accessor: 'status' },
    { header: 'Tindakan', accessor: '' }
  ];

  const fetchUrl = 'http://localhost:8000/api/berita';

  return (
    <DefaultLayout>
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
          Berita / Artikel
        </Typography>
        <Box>
          {isFormVisible ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#d50000', color: 'white', marginRight: '10px' }}
              startIcon={<AiOutlineClose />}
              onClick={handleCancel}
            >
              Batal
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '10px' }}
              startIcon={<AiOutlinePlus />}
              onClick={handleTambahBerita}
            >
              Tambah Berita
            </Button>
          )}
        </Box>
      </Box>
      <div
         style={{
          ...styles.formContainer,
          ...(isFormVisible ? styles.formShow : styles.formHidden)
        }}
      >
        {isFormVisible && (
          <div>
            <ArticleForm onSubmit={handleFormSubmit} />
          </div>
        )}
        </div>
        
      <div style={{ marginTop: '20px' }}>
        <DataTable columns={beritaColumns} fetchUrl={fetchUrl} reloadData={reloadData} />
      </div>
    </DefaultLayout>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    transition: 'transform 0.5s',
  },
  formShow: {
    transform: 'translateY(0)',
    transitionTimingFunction: 'ease-in', 
  },
  formHidden: {
    transform: 'translateY(-100%)',
    transitionTimingFunction: 'ease-out',
  }
};