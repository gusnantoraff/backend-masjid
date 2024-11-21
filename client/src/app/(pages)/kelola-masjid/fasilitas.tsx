"use client"
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const FasilitasMasjid = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const [newFasilitas, setNewFasilitas] = useState('');
  const [newDeskripsi, setNewDeskripsi] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchFasilitasMasjid();
  }, []);

  const fetchFasilitasMasjid = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/fasilitas');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFasilitas(data);
    } catch (error) {
      console.error('Error fetching fasilitas masjid:', error);
    }
  };

  const addFasilitas = async () => {
    if (!newFasilitas || !newDeskripsi) {
      setErrorMessage('Nama Fasilitas dan Deskripsi wajib diisi.');
      setShowAlert(true);
      return;
    }

    const newEntry = {
      info_masjid_id: 1,
      nama_fasilitas: newFasilitas,
      deskripsi: newDeskripsi,
    };

    try {
      const response = await fetch('http://localhost:8000/api/fasilitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to add data');
      }

      const data = await response.json();
      setFasilitas([...fasilitas, data.fasilitas]);
      setNewFasilitas('');
      setNewDeskripsi('');
      setIsModalOpen(false);
      setShowAlert(false);
      setSuccessMessage('Data berhasil ditambahkan.');
    } catch (error) {
      console.error('Error adding fasilitas:', error);
      setErrorMessage('Terjadi kesalahan saat menambahkan data.');
      setShowAlert(true);
    }
  };

  const updateFasilitas = async () => {
    const updatedFasilitas = { ...fasilitas[editIndex], deskripsi: newDeskripsi };

    try {
      const response = await fetch(
        `http://localhost:8000/api/fasilitas/${updatedFasilitas.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFasilitas),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const data = await response.json();
      const updatedFasilitasArray = [...fasilitas];
      updatedFasilitasArray[editIndex] = data.fasilitas;
      setFasilitas(updatedFasilitasArray);
      setIsEditMode(false);
      setEditIndex(null);
      setShowAlert(false);
      setSuccessMessage('Data berhasil diperbarui.');
    } catch (error) {
      console.error('Error updating fasilitas:', error);
      setErrorMessage('Terjadi kesalahan saat memperbarui data.');
      setShowAlert(true);
    }
  };

  const deleteFasilitas = async (id) => {
    setDeleteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/fasilitas/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      setFasilitas(fasilitas.filter((item) => item.id !== deleteId));
      setShowAlert(false);
      setSuccessMessage('Data berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting fasilitas:', error);
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
    setNewDeskripsi(fasilitas[index].deskripsi);
    setIsEditMode(true);
  };

  return (
    <div className="border-grey-500 mb-4 mt-4 rounded-lg border p-4 shadow-md dark:border-gray-dark dark:bg-gray-dark">
      <div className="mb-4 flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">
          Fasilitas Masjid
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-emerald-400 px-4 py-2 text-white dark:text-gray-dark"
        >

          Tambah
        </button>
      </div>

      {showAlert && (
        <div className="mb-4 bg-red-500 text-white p-4 rounded-lg flex justify-between items-center">
          {errorMessage}
          <button onClick={closeAlert} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-green-500 text-white p-4 rounded-lg flex justify-between items-center">
          {successMessage}
          <button onClick={closeAlert} className="text-white hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
      )}

      <table className="border-grey-200 min-w-full border bg-white dark:bg-dark-2 dark:text-slate-200">
        <thead>
          <tr>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">No</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Nama Fasilitas</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Deskripsi</th>
            <th className="border-b dark:border-gray-dark px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {fasilitas.map((item, index) => (
            <tr key={item.id}className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } dark:bg-dark-3 dark:odd:bg-dark-2`}>
              <td className="border-b dark:border-gray-dark px-4 py-2">{index + 1}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">{item.nama_fasilitas}</td>
              <td className="border-b dark:border-gray-dark px-4 py-2">
                {isEditMode && editIndex === index ? (
                  <input
                    type="text"
                    value={newDeskripsi}
                    onChange={(e) => setNewDeskripsi(e.target.value)}
                    className="w-full rounded border px-2 py-1"
                  />
                ) : (
                  item.deskripsi
                )}
              </td>
              <td className="border-b dark:border-gray-dark px-4 py-2">
                <div className="flex space-x-2">
                  {isEditMode && editIndex === index ? (
                    <>
                      <button
                        onClick={updateFasilitas}
                        className="text-green-500"
                      >
                        <FaCheck size={20}/>
                      </button>
                      <button
                        onClick={() => {
                          setIsEditMode(false);
                          setEditIndex(null);
                        }}
                        className="text-gray-500"
                      >
                        <FaTimes size={20}/>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(index)}
                        className="text-yellow-500"
                      >
                        <FaEdit size={20}/>
                      </button>
                      <button
                        onClick={() => deleteFasilitas(item.id)}
                        className="text-red-500"
                      >
                        <FaTrash size={20}/>
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
            <h2 className="mb-4 text-xl font-bold">Tambah Fasilitas</h2>
            <input
              type="text"
              placeholder="Nama Fasilitas"
              value={newFasilitas}
              onChange={(e) => setNewFasilitas(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <input
              type="text"
              placeholder="Deskripsi Fasilitas"
              value={newDeskripsi}
              onChange={(e) => setNewDeskripsi(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white"
              >
           
                Batal
              </button>
              <button
                onClick={addFasilitas}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
               
                Tambah
              </button>
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
      )}
    </div>
  );
};

export default FasilitasMasjid;