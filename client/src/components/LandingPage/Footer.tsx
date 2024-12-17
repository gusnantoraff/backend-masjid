import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

interface FooterProps {
  id?: string;
}

const Footer: React.FC<FooterProps> = ({ id }) => {
  return (
    <footer id={id} className="bg-gray-200 py-8 text-gray-700 font-poppins font-semibold">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <div className="flex flex-col md:flex-row justify-center md:space-x-20 text-center md:text-left">
          
          {/* Address Section */}
          <div className="flex flex-col items-center md:items-start text-left space-y-2">
            <FaMapMarkerAlt className="text-ijo" size={24} />
            <h3 className="text-xl text-gray-700">Alamat Lengkap</h3>
            <p className="text-md font-light">Jl. Raya Janti No.223, RT.07/RW.20, Modalan, Banguntapan,</p>
            <p className="text-md font-light">Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55198</p>
          </div>

          {/* Email Section */}
          <div className="flex flex-col items-center md:items-start text-left space-y-2">
            <FaEnvelope className="text-ijo" size={24} />
            <h3 className="text-xl text-gray-700">Email</h3>
            <p className="text-md hover:text-ijo font-light"><a href='mailto:masjidtercode@gmail.com?subject=Subject&body=Body%20of%20the%20email'>masjidtercode@gmail.com</a></p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start text-left space-y-2">
            <FaPhone className="text-ijo" size={24} />
            <h3 className="text-xl text-gray-700">Kontak</h3>
            <p className="text-md font-light">(+62)8123456789</p>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start text-left space-y-2">
            <FaUserGroup className="text-ijo" size={24} />
            <h3 className="text-xl text-gray-700">Sosial Media</h3>
            <div className="flex flex-col items-center md:items-start space-y-2">
              <a href="#" className="flex items-center text-md text-red-400 hover:text-red-600 transition duration-200 font-light" aria-label="Instagram">
                <FaInstagram className="mr-1" size={16} /> Instagram
              </a>
              <a href="#" className="flex items-center text-md text-red hover:text-red-600 transition duration-200 font-light" aria-label="YouTube">
                <FaYoutube className="mr-1" size={16} /> YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="text-center text-gray-500 border-t border-gray-300 w-full pt-4 font-light">
          <p>Masjid Tercode</p>
          <p>Copyright &copy; 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
