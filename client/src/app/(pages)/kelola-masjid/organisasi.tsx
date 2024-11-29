"use client";

import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import fetchWithAuth from "@/utils/fetch";
import axios from "@/utils/axios";
import { SlActionUndo } from "react-icons/sl";
import { Checkbox } from "@mui/material";

const StrukturOrganisasiMasjid = () => {
  const [struktur, setStruktur] = useState([]);
  const [newStruktur, setNewStruktur] = useState([]);
  const [newJabatan, setNewJabatan] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newKontak, setNewKontak] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isRestore, setIsRestore] = useState(false);

  useEffect(() => {
    fetchStrukturOrganisasi();
  }, []);

  const fetchStrukturOrganisasi = async () => {
    try {
      const data = await fetchWithAuth(
        "http://localhost:8000/api/struktur-organisasi"
      );
      setStruktur(data);
      setNewStruktur(data);
    } catch (error) {
      console.error("Error fetching struktur organisasi:", error);
    }
  };

  const addStruktur = async () => {
    if (!newJabatan || !newNama) {
      setErrorMessage("Jabatan and Nama are required fields.");
      return;
    }

    const newEntry = {
      info_masjid_id: 1,
      jabatan: newJabatan,
      nama: newNama,
      kontak: newKontak,
    };

    try {
      const data = await fetchWithAuth(
        "http://localhost:8000/api/struktur-organisasi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        }
      );

      const { id, ...strukturData } = data.strukturOrganisasi;
      setStruktur([...struktur, { id: id, ...strukturData }]);
      setNewStruktur([...newStruktur, { id: id, ...strukturData }]);
      setNewJabatan("");
      setNewNama("");
      setNewKontak("");
      setIsModalOpen(false);
      setErrorMessage("");
      setSuccessMessage("Data berhasil ditambahkan.");
    } catch (error) {
      console.error("Error adding struktur organisasi:", error);
      setErrorMessage("Error adding data. Please try again.");
    }
  };

  const updateStruktur = async (id) => {
    const updatedEntry = newStruktur.find((item) => item.id === id);
    try {
      const updatedData = await fetchWithAuth(
        `http://localhost:8000/api/struktur-organisasi/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEntry),
        }
      );

      setStruktur(
        struktur.map((item) =>
          item.id === id ? updatedData.strukturOrganisasi : item
        )
      );
      setIsEditing(null);
      setSuccessMessage("Data berhasil diperbarui.");
    } catch (error) {
      console.error("Error updating struktur organisasi:", error);
      setErrorMessage("Error updating data. Please try again.");
    }
  };

  const handleEditChange = (id, field, value) => {
    setNewStruktur((prevStruktur) =>
      prevStruktur.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteStruktur = async (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/struktur-organisasi/${deleteItemId}`
      );

      const updatedStruktur = newStruktur.filter(
        (item) => item.id !== deleteItemId
      );
      setNewStruktur(updatedStruktur);
      setStruktur(updatedStruktur);
      setSuccessMessage("Data berhasil dihapus.");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting struktur organisasi:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const closeAlert = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleRestore = async (id) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8000/api/fasilitas/${id}/restore`,
        {
          method: "POST",
        }
      );

      if (response.success) {
        // Memperbarui data lokal untuk merefleksikan data yang dipulihkan
        const restoredItem = response.data; // Data dari server
        setStruktur((prevStruktur) => [...prevStruktur, restoredItem]);
        setSuccessMessage("Data berhasil dipulihkan.");
      } else {
        setErrorMessage("Gagal memulihkan data.");
      }
    } catch (error) {
      console.error("Error restoring data:", error);
      setErrorMessage("Terjadi kesalahan saat memulihkan data.");
    }
  };


  return (
    <div className="border-grey-500 mb-4 mt-4 rounded-lg border p-4 shadow-md dark:border-gray-dark dark:bg-gray-dark">
      <div className="mb-4 flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">
          Struktur Organisasi Masjid
        </h1>
        <div className="items-right">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFB80D",
              color: "white",
              marginRight: "10px",
            }}
            startIcon={<SlActionUndo />}
            onClick={() => setIsRestore(!isRestore)}
          >
            {isRestore ? "Cancel Restore" : "Restore Data"}
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: "#14B8A6",
              color: "white",
              marginRight: "10px",
            }}
            startIcon={<AiOutlinePlus />}
          >
            Tambah Data
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-red-500 p-4 text-white">
          {errorMessage}
          <button
            onClick={closeAlert}
            className="text-white hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-green-500 p-4 text-white">
          {successMessage}
          <button
            onClick={closeAlert}
            className="text-white hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
      )}
            {successMessage && (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-green-500 p-4 text-white">
                    {successMessage}
                    <button
                        onClick={closeAlert}
                        className="text-white hover:text-gray-300"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            <table className="border-grey-200 min-w-full border bg-white dark:bg-dark-2 dark:text-slate-200">
                <thead>
                    <tr>
                        <th className="border-b dark:border-gray-dark px-4 py-2 text-left">No</th>
                        <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Jabatan</th>
                        <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Nama</th>
                        <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Kontak</th>
                        <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {newStruktur.map((item, index) => (
                        <tr key={item.id}className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } dark:bg-dark-3 dark:odd:bg-dark-2`}>
                            <td className="border-b dark:border-gray-dark px-4 py-2">{index + 1}</td>
                            <td className="border-b dark:border-gray-dark px-4 py-2">
                                {isEditing === item.id ? (
                                    <input
                                        type="text"
                                        value={item.jabatan}
                                        onChange={(e) =>
                                            handleEditChange(
                                                item.id,
                                                "jabatan",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border px-2 py-1"
                                    />
                                ) : (
                                    item.jabatan
                                )}
                            </td>
                            <td className="border-b dark:border-gray-dark px-4 py-2">
                                {isEditing === item.id ? (
                                    <input
                                        type="text"
                                        value={item.nama}
                                        onChange={(e) =>
                                            handleEditChange(
                                                item.id,
                                                "nama",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border px-2 py-1"
                                    />
                                ) : (
                                    item.nama
                                )}
                            </td>
                            <td className="border-b dark:border-gray-dark px-4 py-2">
                                {isEditing === item.id ? (
                                    <input
                                        type="text"
                                        value={item.kontak}
                                        onChange={(e) =>
                                            handleEditChange(
                                                item.id,
                                                "kontak",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border px-2 py-1"
                                    />
                                ) : (
                                    item.kontak
                                )}
                            </td>
                            <td className="border-b px-4 py-2 dark:border-gray-dark">
                                <div className="flex space-x-2">
                                    {isRestore ? (
                                        // Saat dalam mode restore, hanya tampilkan checkbox
                                        <Checkbox
                                            checked={
                                                struktur[index]?.isChecked ||
                                                false
                                            }
                                            onChange={() =>
                                                handleRestore(item.id)
                                            }
                                            inputProps={{
                                                "aria-label":
                                                    "Restore Checkbox",
                                            }}
                                        />
                                    ) : (
                                        // Saat tidak dalam mode restore, tampilkan tombol aksi
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleEditChange(index)
                                                }
                                                className="text-yellow-500"
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteStruktur(item.id)
                                                }
                                                className="text-red-500"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
                        <h2 className="mb-4 text-xl font-bold">
                            Tambah Struktur
                        </h2>
                        <input
                            type="text"
                            placeholder="Jabatan"
                            value={newJabatan}
                            onChange={(e) => setNewJabatan(e.target.value)}
                            className="mb-4 w-full rounded-md border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nama"
                            value={newNama}
                            onChange={(e) => setNewNama(e.target.value)}
                            className="mb-4 w-full rounded-md border p-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Kontak"
                            value={newKontak}
                            onChange={(e) => setNewKontak(e.target.value)}
                            className="mb-4 w-full rounded-md border p-2"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                            >
                                Batal
                            </button>
                            <button
                                onClick={addStruktur}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                            >
                                Tambah
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && ( // Tampilkan modal konfirmasi hapus
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
                        <h2 className="mb-4 text-xl font-bold">
                            Konfirmasi Penghapusan
                        </h2>
                        <p>Apakah Anda yakin ingin menghapus data ini?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
                )};
            </div> )}
            
        

export default StrukturOrganisasiMasjid;
