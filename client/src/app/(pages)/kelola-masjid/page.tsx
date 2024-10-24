import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import ProfilMasjid from './profilmasjid'
import FasilitasMasjid from './fasilitas'
import RekeningMasjid from './rekening'
import MubalighMasjid from './mubaligh'
import KeuanganMasjid from './keuangan'
import StrukturOrganisasiMasjid from './organisasi'

const InformasiMasjid = () => {
  return (
    <DefaultLayout>
        <div>
        <div>
          <ProfilMasjid/>  
          <StrukturOrganisasiMasjid/>
          <FasilitasMasjid/>
          <RekeningMasjid/>
          <KeuanganMasjid/>
          <MubalighMasjid/>  
        </div>
        </div>
    </DefaultLayout>
  )
}

export default InformasiMasjid