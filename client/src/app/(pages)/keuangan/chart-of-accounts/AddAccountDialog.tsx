import React from 'react';
import { Plus } from 'lucide-react';

const TambahAkun = ({ onTambahAkun }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    code: '',
    name: '',
    type: '',
    balance: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newAccount = {
      ...formData,
      balance: parseFloat(formData.balance) || 0
    };
    
    onTambahAkun(newAccount);
    setFormData({
      code: '',
      name: '',
      type: '',
      balance: ''
    });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Tambah Akun
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <>
          {/* Backdrop with higher z-index */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content with even higher z-index */}
          <div className="fixed inset-0 z-[1000] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className="bg-white rounded-lg w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Tambah Akun Baru</h3>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit}>
                  <div className="px-6 py-4 space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="code" className="block text-sm font-medium text-gray-700">
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

                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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

                    <div className="space-y-1">
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
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
                        <option value="">Pilih tipe akun</option>
                        <option value="Aset">Aset</option>
                        <option value="Kewajiban">Kewajiban</option>
                        <option value="Penerimaan">Penerimaan</option>
                        <option value="Pengeluaran">Pengeluaran</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                        Saldo Awal
                      </label>
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
                  <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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