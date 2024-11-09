"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";  // Impor useState
import { Box, Typography, Button } from "@mui/material";  // Importing MUI components
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';  

export default function Surat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: '600', fontFamily: 'Nunito Sans' }}
        >
          Daftar Surat
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#14B8A6', color: 'white', marginRight: '10px' }}
            startIcon={<AiOutlinePlus />}
            onClick={openModal}  // Fungsi untuk membuka modal
          >
            Tambah Surat
          </Button>
        </Box>
      </Box>

      {/* Modal untuk tambah surat */}
      {isModalOpen && (
        <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: 3 }}>
          <Typography variant="h6">Tambah Surat</Typography>
          {/* Form atau konten modal bisa ditambahkan di sini */}
          <Button
            onClick={closeModal}  // Fungsi untuk menutup modal
            sx={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
            startIcon={<AiOutlineClose />}
          >
            Tutup
          </Button>
        </Box>
      )}
    </DefaultLayout>
  );
}
