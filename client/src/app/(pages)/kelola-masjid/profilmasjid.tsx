import ButtonDefault from '@/components/Buttons/ButtonDefault'
import React from 'react'

const ProfilMasjid = () => {
  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
        <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Profil Masjid</h1>
        <ButtonDefault
                    link="/edit-profil-masjid"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Edit"
                >
                </ButtonDefault>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="cols-span-1 mt-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Foto Masjid
                </label>
            <img
                                src="/images/masjid.jpg"
                                alt="Deskripsi Foto"
                                className="w-full rounded-lg"
                                style={{ height: "40rem" }}
                            />
            </div>
            <div className="cols-span-2 mt-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nama Masjid
                </label>
                  <input
                  type="text"
                  placeholder="Masjid An-Nasr"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Alamat Masjid
                </label>
                  <input
                  type="text"
                  placeholder="Jl. Jalan"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="cols-span-1">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Luas Tanah
                </label>
                  <input
                  type="text"
                  placeholder="1km2"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                  <div className="cols-span-1">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Luas Bangunan
                </label>
                  <input
                  type="text"
                  placeholder="50m2"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                </div>
            
            
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Tahun Berdiri
                </label>
                  <input
                  type="text"
                  placeholder="1944"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Deskripsi Masjid
                </label>
                <textarea
                  rows={6}
                  placeholder="Deskripsi Masjid"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nomor Telepon Kontak
                </label>
                  <input
                  type="text"
                  placeholder="098782371939"
                  className="mb-4 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
            </div>
        </div>
    </div>
  )
}

export default ProfilMasjid