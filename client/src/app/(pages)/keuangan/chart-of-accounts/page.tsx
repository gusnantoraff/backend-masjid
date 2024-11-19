"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus } from "lucide-react";

// Define Account interface
interface Account {
    code: string;
    name: string;
    type: string;
    balance: number;
}

// Define FormData interface
interface FormData {
    code: string;
    name: string;
    type: string;
}

const API_URL = "http://localhost:8000/api/coa";

const ChartOfAccounts: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        code: "",
        name: "",
        type: "",
    });

    // Fetch accounts on page load
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch accounts.");
                const data = await response.json();

                const formattedAccounts: Account[] = data.map(
                    (account: any) => {
                        const totalPenerimaan = account.penerimaan_kas.reduce(
                            (sum: number, item: { jumlah: string }) =>
                                sum + parseFloat(item.jumlah),
                            0,
                        );
                        const totalPengeluaran = account.pengeluaran_kas.reduce(
                            (sum: number, item: { jumlah: string }) =>
                                sum + parseFloat(item.jumlah),
                            0,
                        );

                        return {
                            code: account.kode_akun,
                            name: account.nama_akun,
                            type: account.tipe,
                            balance: totalPenerimaan - totalPengeluaran,
                        };
                    },
                );

                setAccounts(formattedAccounts);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    // Handle modal form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAccount = {
            kode_akun: formData.code,
            nama_akun: formData.name,
            tipe: formData.type,
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAccount),
            });

            if (response.ok) {
                const createdAccount: Account = await response.json();
                setAccounts((prevAccounts) => [
                    ...prevAccounts,
                    {
                        code: createdAccount.code,
                        name: createdAccount.name,
                        type: createdAccount.type,
                        balance: 0,
                    },
                ]);
                setFormData({ code: "", name: "", type: "" });
                setIsModalOpen(false); // Close modal after submission
            } else {
                const errorResponse = await response.json();
                console.error("Failed to create account:", errorResponse);
                alert("Gagal menambahkan akun baru.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menambahkan akun.");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredAccounts = accounts.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <DefaultLayout>
            <h1 className="p-2 text-4xl font-bold text-black">
                Chart of Accounts
            </h1>
            <div className="cols-span-1 mt-2 w-full rounded-xl border border-gray-300 px-2 py-2 shadow-md">
                <div className="rounded-lg bg-white shadow-1">
                    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                Daftar Akun
                            </h3>
                            <div className="flex space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Cari akun..."
                                        className="rounded-md border border-gray-300 py-2 pl-8 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Akun
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Kode
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Nama Akun
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Tipe
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Saldo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredAccounts.length > 0 ? (
                                        filteredAccounts.map((account) => (
                                            <tr
                                                key={account.code}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {account.code}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {account.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {account.type}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                                    {account.balance.toLocaleString(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        },
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-4 text-center text-sm text-gray-500"
                                            >
                                                No accounts available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Rendering */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-4">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">
                            Tambah Akun Baru
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="code"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Kode Akun
                                    </label>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        required
                                        value={formData.code}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Akun
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tipe Akun
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        required
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">
                                            Pilih tipe akun
                                        </option>
                                        <option value="Aset">Aset</option>
                                        <option value="Kewajiban">
                                            Kewajiban
                                        </option>
                                        <option value="Penerimaan">
                                            Penerimaan
                                        </option>
                                        <option value="Pengeluaran">
                                            Pengeluaran
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default ChartOfAccounts;
