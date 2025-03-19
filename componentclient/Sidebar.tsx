import Link from "next/link";
import { Home, ShoppingCart, User, HelpCircle } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-600 text-white h-screen fixed left-0 top-0 p-5 z-50">
      {/* Logo */}
      <div className="mb-5 border-b border-blue-500 pb-5">
        <Image 
          src="/logo6.png"
          alt="SmartSteel Logo"
          width={160}
          height={200}
          className="object-contain"
        />
      </div>

      <nav className="flex flex-col space-y-2">
        <Link href="/client/home" legacyBehavior>
          <a className="flex items-center space-x-2 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200">
            <Home className="text-blue-200" />
            <span>Accueil</span>
          </a>
        </Link>

        <Link href="/client/shop" legacyBehavior>
          <a className="flex items-center space-x-2 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200">
            <ShoppingCart className="text-blue-200" />
            <span>Boutique</span>
          </a>
        </Link>

        <Link href="/client/account" legacyBehavior>
          <a className="flex items-center space-x-2 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200">
            <User className="text-blue-200" />
            <span>Mon Compte</span>
          </a>
        </Link>

        <Link href="/client/support" legacyBehavior>
          <a className="flex items-center space-x-2 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200">
            <HelpCircle className="text-blue-200" />
            <span>Support</span>
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;