'use client'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import React, { useState } from 'react'

const RekeningMasjid = () => {
  // State untuk mengecek apakah sedang dalam mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaRekening: 'A.n. Bapak',
    nomorRekening: '0978797843729438',
    namaBank: 'Bank Toyib'
  });

  // Fungsi untuk toggle mode edit
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
      <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Rekening Masjid</h1>
        <ButtonDefault
          customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
          label={isEditing ? "Simpan" : "Edit"}
          onClick={handleEditClick}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="cols-span-1 mt-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Nama Rekening
          </label>
          <input
            type="text"
            name="namaRekening"
            value={formData.namaRekening}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Nomor Rekening
          </label>
          <input
            type="text"
            name="nomorRekening"
            value={formData.nomorRekening}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="cols-span-1 mt-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Nama Bank
          </label>
          <input
            type="text"
            name="namaBank"
            value={formData.namaBank}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default RekeningMasjid;
