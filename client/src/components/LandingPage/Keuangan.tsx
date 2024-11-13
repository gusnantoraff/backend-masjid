interface KeuanganProps {
  id?: string;
}

const Keuangan: React.FC<KeuanganProps> = ({ id }) => {
  return (
    <section id={id} className="py-10">
      <h2 className="text-3xl text-gray-700 mb-6 font-poppins">Keuangan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <img src="/images/masjid.jpg" alt="Donasi" className="w-full h-40 object-cover rounded-md"/>
          <h3 className="text-xl mt-4">Bantu Korban Gempa Turki</h3>
          <p className="text-gray-700 mt-2">Rp 45,000,000 dari target Rp 100,000,000</p>
        </div>
        {/* Add more donation cards */}
      </div>
    </section>
  );
};

export default Keuangan;
