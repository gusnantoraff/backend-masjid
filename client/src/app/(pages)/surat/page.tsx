"use client";

import ModalForm from "@/components/Modal/ModalSurat";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import ListSurat from "@/components/SuratComponents/ListSurat";

export default function Surat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false); // Tambahkan state untuk refresh

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    setRefresh(!refresh); // Refresh daftar surat
    closeModal();
  };

  return (
    <DefaultLayout>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#EDF1F8",
          color: "black",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "600", fontFamily: "Nunito Sans" }}
        >
          Surat Menyurat
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#14B8A6",
              color: "white",
              marginRight: "10px",
            }}
            startIcon={<AiOutlinePlus />}
            onClick={openModal}
          >
            Tambah Surat
          </Button>
        </Box>
      </Box>

      {/* List Surat */}
      <div style={{ marginTop: "20px" }}>
        <ListSurat refresh={refresh} />
      </div>

      {/* Modal Tambah Surat */}
      <ModalForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
    </DefaultLayout>
  );
}
