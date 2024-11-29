"use client";

import ModalForm from "@/components/Modal/ModalSurat";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

export default function Surat() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    closeModal(); 
  };

  return (
    <DefaultLayout>
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

      <div style={{ marginTop: "20px" }}></div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
    </DefaultLayout>
  );
}
