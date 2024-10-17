import ButtonDefault from '@/components/Buttons/ButtonDefault'
import React from 'react'

const KeuanganMasjid = () => {
  return (
    <div className="border rounded-lg border-grey-500 mt-4 mb-4 p-4 shadow-1">
        <div className="flex justify-between">
        <h1 className="text-heading-6 font-bold text-dark dark:text-white">Keuangan Masjid</h1>
        <ButtonDefault
                    link="/edit-Keuangan-masjid"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Edit"
                >
                </ButtonDefault>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="cols-span-1 mt-2">
            </div>
            <div className="cols-span-1 mt-2">
            </div>
        </div>
    </div>
  )
}

export default KeuanganMasjid