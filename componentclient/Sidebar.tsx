import Link from "next/link";
import { FileText, Tag, Home, ShoppingCart, User, HelpCircle } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-100 h-screen fixed left-0 top-0 p-5 z-50 shadow-xl">
      {/* Section Logo circulaire */}
      <div className="mb-10 flex justify-center">
        <div className="p-2 bg-white rounded-full border-4 border-amber-300 shadow-lg">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-800">
            <Image 
              src="/logo6.png"
              alt="Logo N7BEHA"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      {/* Menu de navigation */}
      <nav className="flex flex-col space-y-3">
        <Link href="/client/home" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <Home className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Accueil</span>
          </a>
        </Link>

        <Link href="/client/shop" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <ShoppingCart className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Industria Fer</span>
          </a>
        </Link>

        <Link href="/client/OffresRecherche" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <Tag className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Offres & Recherche</span>
          </a>
        </Link>

        <Link href="/client/account" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <User className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Mon Compte</span>
          </a>
        </Link>

        <Link href="/client/history" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <FileText className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Historique</span>
          </a>
        </Link>

        <Link href="/client/support" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-200">
            <HelpCircle className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Support</span>
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;