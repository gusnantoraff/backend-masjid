'use client'
import ButtonDefault from '@/components/Buttons/ButtonDefault'
import React, { useState } from 'react'

const ProfilMasjid = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaMasjid: 'Masjid An-Nasr',
    alamatMasjid: 'Jl. Jalan',
    luasTanah: '1km2',
    luasBangunan: '50m2',
    tahunBerdiri: '1944',
    deskripsiMasjid: 'Deskripsi Masjid',
    kontak: '098782371939',
  });
  const [fotoMasjid, setFotoMasjid] = useState('/images/masjid.jpg');

  // Toggle mode edit
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle change input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle foto change
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFotoMasjid(fileURL);
    }
  };

  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
      <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Profil Masjid</h1>
        <ButtonDefault
          customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
          label={isEditing ? "Simpan" : "Edit"}
          onClick={handleEditClick}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative cols-span-1 mt-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Foto Masjid
          </label>
          <div className="relative w-full ">
            <img
              src={fotoMasjid}
              alt="Deskripsi Foto"
              className="w-full h-full object-cover rounded-lg"
            />
            {isEditing && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg">
                  Ganti Foto
                  <input type="file" className="hidden" onChange={handleFotoChange} />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="cols-span-2 mt-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Nama Masjid
          </label>
          <input
            type="text"
            name="namaMasjid"
            value={formData.namaMasjid}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Alamat Masjid
          </label>
          <input
            type="text"
            name="alamatMasjid"
            value={formData.alamatMasjid}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="cols-span-1">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Luas Tanah
              </label>
              <input
                type="text"
                name="luasTanah"
                value={formData.luasTanah}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="cols-span-1">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Luas Bangunan
              </label>
              <input
                type="text"
                name="luasBangunan"
                value={formData.luasBangunan}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Tahun Berdiri
          </label>
          <input
            type="text"
            name="tahunBerdiri"
            value={formData.tahunBerdiri}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Deskripsi Masjid
          </label>
          <textarea
            rows={6}
            name="deskripsiMasjid"
            value={formData.deskripsiMasjid}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          ></textarea>
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Nomor Telepon Kontak
          </label>
          <input
            type="text"
            name="kontak"
            value={formData.kontak}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilMasjid;
