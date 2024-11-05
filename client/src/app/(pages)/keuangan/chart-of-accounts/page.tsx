'use client'
import React, { useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Search } from 'lucide-react';
import TambahAkun from './AddAccountDialog';

const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([
    { code: '1000', name: 'Kas Masjid', type: 'Aset', balance: 50000000 },
    { code: '1001', name: 'Kas Infaq', type: 'Aset', balance: 25000000 },
    { code: '2000', name: 'Hutang Operasional', type: 'Kewajiban', balance: 2000000 },
    { code: '4000', name: 'Pendapatan Infaq', type: 'Penerimaan', balance: 0 },
    { code: '4001', name: 'Pendapatan Zakat', type: 'Penerimaan', balance: 0 },
    { code: '5000', name: 'Beban Listrik', type: 'Pengeluaran', balance: 0 },
    { code: '5001', name: 'Beban Air', type: 'Pengeluaran', balance: 0 },
  ]);

  const handleTambahAkun = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  return (
    <DefaultLayout>
      <h1 className="p-2 text-4xl font-bold text-black">
        Chart of Accounts
      </h1>
      <div className="mt-2 cols-span-1 rounded-xl px-2 py-2 shadow-md w-full border border-gray-300">
        <div className="bg-white rounded-lg shadow-1">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Daftar Akun</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari akun..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <TambahAkun onTambahAkun={handleTambahAkun} />
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Akun</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accounts.map((account) => (
                    <tr key={account.code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {account.balance.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChartOfAccounts;