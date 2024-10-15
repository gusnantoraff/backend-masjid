"use client";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import { BiPlus } from 'react-icons/bi';
import Modal from '../../components/Modal/ModalKegiatan';
import ListKegiatan from '../../components/KegiatanComponents/ListKegiatan';
import axios from 'axios';
import AlertConfirm from '../../components/Alerts/AlertConfirm';

interface Image {
  id: number;
  keterangan: string;
  kategori: string;
  image: string;
}

interface Kegiatan {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  lokasi: string;
  kategori: string;
  keterangan: string;
  images: Image[];
}

export default function Kegiatan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/kegiatan');
      setKegiatanList(response.data);
    } catch (error) {
      console.error("Error fetching kegiatan:", error);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const handleSubmit = () => {
    fetchKegiatan();
    closeModal();
  };

  const handleEdit = (id: number) => {
    console.log(`Edit kegiatan with ID: ${id}`);
  };

  const handleDeleteConfirm = async () => {
    if (selectedId !== null) {
      try {
        await axios.delete(`http://localhost:8000/api/kegiatan/${selectedId}`);
        setKegiatanList((prevList) => prevList.filter((kegiatan) => kegiatan.id !== selectedId));
        setShowConfirm(false);
        setSelectedId(null);
      } catch (error) {
        console.error(`Error deleting kegiatan with ID: ${selectedId}`, error);
      }
    }
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  return (
    <>
      <DefaultLayout>
        {showConfirm && (
          <AlertConfirm
            open={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={handleDeleteConfirm} 
            message="Apakah Anda yakin ingin menghapus data ini?"
          />
        )}
        <div className="flex justify-end">
          <ButtonDefault
            customClasses="bg-red-500 text-white p-3 w-60 flex rounded-lg"
            label="Tambah Kegiatan"
            onClick={openModal}
          >
            <BiPlus />
          </ButtonDefault>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />

        <ListKegiatan kegiatanList={kegiatanList} onEdit={handleEdit} onDelete={handleDelete} />
      </DefaultLayout>
    </>
  );
}
