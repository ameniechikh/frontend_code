import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Commandes = () => {
  const [commandes, setCommandes] = useState([
    { id: "CMD-001", client: "Entreprise A", produit: "Fer", quantite: 100, dateCommande: "2025-02-15", dateLivraison: "2025-03-01", statut: "En attente", priorite: "Haute", notes: "Livraison urgente" },
    { id: "CMD-002", client: "Entreprise B", produit: "Acier", quantite: 50, dateCommande: "2025-02-16", dateLivraison: "2025-03-02", statut: "En production", priorite: "Moyenne", notes: "Commande standard" },
    { id: "CMD-003", client: "Entreprise C", produit: "Aluminium", quantite: 200, dateCommande: "2025-02-17", dateLivraison: "2025-03-05", statut: "Terminé", priorite: "Basse", notes: "Livraison flexible" },
  ]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">📑 Gestion des Commandes</h1>
          <div className="bg-white p-4 rounded shadow overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border p-2">ID Commande</th>
                  <th className="border p-2">Client</th>
                  <th className="border p-2">Produit</th>
                  <th className="border p-2">Quantité</th>
                  <th className="border p-2">Date Commande</th>
                  <th className="border p-2">Date Livraison</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Priorité</th>
                  <th className="border p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande) => (
                  <tr key={commande.id} className="hover:bg-gray-100 text-center">
                    <td className="border p-2">{commande.id}</td>
                    <td className="border p-2">{commande.client}</td>
                    <td className="border p-2">{commande.produit}</td>
                    <td className="border p-2">{commande.quantite}</td>
                    <td className="border p-2">{commande.dateCommande}</td>
                    <td className="border p-2">{commande.dateLivraison}</td>
                    <td className={`border p-2 ${commande.statut === "Terminé" ? "text-green-600" : commande.statut === "Annulé" ? "text-red-600" : "text-yellow-600"}`}>{commande.statut}</td>
                    <td className="border p-2">{commande.priorite}</td>
                    <td className="border p-2">{commande.notes}</td>
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

export default Commandes;
