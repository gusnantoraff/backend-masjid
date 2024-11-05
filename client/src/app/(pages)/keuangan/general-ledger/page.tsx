"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus, X } from "lucide-react";

const GeneralLedger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        date: "",
        description: "",
        debit: "",
        credit: "",
        amount: "",
        reference: "",
    });

    const [transactions, setTransactions] = useState([
        {
            date: "2024-03-01",
            description: "Infaq Jumat",
            debit: "1001",
            credit: "4000",
            amount: 5000000,
            reference: "TRX-001",
        },
        {
            date: "2024-03-05",
            description: "Pembayaran Listrik",
            debit: "5000",
            credit: "1000",
            amount: 1500000,
            reference: "TRX-002",
        },
        {
            date: "2024-03-10",
            description: "Penerimaan Zakat",
            debit: "1000",
            credit: "4001",
            amount: 10000000,
            reference: "TRX-003",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            ...newEntry,
            amount: parseFloat(newEntry.amount),
            reference: `TRX-${String(transactions.length + 1).padStart(3, "0")}`,
        };

        setTransactions([...transactions, newTransaction]);
        setIsOpen(false);
        setNewEntry({
            date: "",
            description: "",
            debit: "",
            credit: "",
            amount: "",
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

    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">
                General Ledger
            </h1>

            <div className="mt-2 rounded-lg border border-gray-200 bg-white shadow-sm">
                {/* Card Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Jurnal Umum
                        </h2>
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
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Tanggal
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Referensi
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Keterangan
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Debit
                                    </th>
                                    <th className="pb-3 text-left font-medium text-gray-600">
                                        Kredit
                                    </th>
                                    <th className="pb-3 text-right font-medium text-gray-600">
                                        Nominal
                                    </th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {transactions.map((trx) => (
                                    <tr
                                        key={trx.reference}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="py-4">{trx.date}</td>
                                        <td className="py-4">
                                            {trx.reference}
                                        </td>
                                        <td className="py-4">
                                            {trx.description}
                                        </td>
                                        <td className="py-4">{trx.debit}</td>
                                        <td className="py-4">{trx.credit}</td>
                                        <td className="py-4 text-right">
                                            {trx.amount.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                },
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <>
                    {/* Fixed Backdrop */}
                    <div
                        className="fixed inset-0 z-[999] bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Container - Centered */}
                    <div className="fixed inset-0 z-[1000] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            {/* Modal Content */}
                            <div
                                className="relative w-full max-w-md rounded-lg bg-white shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Tambah Jurnal Baru
                                    </h3>
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
                                            <label
                                                htmlFor="date"
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Tanggal
                                            </label>
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

                                        {/* Description Input */}
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Keterangan
                                            </label>
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

                                        {/* Debit Account Input */}
                                        <div>
                                            <label
                                                htmlFor="debit"
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Akun Debit
                                            </label>
                                            <input
                                                type="text"
                                                id="debit"
                                                name="debit"
                                                value={newEntry.debit}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        {/* Credit Account Input */}
                                        <div>
                                            <label
                                                htmlFor="credit"
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Akun Kredit
                                            </label>
                                            <input
                                                type="text"
                                                id="credit"
                                                name="credit"
                                                value={newEntry.credit}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        {/* Amount Input */}
                                        <div>
                                            <label
                                                htmlFor="amount"
                                                className="mb-1 block text-sm font-medium text-gray-700"
                                            >
                                                Nominal
                                            </label>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                value={newEntry.amount}
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
                    </div>
                </>
            )}
        </DefaultLayout>
    );
};

export default GeneralLedger;
