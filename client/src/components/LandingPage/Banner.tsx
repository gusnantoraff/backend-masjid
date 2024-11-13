import JadwalSholat from "./JadwalSholat";

const Banner = () => {
  return (
    <section 
      className="relative text-center"
      style={{ height: '950px' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: "url('/images/landingpage/masjid1.jpg')",
          backgroundSize: "cover",
          height: '950px',
          zIndex: -1,
        }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="heading-1 text-white font-bold text-shadow transform transition-transform duration-300 ease-in-out hover:scale-110">
          MASJID TERCODE
        </h1>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[1100px] z-10">
        <JadwalSholat />
      </div>
    </section>
  );
};

export default Banner;
