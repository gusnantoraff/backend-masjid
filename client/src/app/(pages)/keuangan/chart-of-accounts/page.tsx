"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Search, Plus } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@mui/material/Button";
import fetchWithAuth from "@/utils/fetch";
import { FaCheck, FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit, FaTimes } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";

const API_URL = "http://localhost:8000/api/coa";

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, title }) => {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [formError, setFormError] = useState("");

    const resetForm = () => {
        setCode("");
        setName("");
        setType("");
        setFormError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code || !name || !type) {
            setFormError("All fields are required.");
            return;
        }

        const newAccount = {
            kode_akun: code,
            nama_akun: name,
            tipe: type,
        };

        try {
            const createdAccount = await fetchWithAuth(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAccount),
            });
            console.log("Account created successfully:", createdAccount);
            onSubmit();
            onClose();
            resetForm();
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred during submission.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="z-10 w-4/5 max-w-md rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                {formError && (
                    <div className="mb-4 rounded-lg bg-red-100 p-2 text-red-700">
                        {formError}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label>Kode Akun:</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="h-12 w-full rounded-lg border p-2"
                            placeholder="Kode Akun"
                            style={{ textTransform: 'uppercase' }}
                        />
                    </div>
                    <div>
                        <label>Nama Akun:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 w-full rounded-lg border p-2"
                            placeholder="Nama Akun"
                            style={{ textTransform: 'uppercase' }}
                        />
                    </div>
                    <div>
                        <label>Tipe Akun:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="h-12 w-full rounded-lg border p-2"
                        >
                            <option value="">Pilih Tipe Akun</option>
                            <option value="Infaq">Infaq</option>
                            <option value="Operasional">Operasional</option>
                            <option value="Kas">Kas</option>
                            <option value="Hutang">Hutang</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-gray-300 px-4 py-2"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ViewModal = ({ isOpen, onClose, account }) => {
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
        // Logic untuk menyimpan perubahan
        console.log("Simpan perubahan!");
        setEditMode(false); // Keluar dari mode edit
    };

    if (!isOpen || !account) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="z-10 w-4/5 max-w-md rounded-lg bg-white p-4 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Detail Data</h2>
                    <div className="flex space-x-2">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="text-green-500"
                                >
                                    <FaCheck size={20} />
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="text-gray-500"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="flex items-center gap-2 text-yellow-500"
                                >
                                    <span>Edit</span>
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-red-500"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    {editMode ? (
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Kode Akun:
                                </label>
                                <input
                                    type="text"
                                    defaultValue={account.code}
                                    className="w-full rounded-lg border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Akun:
                                </label>
                                <input
                                    type="text"
                                    defaultValue={account.name}
                                    className="w-full rounded-lg border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tipe Akun:
                                </label>
                                <select
                                    defaultValue={account.type}
                                    className="w-full rounded-lg border p-2"
                                >
                                    <option value="Infaq">Infaq</option>
                                    <option value="Operasional">
                                        Operasional
                                    </option>
                                    <option value="Kas">Kas</option>
                                    <option value="Hutang">Hutang</option>
                                </select>
                            </div>
                        </form>
                    ) : (
                        <div
                            className="space-y-2"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <p>
                                <strong>Kode Akun:</strong> {account.code}
                            </p>
                            <p>
                                <strong>Nama Akun:</strong> {account.name}
                            </p>
                            <p>
                                <strong>Tipe Akun:</strong> {account.type}
                            </p>
                            <p>
                                <strong>Saldo:</strong>{" "}
                                {account.balance.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ChartOfAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await fetchWithAuth(API_URL);

                const formattedAccounts = data.map((account) => ({
                    code: account.kode_akun,
                    name: account.nama_akun,
                    type: account.tipe,
                    status: account.status || "Aktif",
                    balance:
                        (account.penerimaan_kas?.reduce(
                            (sum, item) => sum + parseFloat(item.jumlah || 0),
                            0
                        ) || 0) -
                        (account.pengeluaran_kas?.reduce(
                            (sum, item) => sum + parseFloat(item.jumlah || 0),
                            0
                        ) || 0),
                }));

                setAccounts(formattedAccounts);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    const handleNewAccountSubmit = () => {
        // Fetch updated accounts after a successful form submission
        window.location.reload();
    };

    const handleStatusChange = (accountCode) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.code === accountCode
                    ? {
                          ...account,
                          status: account.status === "Aktif" ? "Tidak Aktif" : "Aktif",
                      }
                    : account
            )
        );
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
                                <Button
                                    variant="contained"
                                    onClick={() => setIsModalOpen(true)}
                                    sx={{
                                        backgroundColor: "#14B8A6",
                                        color: "white",
                                        marginRight: "10px",
                                    }}
                                    startIcon={<AiOutlinePlus />}
                                >
                                    Tambah Akun
                                </Button>
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
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Saldo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Keterangan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Aksi
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
                                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                    {account.code}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                                    {account.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                                    {account.type}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                                    {account.balance.toLocaleString(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        },
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                                    {account.status}
                                                </td>
                                                <td className="space-x-2 whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                account.code,
                                                                "Aktif",
                                                            )
                                                        }
                                                        className={`text-sm font-medium ${
                                                            account.status ===
                                                            "Aktif"
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {account.status ===
                                                        "Aktif" ? (
                                                            <IoIosRadioButtonOn
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <IoIosRadioButtonOn
                                                                size={20}
                                                            />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedAccount(
                                                                account,
                                                            );
                                                            setIsViewModalOpen(
                                                                true,
                                                            );
                                                        }}
                                                        className="text-blue-500"
                                                    >
                                                        <FaEye size={20} />
                                                    </button>
                                                    <button
                                                        // onClick={{}}
                                                        className="text-red-500"
                                                    >
                                                        <FaTrash size={20} />
                                                    </button>
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleNewAccountSubmit}
                title="Tambah Akun Baru"
            />

            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                account={selectedAccount}
            />
        </DefaultLayout>
    );
};

export default ChartOfAccounts;
