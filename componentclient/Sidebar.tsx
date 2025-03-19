import Link from "next/link";
import { FileText } from "lucide-react";
import { Home, ShoppingCart, User, HelpCircle } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 !bg-purple-100 h-screen fixed left-0 top-0 p-5 z-50 shadow-xl">
      {/* Logo circulaire */}
      <div className="mb-10 flex justify-center">
        <div className="p-2 bg-white rounded-full border-4 border-amber-300">
          <div className="w-24 h-24 relative rounded-full overflow-hidden">
            <Image 
              src="/logo6.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              className="p-1"
            />
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-3">
        <Link href="/client/home" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <Home className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Accueil</span>
          </a>
        </Link>

        <Link href="/client/shop" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <ShoppingCart className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Industria Fer</span>
          </a>
        </Link>

        <Link href="/client/account" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Mon Compte</span>
          </a>
        </Link>

        <Link href="/client/history" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <FileText className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Historique</span>
          </a>
        </Link>

        <Link href="/client/support" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <HelpCircle className="text-black w-6 h-6" />
            <span className="text-black font-semibold">Support</span>
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
