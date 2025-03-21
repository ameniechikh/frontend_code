import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, Package, ClipboardList, Truck, MessageSquare, FileText } from "lucide-react";

const SidebarFournisseur = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Tableau de Bord", path: "/Fournisseur/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Catalogue", path: "/Fournisseur/catalogue", icon: <Package size={20} /> },
    { name: "Commandes", path: "/Fournisseur/commandes", icon: <ClipboardList size={20} /> },
    { name: "Historique Livraisons", path: "/Fournisseur/historique-livraisons", icon: <Truck size={20} /> },
    { name: "Messagerie", path: "/Fournisseur/messagerie", icon: <MessageSquare size={20} /> },
    { name: " Factures", path: "/Fournisseur/factures", icon: <FileText size={20} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3">
        <img src="/logo6.png" alt="SteelFlow Pro" className="h-10" />
        <h1 className="text-xl font-semibold tracking-wide">SteelFlow Pro</h1>
      </div>

      {/* Menu */}
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
