import { useState } from "react";
import Link from "next/link";
import { Home, ShoppingCart, User, HelpCircle } from "lucide-react";
import { Package, FileText, AlertCircle, LogOut } from "lucide-react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col p-4">
      <div className="text-xl font-bold mb-6 text-center">📦 Magasin</div>
      
      <nav className="flex flex-col space-y-4">
      
        
        <Link href="/Magasinie/DashboardStock" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Dashboard Stock</span>
          </a>
        </Link>
        <Link href="/Magasinie/FicheProduit" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Fiche Produit</span>
          </a>
        </Link>
        <Link href="/Magasinie/BonSortie" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Bon de Sortie</span>
          </a>
        </Link>
        <Link href="/Magasinie/ControleQualite" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Contrôle Qualité</span>
          </a>
        </Link>
         <Link href="/Magasinie/TrackingColis" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Tracking Colis</span>
          </a>
        </Link>
        <Link href="/Magasinie/InventaireIntelligent" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Inventaire Intelligent</span>
          </a>
        </Link>
        <Link href="/Magasinie/PreparationCommande" legacyBehavior>
          <a className="flex items-center space-x-3 p-3 rounded-lg !hover:bg-purple-200">
            <User className="text-black w-6 h-6" />
            <span className="text-white font-semibold">Préparation Commande</span>
          </a>
        </Link>
        
        
      </nav>
      
      <div className="mt-auto">
       
      </div>
    </div>
  );
};

export default Sidebar;
