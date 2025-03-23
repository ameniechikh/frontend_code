import Link from "next/link";
import { Home, ShoppingCart, FileText, User } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 !bg-blue-100 h-screen fixed left-0 top-0 p-5 z-50 shadow-xl">
      {/* Logo circulaire */}
      <div className="mb-10 flex justify-center">
        <div className="p-2 bg-white rounded-full border-4 border-amber-300">
          <div className="w-24 h-24 relative rounded-full overflow-hidden">
            <img
              src="/logo6.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Menu de navigation */}
      <nav className="flex flex-col space-y-3">
        {/* Accès rapide aux pages principales */}
        <Link href="/Commercial/portefeuille" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-blue-200">
            <Home className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Portefeuille Clients</span>
          </a>
        </Link>

        <Link href="/Commercial/CreationDevis" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-blue-200">
            <ShoppingCart className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Création Devis</span>
          </a>
        </Link>

        <Link href="/Commercial/Livraisons" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-blue-200">
            <FileText className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Suivi Livraisons</span>
          </a>
        </Link>

     
      </nav>
    </aside>
  );
};

export default Sidebar;
