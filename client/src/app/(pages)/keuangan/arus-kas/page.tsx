"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import Stats from "./stats";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { IoMdAdd } from "react-icons/io";
import LaporanKeuangan from "./laporan";
import PendapatanChart from "./pendapatanchart";
import ChartPendapatan from "@/components/Charts/ChartPendapatan";
import PengeluaranChart from "./pengeluaranchart";
import DateFilter from "./DateFilter";

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [jenis, setJenis] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [oleh, setOleh] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      jenis,
      tanggal,
      amount: parseFloat(amount),
      description,
      file,
      oleh,
      status,
    };
    onSubmit(data);
    // Reset form after submission
    setJenis('');
    setTanggal('');
    setAmount('');
    setDescription('');
    setFile(null);
    setOleh('');
    setStatus('pemasukan');
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg shadow-lg p-4 z-10 w-4/5 max-w-5xl"> {/* Wider modal */}
          <h2 className="text-xl font-bold mb-4">Tambah Arus Kas</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4"> {/* Flex column for rows */}
            <div className="flex justify-between gap-4"> {/* Row 1 */}
              <div className="w-1/3"> {/* Adjusted width for horizontal layout */}
                <label className="block mb-1">Jenis:</label>
                <input
                  type="text"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12" // Same height for all fields
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-1">Tanggal:</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-1">Jumlah:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-4"> {/* Row 2 */}
              <div className="w-1/3">
                <label className="block mb-1">Deskripsi:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12"
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-1">File:</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border rounded-lg w-full p-2 h-12"
                />
              </div>
              <div className="w-1/3">
                <label className="block mb-1">Oleh:</label>
                <input
                  type="text"
                  value={oleh}
                  onChange={(e) => setOleh(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between gap-4"> {/* Row 3 */}
              <div className="w-1/3">
                <label className="block mb-1">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border rounded-lg w-full p-2 h-12"
                >
                  <option value="pemasukan">Pemasukan</option>
                  <option value="pengeluaran">Pengeluaran</option>
                </select>
              </div>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit} // Ensure this is the correct submit function
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    )
  );
};


export default function Home() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Handle the submitted data (e.g., save it to state or send it to the server)
  };

  return (
      <DefaultLayout>
          <div className="grid grid-cols-2 gap-4">
              <div className="cols-span-1">
                  <h1 className="p-2 text-4xl font-bold text-black">
                      Arus Kas
                  </h1>
              </div>
              <div className="cols-span-1 gap-4">
                  <div className="flex justify-end">
                      <ButtonDefault
                          customClasses="mt-2 bg-cyan-400 text-white px-4 py-2 rounded-xl flex items-center"
                          label="Tambah Arus Kas"
                          onClick={() => setShowModal(true)} // Open modal for income
                      >
                          <IoMdAdd className="text-white" />
                      </ButtonDefault>
                  </div>
              </div>
          </div> 
          <div className="mt-5 flex w-full rounded-xl border border-gray-300 px-4 py-4 shadow-md">
              <LaporanKeuangan />
          </div>
          <div className="grid flex flex-col items-center justify-center">
    <h1 className="mt-5 text-4xl font-bold text-black text-center">Grafik Arus Kas
    </h1>
    <div className="mt-2" style={{display: 'flex',flexDirection: 'column', alignItems: 'center', width:'100%',}}>
        <DateFilter />
    </div>
    </div>
          <Stats/>
          <div className="grid grid-cols-2 gap-4 text-center">
              <div className="cols-span-1">
              <h1 className="mt-5 text-xl font-bold text-black text-center">Pemasukan
              </h1>
                  <div className="grid flex mt-5 rounded-xl border border-gray-300 shadow-md h-auto px-4 py-4">
                      <PendapatanChart />
                  </div>
              </div>
              <div className="cols-span-1">
              <h1 className="mt-5 text-xl font-bold text-black text-center">Pengeluaran
              </h1>
                  <div className="flex mt-5 rounded-xl border border-gray-300 shadow-md h-auto px-4 py-4">
                      <PengeluaranChart />
                  </div>
              </div>
          </div>

          {/* Modal for Input */}
          <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmit}
          />
      </DefaultLayout>
  );
}

