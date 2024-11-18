"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus, X } from "lucide-react";

const fetchUrl = 'http://localhost:8000/api/general-ledger';

const GeneralLedger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        date: "",
        description: "",
        debit: "",
        credit: "",
        reference: "",
    });
    const [transactions, setTransactions] = useState([]);

    // Fetch data from API on component mount
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(fetchUrl);
                const data = await response.json();
                
                // Map the data to include a reference (formatted TRX-xxx)
                const mappedData = data.map((trx, index) => ({
                    ...trx,
                    reference: `TRX-${String(index + 1).padStart(3, "0")}`,
                }));
                setTransactions(mappedData);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            ...newEntry,
            debit: parseFloat(newEntry.debit),
            credit: parseFloat(newEntry.credit),
            reference: `TRX-${String(transactions.length + 1).padStart(3, "0")}`,
        };

        setTransactions([...transactions, newTransaction]);
        setIsOpen(false);
        setNewEntry({
            date: "",
            description: "",
            debit: "",
            credit: "",
            reference: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Modal component
    const Modal = () => (
        <>
            <div
                className="fixed inset-0 z-[999] bg-black bg-opacity-50"
                onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-0 z-[1000] overflow-y-auto flex items-center justify-center p-4">
                <div
                    className="relative w-full max-w-md rounded-lg bg-white shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Tambah Jurnal Baru</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Date Input */}
                            <div>
                                <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal
                                </label><span className="text-red-500">*</span>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={newEntry.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Additional Inputs (description, debit, credit, amount) */}
                            <div>
                                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                                    Keterangan
                                </label><span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={newEntry.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="debit" className="mb-1 block text-sm font-medium text-gray-700">
                                    Debit
                                </label><span className="text-red-500">*</span>
                                <input
                                    type="number"
                                    id="debit"
                                    name="debit"
                                    value={newEntry.debit}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="credit" className="mb-1 block text-sm font-medium text-gray-700">
                                    Kredit
                                </label><span className="text-red-500">*</span>
                                <input
                                    type="number"
                                    id="credit"
                                    name="credit"
                                    value={newEntry.credit}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">General Ledger</h1>

            <div className="mt-2 rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Card Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Jurnal Umum</h2>
                        <div className="flex space-x-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari transaksi..."
                                    className="rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Entry Button */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Jurnal
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-3 text-left font-medium text-gray-600">Tanggal</th>
                                    <th className="pb-3 text-left font-medium text-gray-600">Keterangan</th>
                                    <th className="pb-3 text-left font-medium text-gray-600">Debit</th>
                                    <th className="pb-3 text-left font-medium text-gray-600">Kredit</th>
                                    <th className="pb-3 text-right font-medium text-gray-600">Nominal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((trx, index) => (
                                    <tr key={trx.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4">{trx.tanggal}</td>
                                        <td className="py-4">{trx.description}</td>
                                        <td className="py-4">{trx.debit}</td>
                                        <td className="py-4">{trx.kredit}</td>
                                        <td className="py-4 text-right">
                                            {(trx.debit - trx.kredit).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Render modal if isOpen is true */}
            {isOpen && ReactDOM.createPortal(<Modal />, document.body)}
        </DefaultLayout>
    );
};

export default GeneralLedger;
