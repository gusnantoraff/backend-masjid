import ButtonDefault from '@/components/Buttons/ButtonDefault'
import React from 'react'

const RekeningMasjid = () => {
  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
        <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Rekening Masjid</h1>
        <ButtonDefault
                    link="/edit-Rekening-masjid"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Edit"
                >
                </ButtonDefault>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="cols-span-1 mt-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nama Rekening
                </label>
                  <input
                  type="text"
                  placeholder="A.n. Bapak"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nomor Rekening
                </label>
                  <input
                  type="text"
                  placeholder="0978797843729438"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="cols-span-1 mt-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nama Bank
                </label>
                  <input
                  type="text"
                  placeholder="Bank Toyib"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>
        </div>
    </div>
  )
}

export default RekeningMasjid