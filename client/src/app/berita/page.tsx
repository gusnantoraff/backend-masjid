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
      <div>
        <ArticleForm />
      </div>
    </DefaultLayout>
  );
}
