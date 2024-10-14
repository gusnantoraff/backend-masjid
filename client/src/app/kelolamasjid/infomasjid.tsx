import { FiPhone, FiMapPin } from "react-icons/fi";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { FiGlobe } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";

const InfoMasjid = () => {
    return (
        <div className="mb-6 mt-4 text-left h-full">
            <div className="mb-4 flex justify-center gap-4">
                <img
                    src="/images/masjid.jpg"
                    alt="Logo Masjid"
                    className="h-20 w-20"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Masjid</h1>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-2xl font-bold">Al-Ikhlas</h1>
                    </div>
                </div>
            </div>
            <div className="mb-4 flex justify-center gap-4">
                <ButtonDefault
                    link="/website"
                    customClasses="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Website"
                >
                    <FiGlobe className="mr-2" />
                </ButtonDefault>
                <ButtonDefault
                    link="/donasi"
                    customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                    label="Donasi"
                >
                    <BiDonateHeart className="mr-2" />
                </ButtonDefault>
            </div>
            <div className="m-2 grid grid-cols-1 gap-4">
                {/* Kontak - Nomor Telepon */}
                <div className="flex items-center">
                    <div>
                        <p className="text-gray-600">
                            <FiPhone className="mr-1 inline" /> +62
                            812-3456-7890
                        </p>
                    </div>
                </div>

                {/* Kontak - Alamat */}
                <div className="flex items-center">
                    <div>
                        <p className="text-gray-600">
                            <FiMapPin className="mr-1 inline" /> Jl. Masjid Raya
                            No.123, Jakarta
                        </p>
                    </div>
                </div>

                {/* Peta Lokasi */}
                <div className="mt-1">
                    <h3 className="mb-2 text-lg font-medium">Peta Lokasi</h3>
                    <iframe
                        className="h-64 w-full border-2 border-gray-300"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126816.08908825882!2d106.68942939624023!3d-6.229728791640065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4e9d8d2c1b1%3A0x7b129f6911a5390e!2sMasjid!5e0!3m2!1sen!2sid!4v1634561234567!5m2!1sen!2sid"
                        loading="lazy"
                        title="Peta Lokasi Masjid"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default InfoMasjid;
