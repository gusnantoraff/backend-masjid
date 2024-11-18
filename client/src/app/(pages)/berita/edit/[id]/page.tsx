"use client"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Typography, Button, Box, Grid, Divider } from "@mui/material";
import { SlActionUndo } from "react-icons/sl";
import Image from "next/image";

interface Article {
    judul: string;
    konten: string;
    tanggal_publikasi: string;
    kategori: string;
    status: string;
    foto: string;
}

const ArticleDetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/berita/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (!data) {
                    notFound();
                }
                setArticle(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load article.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Typography variant="h6" sx={{ padding: "20px" }}>Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" sx={{ padding: "20px" }}>{error}</Typography>;
    }

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
                    Edit Berita
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
        </DefaultLayout>
    );
};

export default ArticleDetailPage;
