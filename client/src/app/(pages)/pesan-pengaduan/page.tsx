"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FaCommentDots, FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Box, Typography, Button, Modal } from "@mui/material"; 

const Pengaduan = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [namaPengirim, setNamaPengirim] = useState("");
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  
  // State for editing messages
  const [editMessageId, setEditMessageId] = useState<number | null>(null);

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/pesan-website");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleAddOrUpdateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      nama_pengirim: namaPengirim, 
      email: email, 
      pesan: newMessage,
      tanggal: tanggal,
    };

    try {
      const method = editMessageId ? "PUT" : "POST";
      const endpoint = editMessageId 
        ? `http://localhost:8000/api/pesan-website/${editMessageId}` 
        : "http://localhost:8000/api/pesan-website";
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Clear input fields
        setNamaPengirim("");
        setEmail("");
        setNewMessage("");
        setEditMessageId(null); // Reset edit state
        fetchMessages(); // Refresh the message list
      } else {
        console.error("Failed to add or update message");
      }
    } catch (error) {
      console.error("Error adding/updating message:", error);
    }

    setLoading(false);
  };

  const handleEditMessage = (message: any) => {
    setNamaPengirim(message.nama_pengirim);
    setEmail(message.email);
    setNewMessage(message.pesan);
    setTanggal(message.tanggal);
    setEditMessageId(message.id); // Set ID for editing
  };

  const handleDeleteMessage = async () => {
    if (messageToDelete === null) return;

    try {
      const response = await fetch(`http://localhost:8000/api/pesan-website/${messageToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchMessages(); // Refresh the message list after deletion
        setDeleteModalOpen(false); // Close the modal
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
          width: '100%'
        }}
      >
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ fontWeight: '600', fontFamily: 'Nunito Sans' }} 
        >
          Pesan & Pengaduan 
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#14B8A6', color: '#FFF', borderRadius: '5px' }}
            onClick={() => {
              setNamaPengirim("");
              setEmail("");
              setNewMessage("");
              setEditMessageId(null);
            }}
          >
            Tambah Pesan
          </Button>
        </Box>
      </Box>
      
      <div className="container mx-auto p-6">
        {/* Section 1: Daftar Pesan Website */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">
            <FaCommentDots className="inline-block mr-2" /> Daftar Pesan Website
          </h2>
          {messages.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Nama Pengirim</th>
                  <th className="border border-gray-300 p-2 text-left">Email</th>
                  <th className="border border-gray-300 p-2 text-left">Pesan</th>
                  <th className="border border-gray-300 p-2 text-left">Tanggal</th>
                  <th className="border border-gray-300 p-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message: any) => (
                  <tr key={message.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{message.nama_pengirim}</td>
                    <td className="border border-gray-300 p-2">{message.email}</td>
                    <td className="border border-gray-300 p-2">{message.pesan}</td>
                    <td className="border border-gray-300 p-2">{message.tanggal}</td>
                    <td className="border border-gray-300 p-2">
                      <Button 
                        onClick={() => handleEditMessage(message)}
                        variant="outlined" 
                        sx={{ marginRight: '4px' }}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        onClick={() => {
                          setMessageToDelete(message.id);
                          setDeleteModalOpen(true);
                        }}
                        variant="outlined" 
                        color="error"
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No messages available</p>
          )}
        </div>

        {/* Section 2: Tambah Pesan */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">
            <FaPlus className="inline-block mr-2" /> {editMessageId ? "Edit Pesan" : "Tambah Pesan"}
          </h2>
          <form onSubmit={handleAddOrUpdateMessage}>
            <input
              type="text"
              placeholder="Nama Pengirim"
              value={namaPengirim}
              onChange={(e) => setNamaPengirim(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Tulis pesan baru..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
            ></textarea>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              style={{ backgroundColor: '#14B8A6', color: '#FFF', padding: '10px 15px', borderRadius: '5px', border: 'none' }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Mengirim..." : editMessageId ? "Update Pesan" : "Kirim Pesan"}
            </button>
          </form>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <Box sx={{ padding: 2, borderRadius: 1, backgroundColor: 'white', maxWidth: 400, margin: 'auto', marginTop: '20vh' }}>
            <Typography variant="h6">Konfirmasi Hapus</Typography>
            <Typography>Apakah Anda yakin ingin menghapus pesan ini?</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button onClick={() => setDeleteModalOpen(false)}>Batal</Button>
              <Button color="error" onClick={handleDeleteMessage}>Hapus</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Pengaduan;
