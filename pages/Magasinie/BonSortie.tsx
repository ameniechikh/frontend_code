import React, { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Truck, Printer, CheckCircle, Package } from "lucide-react";
import jsPDF from "jspdf";

const StockSortie = () => {
  const [commandes, setCommandes] = useState([
    {
      id: "CMD-2401",
      client: "Société ABC",
      produits: [
        { ref: "AC-S355", quantité: 50 },
        { ref: "AL-6061", quantité: 30 },
      ],
      dateSortie: "2024-03-20",
      statut: "En préparation",
    },
    {
      id: "CMD-2402",
      client: "Entreprise XYZ",
      produits: [
        { ref: "CU-C1020", quantité: 20 },
      ],
      dateSortie: "2024-03-21",
      statut: "Livré",
    },
    {
      id: "CMD-2403",
      client: "Global Industries",
      produits: [
        { ref: "ST-400X", quantité: 15 },
        { ref: "ALU-7075", quantité: 10 },
      ],
      dateSortie: "2024-05-20",
      statut: "En préparation",
    }
  ]);

  // ✏️ Modifier la quantité d’un produit
  const handleQuantiteChange = (commandeId, indexProduit, nouvelleQuantite) => {
    setCommandes(prevCommandes =>
      prevCommandes.map(cmd => {
        if (cmd.id === commandeId) {
          const produitsModifiés = [...cmd.produits];
          produitsModifiés[indexProduit].quantité = parseInt(nouvelleQuantite);
          return { ...cmd, produits: produitsModifiés };
        }
        return cmd;
      })
    );
  };

  // ✅ Valider une sortie
  const handleValiderSortie = (commandeId) => {
    setCommandes(prevCommandes =>
      prevCommandes.map(cmd =>
        cmd.id === commandeId ? { ...cmd, statut: "Livré" } : cmd
      )
    );
  };

  // 🖨️ Générer le PDF
  const handleImprimerBon = (commandeId) => {
    const commande = commandes.find(cmd => cmd.id === commandeId);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Bon de Sortie", 20, 20);
    doc.setFontSize(12);
    doc.text(`Commande: ${commande.id}`, 20, 30);
    doc.text(`Client: ${commande.client}`, 20, 40);
    doc.text(`Date de sortie: ${commande.dateSortie}`, 20, 50);
    doc.text("Produits:", 20, 60);

    let y = 70;
    commande.produits.forEach((produit, index) => {
      doc.text(`- ${produit.ref} : ${produit.quantité} unités`, 25, y + (index * 10));
    });

    doc.text(`Statut: ${commande.statut}`, 20, y + commande.produits.length * 10 + 10);
    doc.save(`Bon_Sortie_${commande.id}.pdf`);
  };

  // 🟢 Badge de statut
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
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Package className="text-blue-500" size={24} />
                Gestion du Stock de Sortie
              </h2>
            </div>

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
                              {produit.ref} :{" "}
                              <input
                                type="number"
                                min={0}
                                value={produit.quantité}
                                onChange={(e) =>
                                  handleQuantiteChange(commande.id, index, e.target.value)
                                }
                                className="w-20 border rounded px-2 py-1 text-sm"
                              />{" "}
                              u
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <-- Section de validation groupée supprimée --> */}
        </div>
      </div>
    </div>
  );
};

export default StockSortie;
