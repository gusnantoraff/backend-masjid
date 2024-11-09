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
                    Detail Berita
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

            <Box sx={{ padding: "20px", margin: "0 auto" }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
                    {article?.judul}
                </Typography>

                {/* Foto Image */}
                {article?.foto && (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        maxWidth: "100%",
                        width: "100%",
                    }}>
                        <Image
                            src={`http://localhost:8000/storage/${article.foto}`}
                            alt={article?.judul}
                            width={500}
                            height={500}
                            layout="intrinsic"
                            style={{
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>
                )}

                {/* Article Content */}
                <div
                    dangerouslySetInnerHTML={{ __html: article?.konten || "" }}
                    style={{
                        marginBottom: "20px",
                    }}
                />

                <Box
                    sx={{
                        borderBottom: "2px solid #696969",
                        marginBottom: "20px"
                    }}
                />

                {/* Article Metadata */}
                <Box sx={{ marginBottom: "20px", padding: "20px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight="bold">Tanggal Publikasi</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="body1">: {article?.tanggal_publikasi}</Typography>
                        </Grid>
                        <Divider sx={{ width: "100%", marginY: "10px" }} />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight="bold">Kategori</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="body1">: {article?.kategori}</Typography>
                        </Grid>
                        <Divider sx={{ width: "100%", marginY: "10px" }} />
                        <Grid item xs={12} sm={4}>
                            <Typography variant="body1" fontWeight="bold">Status</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="body1">: {article?.status}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DefaultLayout>
    );
};

export default ArticleDetailPage;
