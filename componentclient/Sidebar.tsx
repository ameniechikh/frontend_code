import Link from "next/link";
import { Home, LayoutDashboard, ShoppingCart, Tag, User, FileText, HelpCircle } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white h-screen fixed left-0 top-0 p-5 z-50 shadow-2xl">
      {/* Logo circulaire */}
      <div className="mb-10 flex justify-center">
        <div className="p-2 bg-white rounded-full border-4 border-indigo-500 shadow-lg">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-700">
            <Image
              src="/logo6.png"
              alt="Logo"
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      {/* Menu de navigation */}
      <nav className="flex flex-col space-y-2">
        <SidebarLink href="/client/home" label="Accueil" Icon={Home} />
        
        <SidebarLink href="/client/shop" label="Industria Fer" Icon={ShoppingCart} />
        <SidebarLink href="/client/OffresRecherche" label="Offres & Recherche" Icon={Tag} />
        <SidebarLink href="/client/account" label="Mon Compte" Icon={User} />
        <SidebarLink href="/client/history" label="Historique" Icon={FileText} />
        <SidebarLink href="/client/support" label="Support" Icon={HelpCircle} />
      </nav>
    </aside>
  );
};

// Composant lien pour simplifier
const SidebarLink = ({ href, label, Icon }) => (
  <Link href={href} legacyBehavior>
    <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200">
      <Icon className="w-5 h-5 text-indigo-300" />
      <span className="font-semibold text-white">{label}</span>
    </a>
  </Link>
);

export default Sidebar;
