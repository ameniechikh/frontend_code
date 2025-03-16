import Link from "next/link";
import { LayoutDashboard, Package, ClipboardList, Users, Bell, Factory, Warehouse } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64  bg-black text-white flex flex-col min-h-screen">
      {/* Logo et titre */}
      <div className="p-4 flex items-center space-x-2">
        <img src="/logo6.png" alt="Logo" className="w-15 h-15" />
        
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <LayoutDashboard size={20} /> <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <Package size={20} /> <Link href="/produits">Produits</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <ClipboardList size={20} /> <Link href="/commandes">Commandes</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <Users size={20} /> <Link href="/employes">Employés</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <Bell size={20} /> <Link href="/alertes">Alertes</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <Factory size={20} /> <Link href="/production">Production</Link>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
            <Warehouse size={20} /> <Link href="/Stock">Stocks</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
