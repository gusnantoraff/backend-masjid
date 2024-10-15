import React from 'react';
import KegiatanCard from './KegiatanCard';

interface Image {
  id: number;
  keterangan: string;
  kategori: string;
  image: string;
}

interface Kegiatan {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  lokasi: string;
  kategori: string;
  keterangan: string;
  images: Image[];
}

interface ListKegiatanProps {
  kegiatanList: Kegiatan[]; 
  onEdit: (id: number) => void; 
  onDelete: (id: number) => void;
}

const ListKegiatan: React.FC<ListKegiatanProps> = ({ kegiatanList, onEdit, onDelete }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {kegiatanList.map((kegiatan) => {
        const getFotoUrl = kegiatan.images.length > 0
          ? `http://localhost:8000/storage/${kegiatan.images[0].image}` 
          : 'https://via.placeholder.com/300'; 

        return (
          <KegiatanCard
            key={kegiatan.id}
            nama_kegiatan={kegiatan.nama_kegiatan}
            tanggal={kegiatan.tanggal}
            lokasi={kegiatan.lokasi}
            foto={getFotoUrl}
            onEdit={() => onEdit(kegiatan.id)} 
            onDelete={() => onDelete(kegiatan.id)}
          />
        );
      })}
    </div>
  );
};

export default ListKegiatan;
