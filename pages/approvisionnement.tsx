import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";

const Approvisionnement = () => {
  // Liste des commandes fournisseurs
  const [commandes, setCommandes] = useState([
    {
      fournisseur: "Fournisseur A",
      contact: "John Doe",
      composant: "Acier Inoxydable",
      reference: "MP-ACIER-005",
      quantite: 120,
      prixUnitaire: 500,
      totalHT: 120 * 500,
      dateLivraison: "2025-04-10",
      dateApprovisionnement: "2025-03-20", // ✅ Ajout de la date d'approvisionnement
    },
    {
      fournisseur: "Fournisseur B",
      contact: "Jane Smith",
      composant: "Circuits électroniques",
      reference: "MP-ELEC-012",
      quantite: 200,
      prixUnitaire: 30,
      totalHT: 200 * 30,
      dateLivraison: "2025-04-15",
      dateApprovisionnement: "2025-03-25", // ✅ Ajout de la date d'approvisionnement
    },
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">📦 Gestion des Commandes Fournisseur</h1>

          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Fournisseur</th>
                  <th className="border p-2">Contact</th>
                  <th className="border p-2">Composant</th>
                  <th className="border p-2">Référence</th>
                  <th className="border p-2">Quantité</th>
                  <th className="border p-2">Prix Unitaire (€)</th>
                  <th className="border p-2">Total HT (€)</th>
                  <th className="border p-2">Date Livraison</th>
                  <th className="border p-2">Date d'Approvisionnement</th> {/* ✅ Nouvelle colonne */}
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{commande.fournisseur}</td>
                    <td className="border p-2">{commande.contact}</td>
                    <td className="border p-2">{commande.composant}</td>
                    <td className="border p-2">{commande.reference}</td>
                    <td className="border p-2">{commande.quantite}</td>
                    <td className="border p-2">{commande.prixUnitaire} €</td>
                    <td className="border p-2">{commande.totalHT} €</td>
                    <td className="border p-2">{commande.dateLivraison}</td>
                    <td className="border p-2">{commande.dateApprovisionnement}</td> {/* ✅ Affichage */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Approvisionnement;
