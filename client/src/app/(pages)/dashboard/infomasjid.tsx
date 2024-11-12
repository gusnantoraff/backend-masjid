import { FiPhone, FiMapPin } from "react-icons/fi";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { FiGlobe } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";

const InfoMasjid = () => {
    return (
        <div className="mb-6 mt-4 h-full text-left">
            <div className="mb-4 flex justify-center gap-4">
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Masjid Al-Huda</h1>
                    </div>
                </div>
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
                <div>
                        <h1 className="mb-2 text-2xl font-bold">Deskripsi</h1>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Commodi impedit quidem error magnam nulla deleniti
                        eum porro, praesentium fugit ipsa exercitationem
                        corrupti voluptatem minus rem! Molestiae culpa cumque
                        quos labore?
                </div>
            </div>
        </div>
    );
};

export default InfoMasjid;
