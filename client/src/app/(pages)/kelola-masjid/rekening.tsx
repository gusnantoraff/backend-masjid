"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '@mui/material/Button';
import fetchWithAuth from "@/utils/fetch";

const RekeningMasjid = () => {
  const [rekeningData, setRekeningData] = useState([]);
  const [newNamaBank, setNewNamaBank] = useState('');
  const [newNomorRekening, setNewNomorRekening] = useState('');
  const [newAtasNama, setNewAtasNama] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchRekeningMasjid();
  }, []);

  const fetchRekeningMasjid = async () => {
    try {
      const data = await fetchWithAuth('http://localhost:8000/api/rekening-bank');
      setRekeningData(data);
    } catch (error) {
      console.error('Error fetching rekening masjid:', error);
      setErrorMessage('Terjadi kesalahan dalam mengambil data.');
      setShowAlert(true);
    }
  };

  const addRekening = async () => {
    if (!newNamaBank || !newNomorRekening || !newAtasNama) {
      setErrorMessage('Nama Bank, Nomor Rekening, dan Atas Nama wajib diisi.');
      setShowAlert(true);
      return;
    }

    const newRekening = {
      namaBank: newNamaBank,
      nomorRekening: newNomorRekening,
      atasNama: newAtasNama,
      info_masjid_id: 1, // Assuming Masjid ID is fixed as 1
    };

    try {
      const data = await fetchWithAuth('http://localhost:8000/api/rekening-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRekening),
      });
      setRekeningData([...rekeningData, data.rekeningBank]);
      setNewNamaBank('');
      setNewNomorRekening('');
      setNewAtasNama('');
      setIsModalOpen(false);
      setShowAlert(false);
      setSuccessMessage('Data berhasil ditambahkan.');
    } catch (error) {
      console.error('Error adding rekening:', error);
      setErrorMessage('Terjadi kesalahan saat menambahkan data.');
      setShowAlert(true);
    }
  };

  const updateRekening = async () => {
    const updatedRekening = { ...rekeningData[editIndex], namaBank: newNamaBank, nomorRekening: newNomorRekening, atasNama: newAtasNama };

    try {
      const data = await fetchWithAuth(`http://localhost:8000/api/rekening-bank/${updatedRekening.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRekening),
      });
      const updatedRekeningData = [...rekeningData];
      updatedRekeningData[editIndex] = data.rekeningBank;
      setRekeningData(updatedRekeningData);
      setIsEditMode(false);
      setEditIndex(null);
      setShowAlert(false);
      setSuccessMessage('Data berhasil diperbarui.');
    } catch (error) {
      console.error('Error updating rekening:', error);
      setErrorMessage('Terjadi kesalahan saat memperbarui data.');
      setShowAlert(true);
    }
  };

  const deleteRekening = async (id) => {
    setDeleteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchWithAuth(`http://localhost:8000/api/rekening-bank/${deleteId}`, {
        method: 'DELETE',
      });

      setRekeningData(rekeningData.filter((item) => item.id !== deleteId));
      setShowAlert(false);
      setSuccessMessage('Data berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting rekening:', error);
      setErrorMessage('Terjadi kesalahan saat menghapus data.');
      setShowAlert(true);
    }
  };

  const cancelDelete = () => {
    setShowAlert(false);
  };

  const closeAlert = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setShowAlert(false);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setNewNamaBank(rekeningData[index].namaBank);
    setNewNomorRekening(rekeningData[index].nomorRekening);
    setNewAtasNama(rekeningData[index].atasNama);
    setIsEditMode(true);
  };

  return (
    <div className="border-grey-500 mb-4 mt-4 rounded-lg border p-4 shadow-md dark:border-gray-dark dark:bg-gray-dark">
      <div className="mb-4 flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Rekening Masjid</h1>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{ backgroundColor: '#14B8A6', color: 'white', marginRight: '10px' }}
          startIcon={<AiOutlinePlus />}
        >
          Tambah Data
        </Button>
      </div>

      {showAlert && (
        <div className="mb-4 bg-red-500 text-white p-4 rounded-lg flex justify-between items-center">
          {errorMessage}
          <button onClick={() => { setErrorMessage(''); setShowAlert(false); }} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-green-500 text-white p-4 rounded-lg flex justify-between items-center">
          {successMessage}
          <button onClick={() => { setSuccessMessage(''); setShowAlert(false); }} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
      )}

      <table className="border-grey-200 min-w-full border bg-white dark:bg-dark-2 dark:text-slate-200">
        <thead>
          <tr>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">No</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Nama Bank</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Nomor Rekening</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Atas Nama</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rekeningData.map((item, index) => (
            <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } dark:bg-dark-3 dark:odd:bg-dark-2`}>
              <td className="border-b dark:border-gray-dark px-4 py-2">{index + 1}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">{item.nama_bank}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">{item.nomor_rekening}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">{item.atas_nama}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">
                <div className="flex space-x-2">
                  {isEditMode && editIndex === index ? (
                    <>
                      <button onClick={updateRekening} className="text-green-500"><FaCheck size={20} /></button>
                      <button onClick={() => { setIsEditMode(false); setEditIndex(null); }} className="text-gray-500"><FaTimes size={20} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)} className="text-yellow-500"><FaEdit size={20} /></button>
                      <button onClick={() => deleteRekening(item.id)} className="text-red-500"><FaTrash size={20} /></button>
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
            <h2 className="mb-4 text-xl font-bold">Tambah Rekening</h2>
            <input
              type="text"
              placeholder="Nama Bank"
              value={newNamaBank}
              onChange={(e) => setNewNamaBank(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <input
              type="text"
              placeholder="Nomor Rekening"
              value={newNomorRekening}
              onChange={(e) => setNewNomorRekening(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <input
              type="text"
              placeholder="Atas Nama"
              value={newAtasNama}
              onChange={(e) => setNewAtasNama(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="rounded-lg bg-gray-500 px-4 py-2 text-white">Batal</button>
              <button
                onClick={addRekening} className="rounded-lg bg-blue-500 px-4 py-2 text-white">Tambah</button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-1/3 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2">
            <h2 className="mb-4 text-xl font-bold">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={cancelDelete} className="rounded-lg bg-gray-500 px-4 py-2 text-white">Batal</button>
              <button onClick={confirmDelete} className="rounded-lg bg-red-500 px-4 py-2 text-white">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RekeningMasjid;
