import Link from "next/link";
import { Home, ShoppingCart, Package, Users, FileText, BarChart, ListOrdered } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 !bg-amber-50 h-screen fixed left-0 top-0 p-5 z-50 shadow-xl">
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
        <Link href="/Commercial/Dashboard" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <Home className="text-amber-900 w-6 h-6" />
            <span className="text-amber-900 font-semibold">Tableau de Bord</span>
          </a>
        </Link>

        <Link href="/Commercial/GestionCommandes" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <ShoppingCart className="text-amber-900 w-6 h-6" />
            <span className="text-amber-900 font-semibold">Commandes Clients</span>
          </a>
        </Link>
        <Link href="/Commercial/GestionCommandesFournisseurs" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <Package className="text-amber-900 w-6 h-6" />
            <span className="text-amber-900 font-semibold">Commandes Fournisseurs</span>
          </a>
        </Link>
        <Link href="/Commercial/GestionClients" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <Users className="text-amber-900 w-6 h-6" />
            <span className="text-amber-900 font-semibold">Gestion Clients</span>
          </a>
        </Link>

        <Link href="/Commercial/GestionFournisseurs" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <Users className="text-amber-900 w-6 h-6" />
            <span className="text-amber-900 font-semibold">Gestion Fournisseurs</span>
          </a>
        </Link>

       

      

        <Link href="/Commercial/FacturesRapports" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-100 transition-colors">
            <div className="relative">
              <FileText className="text-amber-900 w-6 h-6" />
              <BarChart className="absolute -right-2 -top-2 text-amber-900 w-4 h-4" />
            </div>
            <span className="text-amber-900 font-semibold">Factures & Rapports</span>
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;