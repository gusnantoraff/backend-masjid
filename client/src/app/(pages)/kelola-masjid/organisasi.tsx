"use client";

import React, { useState } from 'react';

const StrukturOrganisasiMasjid = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [struktur, setStruktur] = useState([
    { jabatan: 'Ketua', nama: 'Cristiano Ronaldo', kontak: '0978797843729438' },
  ]);

  const [newStruktur, setNewStruktur] = useState([...struktur]);
  const [newJabatan, setNewJabatan] = useState('');
  const [newNama, setNewNama] = useState('');
  const [newKontak, setNewKontak] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleEditMode = () => {
    if (isEditMode) {
      setNewStruktur([...struktur]);
    }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (index, field, value) => {
    const updatedStruktur = newStruktur.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewStruktur(updatedStruktur);
  };

  const addStruktur = () => {
    if (newJabatan && newNama && newKontak) {
      const newEntry = { jabatan: newJabatan, nama: newNama, kontak: newKontak };
      setNewStruktur([...newStruktur, newEntry]);
      setNewJabatan('');
      setNewNama('');
      setNewKontak('');
      setIsModalOpen(false);
    }
  };

  const saveChanges = () => {
    setStruktur(newStruktur);
    setIsEditMode(false);
  };

  const deleteStruktur = (index) => {
    const updatedStruktur = newStruktur.filter((_, i) => i !== index);
    setNewStruktur(updatedStruktur);
  };

  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
      <div className="flex justify-between mb-4">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Struktur Organisasi Masjid</h1>
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
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Struktur
            </button>
            <button
              onClick={saveChanges}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {newStruktur.map((item, index) => (
          <React.Fragment key={index}>
            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Jabatan
              </label>
              <input
                type="text"
                value={item.jabatan}
                onChange={(e) => isEditMode && handleInputChange(index, 'jabatan', e.target.value)}
                disabled = {!isEditMode}
                className={`mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
                    isEditMode ? 'focus:border-primary active:border-primary' : 'disabled:cursor-default disabled:bg-gray-2'
                  } dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Nama
              </label>
              <input
                type="text"
                value={item.nama}
                onChange={(e) => isEditMode && handleInputChange(index, 'nama', e.target.value)}
                disabled={!isEditMode}
                className={`mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
                    isEditMode ? 'focus:border-primary active:border-primary' : 'disabled:cursor-default disabled:bg-gray-2'
                  } dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Kontak
              </label>
              <input
                type="text"
                value={item.kontak}
                onChange={(e) => isEditMode && handleInputChange(index, 'kontak', e.target.value)}
                disabled={!isEditMode}
                className={`mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
                    isEditMode ? 'focus:border-primary active:border-primary' : 'disabled:cursor-default disabled:bg-gray-2'
                  } dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary`}
              />
            </div>
            {isEditMode && (
              <div className="col-span-3 flex justify-start">
                <button
                  onClick={() => deleteStruktur(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Hapus
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-dark-2 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Tambah Struktur</h2>
            <input
              type="text"
              placeholder="Jabatan"
              value={newJabatan}
              onChange={(e) => setNewJabatan(e.target.value)}
              className="w-full mb-4 rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="Nama"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
              className="w-full mb-4 rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="Kontak"
              value={newKontak}
              onChange={(e) => setNewKontak(e.target.value)}
              className="w-full mb-4 rounded-md border p-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={addStruktur}
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

export default StrukturOrganisasiMasjid;