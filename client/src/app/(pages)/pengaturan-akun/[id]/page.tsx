"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Divider, Avatar } from "@mui/material";
import { SlActionUndo } from "react-icons/sl";

interface Akun {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birth: string;
  password: string;
  password_confirmation: string;
  gender: string;
  role: string;
  avatar: string | null;
}

const Akun = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [akun, setPesan] = useState<Akun | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          notFound();
        }
        setPesan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load message.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Typography variant="h6" sx={{ padding: "20px" }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" sx={{ padding: "20px" }}>{error}</Typography>;
  }

  // Construct the avatar image URL or fallback to a default one
  const avatarUrl = akun?.avatar
    ? `http://localhost:8000/storage/${akun.avatar}`
    : "/images/user/user.png"; // Fallback image if no avatar

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
          Detail
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          startIcon={<SlActionUndo />}
        >
          Kembali
        </Button>
      </Box>

      {/* Horizontal Divider */}
      <Box
        sx={{
          borderBottom: "2px solid #e0e0e0",
          marginBottom: "20px"
        }}
      />

      {/* Sender Details Container */}
      <Box sx={{
        marginBottom: "20px",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e5e5e5",
        backgroundColor: "#f7f7f7",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)"
      }}>
        {/* Avatar Display */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 100, height: 100 }}
            alt="Profile Picture"
            src={avatarUrl} // Avatar URL
          />
        </Box>

        <Grid container spacing={2}>
          {/* Nama Pengirim */}
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Firstname</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.firstname}</Typography>
          </Grid>

          <Divider sx={{ width: "100%", marginY: "10px", backgroundColor: "#e0e0e0" }} />

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Lastname</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.lastname}</Typography>
          </Grid>

          <Divider sx={{ width: "100%", marginY: "10px", backgroundColor: "#e0e0e0" }} />

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Email</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.email}</Typography>
          </Grid>

          <Divider sx={{ width: "100%", marginY: "10px", backgroundColor: "#e0e0e0" }} />

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Kontak</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.phone}</Typography>
          </Grid>

          <Divider sx={{ width: "100%", marginY: "10px", backgroundColor: "#e0e0e0" }} />

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Gender</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.gender}</Typography>
          </Grid>

          <Divider sx={{ width: "100%", marginY: "10px", backgroundColor: "#e0e0e0" }} />

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" fontWeight="bold" color="#333">Role</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" color="#4a4a4a">: {akun?.role}</Typography>
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  );
};

export default Akun;
