"use client";

import React, { useState } from 'react';

const FasilitasMasjid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fasilitas, setFasilitas] = useState([{ nama: 'Tempat Parkir', deskripsi: 'Motor 1 Mobil 1' }]);
  const [newFasilitas, setNewFasilitas] = useState('');
  const [newDeskripsi, setNewDeskripsi] = useState('');

  // Handle opening and closing modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle switching edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Handle adding fasilitas
  const addFasilitas = () => {
    if (newFasilitas && newDeskripsi) {
      setFasilitas([...fasilitas, { nama: newFasilitas, deskripsi: newDeskripsi }]);
      setNewFasilitas('');
      setNewDeskripsi('');
      toggleModal();
    }
  };

  // Handle deleting fasilitas
  const deleteFasilitas = (index) => {
    const updatedFasilitas = fasilitas.filter((_, i) => i !== index);
    setFasilitas(updatedFasilitas);
  };

  // Handle editing deskripsi
  const editDeskripsi = (index, value) => {
    const updatedFasilitas = fasilitas.map((item, i) =>
      i === index ? { ...item, deskripsi: value } : item
    );
    setFasilitas(updatedFasilitas);
  };

  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
      <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Fasilitas Masjid</h1>
        {!isEditMode ? (
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={toggleEditMode}
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={toggleModal}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Fasilitas
            </button>
            <button
              onClick={toggleEditMode}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fasilitas.map((item, index) => (
          <div key={index} className="cols-span-1 mt-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              {item.nama}
            </label>
            <input
              type="text"
              value={item.deskripsi}
              onChange={(e) => isEditMode && editDeskripsi(index, e.target.value)}
              readOnly={!isEditMode}
              className={`mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition ${
                isEditMode ? 'focus:border-primary active:border-primary' : 'disabled:cursor-default disabled:bg-gray-2'
              } dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
            />
            {isEditMode && (
              <button
                onClick={() => deleteFasilitas(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Hapus
                </button>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-dark-2 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Fasilitas</h2>
            <input
              type="text"
              placeholder="Nama Fasilitas"
              value={newFasilitas}
              onChange={(e) => setNewFasilitas(e.target.value)}
              className="w-full mb-4 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <input
              type="text"
              placeholder="Deskripsi Fasilitas"
              value={newDeskripsi}
              onChange={(e) => setNewDeskripsi(e.target.value)}
              className="w-full mb-4 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={addFasilitas}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FasilitasMasjid;
