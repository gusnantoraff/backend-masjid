import React from 'react'
import ButtonDefault from '../Buttons/ButtonDefault'
import { BiPlus } from 'react-icons/bi'

const Kegiatan = () => {
  return (
    <>
      <div className="flex justify-end">
        <ButtonDefault
          link="/tambah-kegiatan"
          customClasses="bg-red-500 text-white p-3 w-60 flex rounded-lg"
          label="Tambah Kegiatan"
        >
          <BiPlus />
        </ButtonDefault>
      </div>

      <div>
        <h1 className="flex justify-end text-heading-6 font-bold text-dark dark:text-white">
          Daftar Kegiatan
        </h1>
        <hr className="border-t border-gray-300 mt-2" />
      </div>
    </>

  )
}

export default Kegiatan