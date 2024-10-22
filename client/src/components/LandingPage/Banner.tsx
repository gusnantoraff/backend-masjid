import JadwalSholat from "./JadwalSholat";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-center"
      style={{ backgroundImage: "url('/images/BG.png')", height: '950px' }}
    >
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[1100px]">
        <JadwalSholat />
      </div>
    </section>
  );
};

export default Banner;
