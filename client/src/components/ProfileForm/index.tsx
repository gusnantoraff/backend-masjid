"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Button, TextField, MenuItem, Avatar, Typography } from "@mui/material";
import { useUser } from "@/context/UserContext";

export default function ProfileForm() {
  const { user, fetchUser } = useUser();
  const userImage = user?.avatar
    ? `http://localhost:8000/storage/${user.avatar}`
    : "/images/user/user.png";

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birth: "",
    gender: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        birth: user.birth ? user.birth.slice(0, 10) : "",
        gender: user.gender || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files && files.length > 0) {
      setSelectedFile(files[0]);
      await handleAvatarUpload(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      await fetchUser();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(`http://localhost:8000/api/users/${user?.id}/avatar`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Profile Picture"
          src={userImage}
        />
      </Box>

      {isEditing && (
        <>
          <Typography
            sx={{
              color: "#007bff",
              cursor: "pointer",
              marginBottom: "30px",
            }}
            onClick={handleEditPhotoClick}
          >
            Edit Photo
          </Typography>

          <input
            type="file"
            name="avatar"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          mb: 5,
        }}
      >
        <TextField
          label="Nama Depan"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Nama Belakang"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Nomor HP"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc" } }}
        />
        <TextField
          label="Tanggal Lahir"
          name="birth"
          type="date"
          value={formData.birth}
          onChange={handleChange}
          fullWidth
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc" } }}
        />

        <TextField
          label="Jenis Kelamin"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          select
          InputProps={{ readOnly: !isEditing, sx: { backgroundColor: "#f6f8fc", textAlign: "left" } }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>
      </Box>

      <Button
        variant="contained"
        color={isEditing ? "error" : "primary"}
        onClick={isEditing ? handleSubmit : handleEditToggle}
      >
        {isEditing ? "Submit" : "Update"}
      </Button>
    </Box>
  );
}
