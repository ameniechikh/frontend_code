import React, { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Truck, Printer, CheckCircle, Mail, Package } from "lucide-react";

const StockSortie = () => {
  const [commandes, setCommandes] = useState([
    {
      id: "CMD-2401",
      client: "Société ABC",
      produits: [
        { ref: "AC-S355", quantité: 50 },
        { ref: "AL-6061", quantité: 30 }
      ],
      dateSortie: "2024-03-20",
      statut: "En préparation",
    },
    {
      id: "CMD-2402",
      client: "Entreprise XYZ",
      produits: [
        { ref: "CU-C1020", quantité: 20 }
      ],
      dateSortie: "2024-03-21",
      statut: "Livré",
    }
  ]);

  const handleValiderSortie = (commandeId) => {
    setCommandes(commandes.map(cmd => 
      cmd.id === commandeId ? { ...cmd, statut: "Livré" } : cmd
    ));
  };

  const handleImprimerBon = (commandeId) => {
    const commande = commandes.find(cmd => cmd.id === commandeId);
    console.log("Impression du bon pour:", commande);
    // Logique d'impression ici
  };

  const handleEnvoyerConfirmation = (commandeId) => {
    const commande = commandes.find(cmd => cmd.id === commandeId);
    console.log("Envoi confirmation pour:", commande);
    // Logique d'envoi email ici
  };

  const StatusBadge = ({ statut }) => {
    const statusConfig = {
      "En préparation": "bg-orange-100 text-orange-700",
      "Livré": "bg-green-100 text-green-700",
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusConfig[statut]}`}>
        {statut}
      </span>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* En-tête */}
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Package className="text-blue-500" size={24} />
                Gestion du Stock de Sortie
              </h2>
            </div>

            {/* Tableau des commandes */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Commande</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Produits</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantité Totale</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Statut</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {commandes.map((commande) => (
                    <tr key={commande.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{commande.id}</td>
                      <td className="px-4 py-3">{commande.client}</td>
                      <td className="px-4 py-3">
                        <ul className="list-disc list-inside">
                          {commande.produits.map((produit, index) => (
                            <li key={index}>
                              {produit.ref} ({produit.quantité}u)
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3">
                        {commande.produits.reduce((acc, curr) => acc + curr.quantité, 0)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge statut={commande.statut} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {commande.statut === "En préparation" && (
                            <button
                              onClick={() => handleValiderSortie(commande.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                              title="Valider la sortie"
                            >
                              <CheckCircle size={20} />
                            </button>
                          )}
                          <button
                            onClick={() => handleImprimerBon(commande.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                            title="Imprimer le bon"
                          >
                            <Printer size={20} />
                          </button>
                          <button
                            onClick={() => handleEnvoyerConfirmation(commande.id)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-md"
                            title="Envoyer confirmation"
                          >
                            <Mail size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section de validation groupée */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="text-blue-600" size={20} />
                <span className="font-medium">Validation de sortie groupée</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <CheckCircle size={18} /> Valider les sorties sélectionnées
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSortie;