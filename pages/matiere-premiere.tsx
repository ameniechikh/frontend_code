import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MatierePremiere = () => {
  const [search, setSearch] = useState("");

  const matieres = [
    { id: "MP-001", nom: "Acier Inoxydable", description: "Tôle d’acier", fournisseur: "MétalPlus", unite: "kg", stock: 1500, stock_securite: 500, delai: "7 jours", cout: "5.50 €", derniere_livraison: "15/10/2023", prochaine_commande: "25/11/2023", statut: "À Réapprovisionner" },
    { id: "MP-002", nom: "Plastique ABS", description: "Granulés moulés", fournisseur: "PolyTech", unite: "kg", stock: 800, stock_securite: 300, delai: "5 jours", cout: "3.20 €", derniere_livraison: "20/10/2023", prochaine_commande: "10/11/2023", statut: "Normal" },
    { id: "MP-003", nom: "Électronique C5", description: "Circuit imprimé", fournisseur: "ElectroFournisseur", unite: "unité", stock: 200, stock_securite: 100, delai: "10 jours", cout: "12.00 €", derniere_livraison: "10/10/2023", prochaine_commande: "05/12/2023", statut: "Surveillance" },
    { id: "MP-004", nom: "Peinture Époxy", description: "Peinture résistante", fournisseur: "ColorisPro", unite: "L", stock: 50, stock_securite: 20, delai: "3 jours", cout: "8.75 €", derniere_livraison: "22/10/2023", prochaine_commande: "15/11/2023", statut: "Normal" },
    { id: "MP-005", nom: "Vis Spéciales M6", description: "Vis inox", fournisseur: "FastFix", unite: "unité", stock: 10000, stock_securite: 2000, delai: "2 jours", cout: "0.15 €", derniere_livraison: "18/10/2023", prochaine_commande: "30/10/2023", statut: "Urgent" },
  ];

  const getBadgeColor = (statut: string) => {
    switch (statut) {
      case "Normal": return "bg-green-500";
      case "Urgent": return "bg-red-500";
      case "À Réapprovisionner": return "bg-yellow-500";
      case "Surveillance": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">📦 Matières Premières</h1>

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="🔍 Rechercher..."
            className="p-2 border rounded mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Tableau des matières */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Fournisseur</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Stock Sécurité</th>
                  <th className="p-3 text-left">Coût Unitaire</th>
                  <th className="p-3 text-left">Statut</th>
                  <th className="p-3 text-left">Prochaine Commande</th>
                </tr>
              </thead>
              <tbody>
                {matieres
                  .filter((m) => m.nom.toLowerCase().includes(search.toLowerCase()))
                  .map((matiere) => (
                    <tr key={matiere.id} className="border-t">
                      <td className="p-3">{matiere.id}</td>
                      <td className="p-3">{matiere.nom}</td>
                      <td className="p-3">{matiere.fournisseur}</td>
                      <td className="p-3">{matiere.stock} {matiere.unite}</td>
                      <td className="p-3">{matiere.stock_securite} {matiere.unite}</td>
                      <td className="p-3">{matiere.cout}</td>
                      <td className="p-3">
                        <span className={`text-white px-2 py-1 rounded ${getBadgeColor(matiere.statut)}`}>
                          {matiere.statut}
                        </span>
                      </td>
                      <td className="p-3">{matiere.prochaine_commande}</td>
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

export default MatierePremiere;
