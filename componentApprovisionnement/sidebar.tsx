import { LayoutDashboard, Boxes, ShoppingCart, FileText, ListOrdered, Receipt } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed flex flex-col p-5">
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white">
          <Image 
            src="/logo6.png" // Remplacez par le chemin de votre logo
            alt="Logo"
            fill
            className="h-20 w-20 rounded-full border-2 border-white p-1 object-cover"
          />
        </div>
      </div>

      {/* Liens de navigation */}
      <nav className="space-y-4">
        <Link href="/Approvisionnement/Dashboard">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Tableau de Bord</span>
          </div>
        </Link>

        <Link href="/Approvisionnement/CatalogueMatieres">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <Boxes className="w-5 h-5" />
            <span>Catalogue matières premières</span>
          </div>
        </Link>

       

        <Link href="/Approvisionnement/DemandeAchat">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <FileText className="w-5 h-5" />
            <span>Demande d'achat</span>
          </div>
        </Link>

        <Link href="/Approvisionnement/SuiviCommandes">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <ListOrdered className="w-5 h-5" />
            <span>Suivi des commandes</span>
          </div>
        </Link>

        <Link href="/Approvisionnement/FacturesPaiements">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
            <Receipt className="w-5 h-5" />
            <span>Factures et paiements</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;