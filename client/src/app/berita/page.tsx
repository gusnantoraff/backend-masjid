"use client";
import ArticleForm from '../../components/Berita';
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import React from "react";
import { Box, Typography, Button } from "@mui/material";  // Importing MUI components
import { AiOutlineClose } from 'react-icons/ai';  // Importing a close icon

export default function Artikel() {
  // Add the function that will handle the "cancel" action
  const handleCancel = () => {
    console.log("Cancel button clicked");
    // Add logic to handle modal close or form cancel action here
  };

  return (
    <DefaultLayout>
      {/* Box component placed above the ArticleForm */}
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
          {/* "X Batal" button */}
          <Button
            variant="contained"
            sx={{ backgroundColor: '#d50000', color: 'white' }}  // Red button
            startIcon={<AiOutlineClose />}  // Icon for "X"
            onClick={handleCancel}  // Attach the cancel action here
          >
            Batal
          </Button>
        </Box>
      </Box>

      {/* ArticleForm component */}
      <div>
        <ArticleForm />
      </div>
    </DefaultLayout>
  );
}
