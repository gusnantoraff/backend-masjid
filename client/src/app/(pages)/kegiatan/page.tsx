"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import { BiPlus } from 'react-icons/bi';
import Modal from '@/components/Modal/ModalKegiatan';
import ListKegiatan from '@/components/KegiatanComponents/ListKegiatan';

export default function Kegiatan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setRefreshList(prev => !prev); 
    closeModal();
  };

  return (
    <DefaultLayout>
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

      <ListKegiatan refresh={refreshList} />
    </DefaultLayout>
  );
}
