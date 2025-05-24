import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, Bell, Package, ClipboardList, Truck, MessageSquare, FileText } from "lucide-react";

const SidebarFournisseur = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Tableau de Bord", path: "/Fournisseur/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Catalogue matières premières", path: "/Fournisseur/catalogue", icon: <Package size={20} /> },
    { name: "Historique Commandes", path: "/Fournisseur/commandes", icon: <ClipboardList size={20} /> },
    { name: "  Factures et Paiements", path: "/Fournisseur/factures", icon: <FileText size={20} /> },
    { name: "Messagerie", path: "/Fournisseur/messagerie", icon: <MessageSquare size={20} /> },
    { name: "Notifications", path: "/Fournisseur/Notifications", icon: <Bell size={20} /> },
  ];

  return (
    <aside className="w-64 bg-black text-white h-screen fixed left-0 top-0 p-5 z-50 shadow-2xl">
      {/* Logo modifié */}
      <div className="p-6 flex items-center justify-center"> {/* Centrage ajouté */}
        <img 
          src="/logo6.png" 
          alt="SteelFlow Pro" 
          className="h-12 w-12 rounded-full border-2 border-white p-1 object-cover" 
        />
      </div>

      {/* Menu reste inchangé */}
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition duration-300 ${
                  router.pathname === item.path ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarFournisseur;