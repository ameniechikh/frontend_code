import { ClipboardList, Truck, Package } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed flex flex-col p-5">
      {/* Logo / Titre */}
      <div className="text-2xl font-bold text-center mb-6">📦 Approvisionnement</div>

      {/* Liens de navigation */}
      <nav className="space-y-4">
        <Link href="/Approvisionnement/Planification">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <ClipboardList className="w-5 h-5" />
            <span>Planification MP</span>
          </div>
        </Link>

        <Link href="/Approvisionnement/ReceptionMatieres">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <Truck className="w-5 h-5" />
            <span>Réception Matières</span>
          </div>
        </Link>

        <Link href="/Approvisionnement/DemandeProduction">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <Package className="w-5 h-5" />
            <span>Demande Production</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
