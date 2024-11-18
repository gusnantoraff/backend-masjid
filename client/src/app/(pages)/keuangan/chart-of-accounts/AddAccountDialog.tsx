import React from "react";
import { Plus } from "lucide-react";

const TambahAkun = ({ onTambahAkun }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        code: "",
        name: "",
        type: "",
        balance: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newAccount = {
            ...formData,
            balance: parseFloat(formData.balance) || 0,
        };

        onTambahAkun(newAccount);
        setFormData({
            code: "",
            name: "",
            type: "",
            balance: "",
        });
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Prevent scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Akun
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <>
                    {/* Backdrop with higher z-index */}
                    <div
                        className="fixed inset-0 z-[999] bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content with even higher z-index */}
                    <div className="fixed inset-0 z-[1000] overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div
                                className="mx-4 w-full max-w-md rounded-lg bg-white"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Tambah Akun Baru
                                    </h3>
                                </div>

                                {/* Modal Body */}
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4 px-6 py-4">
                                        <div className="space-y-1">
                                            <label
                                                htmlFor="code"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Kode Akun
                                            </label><span className="text-red-500">*</span>
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

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Nama Akun
                                            </label><span className="text-red-500">*</span>
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

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tipe Akun
                                            </label><span className="text-red-500">*</span>
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
                                                <option value="Aset">
                                                    Aset
                                                </option>
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

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="balance"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Saldo Awal
                                            </label><span className="text-red-500">*</span>
                                            <input
                                                id="balance"
                                                name="balance"
                                                type="number"
                                                value={formData.balance}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="flex justify-end space-x-2 border-t border-gray-200 px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        </>
    );
};

export default TambahAkun;
