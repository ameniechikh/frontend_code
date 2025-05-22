import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard,
  Package,
  ClipboardList,
  ScanSearch,
  FileText,
  Inbox,
  History,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col p-4">
      {/* Logo circulaire */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <img 
            src="/logo6.png" 
            alt="Monseb Logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link 
          href="/Magasinie/DashboardStock"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'dashboard' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard Stock</span>
        </Link> 
        <Link
          href="/Magasinie/GestionCommandes"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'sortie' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span>Gestion Commandes clients</span>
        </Link>
       

        <Link
          href="/Magasinie/FicheProduit"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'produits' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <Package className="w-5 h-5" />
          <span>Gestion des Produits Finis</span>
        </Link>

        <Link
          href="/Magasinie/BonSortie"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'sortie' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span> Gérer Stock Sortie</span>
        </Link>

        <Link
          href="/Magasinie/GestionClients"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'inventaire' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <ScanSearch className="w-5 h-5" />
          <span>Gestion Clients</span>
        </Link>

        

        

        <Link
          href="/Magasinie/HistoriqueMouvements"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            activeTab === 'historique' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-800'
          }`}
        >
          <History className="w-5 h-5" />
          <span>Historique des Mouvements</span>
        </Link>
      </nav>

    
    </div>
  );
};

export default Sidebar;