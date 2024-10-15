"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import {Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Box} from '@mui/material';
import ButtonDefault from "@/components/Buttons/ButtonDefault";


const KelolaMasjid = () => {
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
      <h1 className="text-l font-bold">Kelola Masjid</h1>
      <ButtonDefault 
                    link=""
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Edit"></ButtonDefault>
      </Box>
      <div>
  <TableContainer
  component={Paper}
  variant="outlined"
>
  <Table aria-label="demo table">
    <TableHead>
      <TableRow>
        <TableCell><h6 className="text-l font-bold">Nama Masjid</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Logo Masjid</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Foto Masjid</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Tahun Berdiri</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Jumlah Muadzin</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Jumlah Jemaah</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Jumlah Khatib</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Jumlah Remaja</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Alamat</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">RT</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">RW</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Kecamatan</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Kelurahan</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Kabupaten</h6></TableCell>
        <TableCell><h6 className="text-l font-bold">Provinsi</h6></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Masjid An-nasr</TableCell>
        <TableCell>Img.jpg</TableCell>
        <TableCell>Img.jpg</TableCell>
      </TableRow>
    </TableBody>
    </Table>
    </TableContainer>
    </div>
    <div className="mt-4">
    <TableContainer
  component={Paper}
  variant="outlined"
>
    <Table aria-label="demo table">
    <TableHead>
      <TableRow>
        
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Jl. Jalan</TableCell>
        <TableCell>007</TableCell>
        <TableCell>007</TableCell>
        <TableCell>Jebres</TableCell>
        <TableCell>Jebres</TableCell>
        <TableCell>Surakarta</TableCell>
        <TableCell>Aceh Darussalam</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</div>
    <div className="mt-4">
    <TableContainer
  component={Paper}
  variant="outlined"
>
    <Table aria-label="demo table">
    <TableHead>
      <TableRow>
        
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Jl. Jalan</TableCell>
        <TableCell>007</TableCell>
        <TableCell>007</TableCell>
        <TableCell>Jebres</TableCell>
        <TableCell>Jebres</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</div>
</div>
</DefaultLayout>
);
};

export default KelolaMasjid;