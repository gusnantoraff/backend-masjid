import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


interface Berita {
  id: number;
  judul: string;
  konten: string;
  tanggal_publikasi: string;
  kategori: string;
  status: string;
  foto: string;
}

interface NewsSectionProps {
  id?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ id }) => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/berita');
        setBerita(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching berita:", error);
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  const stripHtmlTags = (content: string) => {
    return content
      .replace(/&nbsp;/g, ' ')
      .replace(/<\/?[^>]+(>|$)/g, "");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id={id} className="py-10">
      <h2 className="text-3xl text-gray-700 mb-6 font-poppins">Berita</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {berita.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg">
            <div className="relative w-full h-40 mb-4">
              <Image
                src={`http://localhost:8000/storage/${item.foto}`}
                alt={item.judul}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-poppins">{item.judul}</h3>
            <p className="text-gray-700 text-sm mb-2 font-poppins">{stripHtmlTags(item.konten).slice(0, 100)}...</p>
            <p className="text-gray-500 text-xs font-poppins">{item.tanggal_publikasi}</p>
            <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg font-poppins">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
