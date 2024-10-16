"use client";

import { Box, Button, TextField, MenuItem, Avatar, Typography } from "@mui/material";
import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "Bonang",
    lastName: "Panji Nur",
    email: "bonang@gmail.com",
    phone: "546-933-2772",
    birthDate: "11-08-1995", // Adjusted format
    gender: "Male",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box
      sx={{
        maxWidth: "full",
        margin: "0 auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      {/* Avatar and Edit Photo */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src="/profile-pic.jpg"
        />
      </Box>
      <Typography
        sx={{
          color: "#007bff",
          cursor: "pointer",
          marginBottom: "30px",
        }}
        onClick={() => alert("Edit Photo Clicked!")}
      >
        Edit Photo
      </Typography>

      {/* Form Fields */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px", // Adjusted to match spacing
          mb: 5,
        }}
      >
        <TextField
          label="Nama Depan"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Nama Belakang"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Nomor Hp"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Tanggal Lahir"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          fullWidth
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
          placeholder="dd-mm-yyyy" // Ensure correct placeholder
        />
        <TextField
          label="Jenis Kelamin"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          select
          InputProps={{ sx: { backgroundColor: "#f6f8fc" } }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
      </Box>

      {/* Update Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#d50000",
          color: "white",
          width: "20%",
          padding: "10px 0",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Box>
  );
}
