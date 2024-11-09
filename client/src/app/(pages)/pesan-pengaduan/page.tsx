"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DataTable from '@/components/DataTable/DataTabel2';  // Importing the reusable DataTable component
import { FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import { Box, Typography, Button } from "@mui/material";
import ModalForm from '@/components/Modal/ModalPengaduan';

const Pengaduan = () => {
  const [loading, setLoading] = useState(false);
  const [editMessageData, setEditMessageData] = useState<any>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddOrUpdateMessage = async (data: any) => {
    setLoading(true);
    const method = editMessageData ? "PUT" : "POST";
    const endpoint = editMessageData
      ? `http://localhost:8000/api/pesan-website/${editMessageData.id}`
      : "http://localhost:8000/api/pesan-website";

    try {
      await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setIsFormModalOpen(false);
      setEditMessageData(null);
      // Refresh messages after the action
    } catch (error) {
      console.error("Failed to submit message:", error);
    }
    setLoading(false);
  };

  const handleDeleteMessage = async () => {
    try {
      if (messageToDelete) {
        await fetch(`http://localhost:8000/api/pesan-website/${messageToDelete}`, { method: "DELETE" });
        setDeleteModalOpen(false);
        // Refresh messages after deletion
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const columns = [
    { header: 'Nama Pengirim', accessor: 'nama_pengirim' },
    { header: 'Email', accessor: 'email' },
    { header: 'Pesan', accessor: 'pesan' },
    { header: 'Tanggal', accessor: 'tanggal' },
    { header: 'Tindakan', accessor: '' },
  ];
   
  return (
    <DefaultLayout>
      {/* Box for Heading and Action Button */}
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
          Pesan & Pengaduan
        </Typography>
      </Box>
      
      {/* Data Table for Messages */}
      <DataTable 
        columns={columns} 
        fetchUrl="http://localhost:8000/api/pesan-website" // Provide the fetch URL directly
      />

      {/* Modal Form for Adding or Editing Messages */}
      <ModalForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleAddOrUpdateMessage}
        initialData={editMessageData}
        loading={loading}
      />
    </DefaultLayout>
  );
};

export default Pengaduan;
