"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditKegiatan from "@/components/EditModal/ModalKegiatan";
import React, { useState } from "react";
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import { BiPlus } from 'react-icons/bi';
import ListKegiatan from "@/components/KegiatanComponents/ListKegiatan";
import { useRouter } from "next/navigation";

const KegiatanPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [refreshList, setRefreshList] = useState(false);
    const router = useRouter();

    const handleModalClose = () => {
        router.push(`/kegiatan`);
        setIsModalOpen(false);
    };

    const handleModalSubmit = () => {
        router.push(`/kegiatan`);
        setRefreshList(prev => !prev);
        setIsModalOpen(false);
    };

    return (
        <DefaultLayout>
            <div className="flex justify-end">
                <ButtonDefault
                    customClasses="bg-red-500 text-white p-3 w-60 flex rounded-lg"
                    label="Tambah Kegiatan"
                >
                    <BiPlus />
                </ButtonDefault>
            </div>
            {isModalOpen && (
                <EditKegiatan
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleModalSubmit}
                    id={id}
                />
            )}
            <ListKegiatan refresh={refreshList} />

        </DefaultLayout>
    );
};

export default KegiatanPage;
