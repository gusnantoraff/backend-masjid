"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Box, Typography } from "@mui/material";
import JadwalSholat2 from '@/components/LandingPage/JadwalSholat2';

const JadwalSholatt = () => {
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
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: '600', fontFamily: 'Nunito Sans' }}
                >
                    Jadwal Sholat
                </Typography>
            </Box>
            <Box marginTop="20px">
                <JadwalSholat2 />
            </Box>
        </DefaultLayout>
    );
};

export default JadwalSholatt;
