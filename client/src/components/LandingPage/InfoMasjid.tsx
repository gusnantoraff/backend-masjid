interface InfoMasjidProps {
  id?: string;
}

const InfoMasjid: React.FC<InfoMasjidProps> = ({ id }) => {
  return (
    <section id={id} className="py-30 flex flex-col items-center">
      <h2 className="text-5xl text-gray-700 mb-6 font-poppins">Profil Masjid Tercode</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-xl">Profile</h3>
          <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </section>
  );
};

export default InfoMasjid;
