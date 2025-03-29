import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";

const StockEntree = () => {
  // Données simulées pour le stock d'entrée
  const [stockEntree, setStockEntree] = useState([
    {
      idCommande: "MSNO3-2023-001",
      matiere: "Acier Inoxydable",
      quantiteCommandee: 500,
      quantiteReçue: 500,
      unite: "kg",
      prixUnitaire: 8,
      coutTotal: 500 * 8,
      fournisseur: "MetalWorks Ltd.",
      contact: "John Doe",
      dateCommande: "2025-03-01",
      dateLivraisonPrevue: "2025-03-10",
      dateReception: "2025-03-10",
      stockActuel: 1500,
      stockMinimum: 300,
      statut: "Livrée",
      emplacement: "Zone B-12",
    },
    {
      idCommande: "MSNO3-2023-002",
      matiere: "Aluminium",
      quantiteCommandee: 300,
      quantiteReçue: 290,
      unite: "kg",
      prixUnitaire: 12,
      coutTotal: 290 * 12,
      fournisseur: "AluTech Co.",
      contact: "Jane Smith",
      dateCommande: "2025-03-05",
      dateLivraisonPrevue: "2025-03-15",
      dateReception: "2025-03-16",
      stockActuel: 900,
      stockMinimum: 200,
      statut: "Partiellement Livrée",
      emplacement: "Zone C-05",
    },
    {
      idCommande: "MSNO3-2023-003",
      matiere: "Cuivre",
      quantiteCommandee: 100,
      quantiteReçue: 100,
      unite: "kg",
      prixUnitaire: 20,
      coutTotal: 100 * 20,
      fournisseur: "CopperWorld",
      contact: "Mike Brown",
      dateCommande: "2025-02-25",
      dateLivraisonPrevue: "2025-03-05",
      dateReception: "2025-03-06",
      stockActuel: 500,
      stockMinimum: 150,
      statut: "Livrée",
      emplacement: "Zone A-02",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar sticky à gauche */}
      <div className="w-64 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header en haut */}
        <Header />

        {/* Main content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">📦 Stock d'Entrée</h1>

          <div className="bg-white p-4 rounded shadow overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID Commande</th>
                  <th className="border p-2">Nom Matière</th>
                  <th className="border p-2">Qté Commandée</th>
                  <th className="border p-2">Qté Reçue</th>
                  <th className="border p-2">Unité</th>
                  <th className="border p-2">Prix Unitaire (€)</th>
                  <th className="border p-2">Coût Total (€)</th>
                  <th className="border p-2">Fournisseur</th>
                  <th className="border p-2">Contact</th>
                  <th className="border p-2">Date Commande</th>
                  <th className="border p-2">Date Livraison Prévue</th>
                  <th className="border p-2">Date Réception</th>
                  <th className="border p-2">Stock Actuel</th>
                  <th className="border p-2">Stock Min.</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Emplacement</th>
                </tr>
              </thead>
              <tbody>
                {stockEntree.map((stock, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{stock.idCommande}</td>
                    <td className="border p-2">{stock.matiere}</td>
                    <td className="border p-2">{stock.quantiteCommandee}</td>
                    <td className="border p-2">{stock.quantiteReçue}</td>
                    <td className="border p-2">{stock.unite}</td>
                    <td className="border p-2">{stock.prixUnitaire} €</td>
                    <td className="border p-2">{stock.coutTotal} €</td>
                    <td className="border p-2">{stock.fournisseur}</td>
                    <td className="border p-2">{stock.contact}</td>
                    <td className="border p-2">{stock.dateCommande}</td>
                    <td className="border p-2">{stock.dateLivraisonPrevue}</td>
                    <td className="border p-2">{stock.dateReception}</td>
                    <td className="border p-2">{stock.stockActuel}</td>
                    <td className="border p-2">{stock.stockMinimum}</td>
                    <td
                      className={`border p-2 font-bold ${
                        stock.statut === "Livrée"
                          ? "text-green-600"
                          : stock.statut === "Partiellement Livrée"
                          ? "text-orange-500"
                          : "text-red-600"
                      }`}
                    >
                      {stock.statut}
                    </td>
                    <td className="border p-2">{stock.emplacement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default StockEntree;
