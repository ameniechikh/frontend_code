import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f1f1f1]  text-black py-6">
      <div className="container mx-auto px-6">
        {/* Réseaux sociaux */}
        <div className="flex justify-center space-x-4 mb-4">
          <FaFacebook className="text-black-400 hover:text-white text-2xl cursor-pointer" />
          <FaTwitter className="text-black-400 hover:text-white text-2xl cursor-pointer" />
          <FaInstagram className="text-black-400 hover:text-white text-2xl cursor-pointer" />
          <FaYoutube className="text-black-400 hover:text-white text-2xl cursor-pointer" />
          <FaLinkedin className="text-black-400 hover:text-white text-2xl cursor-pointer" />
        </div>

        {/* Sections */}
      

        {/* Copyright */}
        <p className="text-center  text-black py-6 mt-4">
          © 2025 SmartSteel - Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
