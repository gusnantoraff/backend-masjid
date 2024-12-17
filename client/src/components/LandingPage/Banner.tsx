import JadwalSholat from "./JadwalSholat";

interface BannerProps {
  id?: string;
}

const Banner: React.FC<BannerProps> = ({ id }) => {
  return (
<section
      id={id}
      className="relative text-center"
      style={{ height: '105vh' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: "url('/images/landingpage/masjid1.jpg')",
          backgroundSize: "cover",
          height: '105vh',
          zIndex: -1,
        }}
      ></div>
  
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <h1 className="text-white font-bold text-shadow transform transition-transform duration-300 ease-in-out hover:scale-110 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          MASJID TERCODE
        </h1>
      </div>
  
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full px-4 sm:w-[90%] md:w-[70%] lg:w-[50%] z-10">
        <JadwalSholat />
      </div>
    </section>
  );
  
};

export default Banner;
