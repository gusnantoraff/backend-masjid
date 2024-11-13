"use client";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const MubalighMasjid = () => {
  const [mubalighData, setMubalighData] = useState([]);
  const [formData, setFormData] = useState({
    namaMubaligh: "",
    kontakMubaligh: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // New state for delete confirmation modal
  const [deleteId, setDeleteId] = useState(null); // ID of the item to delete

  useEffect(() => {
    fetchMubalighData();
  }, []);

  const fetchMubalighData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/mubaligh");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMubalighData(data);
    } catch (error) {
      console.error("Error fetching mubaligh data:", error);
      setErrorMessage("Gagal mengambil data dari server.");
      setShowAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({ namaMubaligh: "", kontakMubaligh: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const addMubaligh = async () => {
    if (!formData.namaMubaligh || !formData.kontakMubaligh) {
      setErrorMessage("Semua field wajib diisi.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/mubaligh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.namaMubaligh,
          kontak: formData.kontakMubaligh,
          info_masjid_id: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add mubaligh data");
      }

      const newMubaligh = await response.json();
      setMubalighData((prevData) => [...prevData, newMubaligh]);
      setFormData({ namaMubaligh: "", kontakMubaligh: "" });
      setIsModalOpen(false);
      setSuccessMessage("Data mubaligh berhasil ditambahkan.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding mubaligh data:", error);
      setErrorMessage("Terjadi kesalahan saat menambahkan data.");
      setShowAlert(true);
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setFormData({
      namaMubaligh: mubalighData[index].nama,
      kontakMubaligh: mubalighData[index].kontak,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const updateMubaligh = async () => {
    const updatedMubaligh = {
      ...mubalighData[editIndex],
      nama: formData.namaMubaligh,
      kontak: formData.kontakMubaligh,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/mubaligh/${updatedMubaligh.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMubaligh),
      });

      if (!response.ok) {
        throw new Error("Failed to update mubaligh data");
      }

      setMubalighData((prevData) =>
        prevData.map((item, i) => (i === editIndex ? updatedMubaligh : item))
      );
      setIsEditing(false);
      setEditIndex(null);
      setIsModalOpen(false);
      setSuccessMessage("Data mubaligh berhasil diperbarui.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating mubaligh data:", error);
      setErrorMessage("Terjadi kesalahan saat memperbarui data.");
      setShowAlert(true);
    }
  };

  const showDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/mubaligh/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete mubaligh data");
      }

      setMubalighData((prevData) => prevData.filter((item) => item.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
      setSuccessMessage("Data mubaligh berhasil dihapus.");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting mubaligh data:", error);
      setErrorMessage("Terjadi kesalahan saat menghapus data.");
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setShowAlert(false);
  };

  return (
    <div className="border-grey-500 mb-4 mt-4 rounded-lg border p-4 shadow-1">
      <div className="mb-4 flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Mubaligh Masjid</h1>
        <ButtonDefault
          customClasses="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center ml-2"
          label="Tambah"
          onClick={toggleModal}
        />
      </div>

      {showAlert && (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-green-500 p-4 text-white">
          {errorMessage || successMessage}
          <button onClick={closeAlert} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
      )}

      <table className="border-grey-200 min-w-full border bg-white dark:bg-dark-2 dark:text-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">No</th>
            <th className="border-b px-4 py-2">Nama Mubaligh</th>
            <th className="border-b px-4 py-2">Kontak</th>
            <th className="border-b px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mubalighData.map((item, index) => (
            <tr key={item.id}>
              <td className="border-b px-4 py-2">{index + 1}</td>
              <td className="border-b px-4 py-2">{item.nama}</td>
              <td className="border-b px-4 py-2">{item.kontak}</td>
              <td className="border-b px-4 py-2">
                <div className="flex space-x-2">
                  <button onClick={() => handleEditClick(index)} className="text-yellow-500">
                    <FaEdit />
                  </button>
                  <button onClick={() => showDeleteConfirmation(item.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <h2 className="mb-4 text-xl font-bold">{isEditing ? "Edit Mubaligh" : "Tambah Mubaligh"}</h2>
            <input
              type="text"
              name="namaMubaligh"
              placeholder="Nama Mubaligh"
              value={formData.namaMubaligh}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <input
              type="text"
              name="kontakMubaligh"
              placeholder="Kontak Mubaligh"
              value={formData.kontakMubaligh}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <div className="flex justify-end space-x-2">
              <button onClick={toggleModal} className="rounded-lg bg-gray-500 px-4 py-2 text-white">
                 Batal
              </button>
              <button
                onClick={isEditing ? updateMubaligh : addMubaligh}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
                 {isEditing ? "Simpan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <h2 className="mb-4 text-xl font-bold">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="rounded-lg bg-gray-500 px-4 py-2 text-white">
                 Batal
              </button>
              <button onClick={confirmDelete} className="rounded-lg bg-red-500 px-4 py-2 text-white">
                 Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MubalighMasjid;
