"use client";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import React, { useState } from "react";
import ButtonDefault from '../../components/Buttons/ButtonDefault'
import { BiPlus } from 'react-icons/bi'
import Modal from '../../components/Modal/ModalKegiatan';

export default function Kegiatan() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DefaultLayout>
        <div className="flex justify-end">
          <ButtonDefault
            customClasses="bg-red-500 text-white p-3 w-60 flex rounded-lg"
            label="Tambah Kegiatan"
            onClick={openModal} // Menambahkan onClick untuk membuka modal
          >
            <BiPlus />
          </ButtonDefault>
        </div>

        {/* Memanggil komponen Modal dan mengontrol visibilitasnya */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </DefaultLayout>
      </>
      );
}