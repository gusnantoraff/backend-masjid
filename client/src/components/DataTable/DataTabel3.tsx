"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import { BiTrash, BiEdit } from 'react-icons/bi';
import AlertConfirm from "../Alerts/AlertConfirm";
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineWhatsApp } from 'react-icons/ai';

interface Column {
    header: string;
    accessor: string;
}

interface DataTableProps {
    columns: Column[];
    fetchUrl: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, fetchUrl }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<any>(null);

    useEffect(() => {
        axios
            .get(fetchUrl)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [fetchUrl]);

    const handleDelete = async () => {
        if (selectedId !== null) {
            await fetch(`${fetchUrl}/${selectedId}`, {
                method: 'DELETE',
            });
            setData(data.filter((item) => item.id !== selectedId));
            setShowConfirm(false);
        }
    };

    const promptDelete = (id: any) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleEdit = (id: any) => {
        console.log('Edit data dengan ID:', id);

        // tambahin logika
    };

    const handleRead = (id: number) => {
        // Logika untuk menampilkan atau membaca detail berdasarkan ID
        console.log(`Reading entry with ID: ${id}`);
    };

    const handleWhatsApp = (id: number) => {
        const waLink = `https://wa.me/?text=Halo,: ${id}`;
        window.open(waLink, '_blank'); // Membuka WhatsApp di tab baru
      };

    const capitalizeFirstLetter = (value: any, accessor: string) => {
        if (typeof value === 'string' && accessor !== 'email') {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    };

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', border: '1px solid #E0E0E0', borderRadius: '10px' }}>
            {showConfirm && (
                <AlertConfirm
                    open={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                    message="Apakah Anda yakin ingin menghapus data ini?"
                />
            )}
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, idx) => (
                            <TableCell
                                key={idx}
                                sx={{
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                    padding: '16px',
                                }}
                            >
                                {capitalizeFirstLetter(column.header, column.accessor)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, idxData) => (
                        <TableRow key={idxData}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.accessor}
                                    sx={{
                                        padding: '10px',
                                        borderBottom: '1px solid #E0E0E0',
                                    }}
                                >
                                    {column.accessor ? capitalizeFirstLetter(row[column.accessor], column.accessor) : (
                                       <Box
                                       sx={{
                                           display: 'flex',
                                           gap: 0, // Menambah jarak antar tombol
                                           flexWrap: 'wrap', // Membungkus tombol jika ukuran layar kecil
                                       }}
                                   >
                                       <Button
                                           variant="contained"
                                           color="error"
                                           sx={{
                                               padding: '4px 8px',
                                               minWidth: 'auto', // Memastikan tombol tidak terlalu lebar
                                               fontSize: '0.7rem',
                                           }}
                                           startIcon={<BiTrash />}
                                           onClick={() => promptDelete(row.id)}
                                       >
                                           Hapus
                                       </Button>
                                       <Button
                                           variant="contained"
                                           sx={{
                                               backgroundColor: '#14B8A6',
                                               color: 'white',
                                               marginLeft: '8px',
                                               padding: '4px 8px',
                                               minWidth: 'auto',
                                               fontSize: '0.7rem',
                                           }}
                                           startIcon={<BiEdit />}
                                           onClick={() => handleEdit(row.id)}
                                       >
                                           Edit
                                       </Button>
                                       <Button
                                           variant="contained"
                                           sx={{
                                               backgroundColor: '#2379DC',
                                               color: 'white',
                                               marginLeft: '8px',
                                               padding: '4px 8px',
                                               minWidth: 'auto',
                                               fontSize: '0.7rem',
                                           }}
                                           startIcon={<AiOutlineEye />}
                                           onClick={() => handleRead(row.id)}
                                       >
                                           Detail
                                       </Button>
                                       <Button
                                           variant="contained"
                                           sx={{
                                               backgroundColor: '#25D366',
                                               color: 'white',
                                               marginLeft: '8px',
                                               padding: '4px 8px',
                                               minWidth: 'auto',
                                               fontSize: '0.7rem',
                                           }}
                                           startIcon={<AiOutlineWhatsApp />}
                                           onClick={() => handleWhatsApp(row.id)}
                                       >
                                           WA
                                       </Button>
                                   </Box>
                                   
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default DataTable;
