import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { BiTrash, BiEdit } from "react-icons/bi";
import AlertConfirm from "../Alerts/AlertConfirm";
import { AiOutlineEye, AiOutlineWhatsApp } from "react-icons/ai";

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data?: any[];
  fetchUrl?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, fetchUrl }) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);

  // Fetch data if 'data' is not passed from parent and 'fetchUrl' is provided
  useEffect(() => {
    if (!data && fetchUrl) {
      axios
        .get(fetchUrl)
        .then((response) => {
          setFetchedData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setFetchedData(data || []);
      setLoading(false);
    }
  }, [fetchUrl, data]);

  const handleDelete = async () => {
    if (selectedId !== null) {
      await fetch(`${fetchUrl}/${selectedId}`, {
        method: "DELETE",
      });
      setFetchedData(fetchedData.filter((item) => item.id !== selectedId));
      setShowConfirm(false);
    }
  };

  const promptDelete = (id: any) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleEdit = (id: any) => {
    console.log("Edit data dengan ID:", id);
  };

  const handleRead = (id: number) => {
    console.log(`Reading entry with ID: ${id}`);
  };

  const handleWhatsApp = (id: number) => {
    const jamaah = fetchedData.find((j) => j.id === id);

    if (!jamaah || !jamaah.kontak) {
      console.error("Jamaah atau nomor kontak tidak ditemukan");
      return;
    }

    const formatKontak = (kontak: any) => {
      if (kontak.startsWith("0")) {
        return "62" + kontak.slice(1);
      }
      return kontak;
    };

    const waLink = `https://wa.me/${formatKontak(jamaah.kontak)}?text=Halo jamaah Al-Huda, ${jamaah.nama} Apa kabar`;

    window.open(waLink, "_blank");
  };

  const capitalizeFirstLetter = (value: any, accessor: string) => {
    if (typeof value === "string" && accessor !== "email") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  const truncateContent = (content: string, limit: number = 20) => {
    const text = content
    .replace(/&nbsp;/g, ' ')
    .replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

if (loading) {
    return <p>Loading data...</p>;
}

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  const rowsToRender = data || fetchedData;

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        border: "1px solid #E0E0E0",
        borderRadius: "10px",
      }}
    >
      {showConfirm && (
        <AlertConfirm
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          message="Apakah Anda yakin ingin menghapus data ini?"
        />
      )}
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {columns.map((column, idx) => (
              <TableCell
                key={idx}
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  padding: "16px",
                }}
              >
                {capitalizeFirstLetter(column.header, column.accessor)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToRender.map((row, idxData) => (
            <TableRow key={idxData}>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  sx={{
                    padding: "7px",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  {column.accessor === 'nomor'
                                        ? idxData + 1
                                        : column.accessor === 'konten' || column.accessor === 'judul'
                                        ? truncateContent(row[column.accessor])
                                        : capitalizeFirstLetter(row[column.accessor], column.accessor)
                                    }
                                    {column.accessor === '' && (
                    <Box sx={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ padding: "4px 6px", minWidth: "auto", fontSize: "0.7rem" }}
                        startIcon={<BiTrash />}
                        onClick={() => promptDelete(row.id)}
                      >
                        Hapus
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#14B8A6",
                          color: "white",
                          marginLeft: "6px",
                          padding: "4px 7px",
                          minWidth: "auto",
                          fontSize: "0.7rem",
                        }}
                        startIcon={<BiEdit />}
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#2379DC",
                          color: "white",
                          marginLeft: "8px",
                          padding: "4px 6px",
                          minWidth: "auto",
                          fontSize: "0.7rem",
                        }}
                        startIcon={<AiOutlineEye />}
                        onClick={() => handleRead(row.id)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#25D366",
                          color: "white",
                          marginLeft: "8px",
                          padding: "4px 6px",
                          minWidth: "auto",
                          fontSize: "0.7rem",
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
