import React from 'react'

const LogoNamaMasjid = () => {
  return (
    <div className="grid grid-cols-3 pt-2 flex justify-between gap-0">
      <div className='col-span-1 mt-2 p-2'>
        <img
        src='/images/product/product-04.png'
        alt='Logo Masjid'
        className=''
        />
      </div>
      <div className='col-span-2 mt-2 p-2'>
      <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
              Masjid
      </h1>
      <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
              Nama
        </h1>
      </div>
    </div>
  )
}

export default LogoNamaMasjid