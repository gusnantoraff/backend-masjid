import React, { useState, useEffect } from 'react';
import KegiatanCard from './KegiatanCard';
import axios from 'axios';
import AlertConfirm from '../Alerts/AlertConfirm';
import { useRouter } from 'next/navigation';

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
  refresh: boolean; 
}

const ListKegiatan: React.FC<ListKegiatanProps> = ({ refresh }) => {
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const fetchKegiatan = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/kegiatan');
      setKegiatanList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching kegiatan:", error);
      setError("Gagal memuat data kegiatan.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, [refresh]);

  const handleEdit = (id: number) => {
    router.push(`/kegiatan/${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedId !== null) {
      try {
        await axios.delete(`http://localhost:8000/api/kegiatan/${selectedId}`);
        setKegiatanList(kegiatanList.filter(kegiatan => kegiatan.id !== selectedId));
        setShowConfirm(false);
        setSelectedId(null);
      } catch (error) {
        console.error(`Error deleting kegiatan with ID: ${selectedId}`, error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {showConfirm && (
        <AlertConfirm
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDeleteConfirm} 
          message="Apakah Anda yakin ingin menghapus data ini?"
        />
      )}
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
              onEdit={() => handleEdit(kegiatan.id)}
              onDelete={() => handleDelete(kegiatan.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListKegiatan;
