import { useState } from "react";
import { MapPin, Truck, CheckCircle, MessageCircle, AlertTriangle } from "lucide-react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import dynamic from "next/dynamic";

// Chargement dynamique de la carte pour optimiser les performances
const Map = dynamic(() => import("../../componentFournisseur/Map"), { ssr: false });

const commandes = [
  {
    id: 4567,
    produit: "Acier brut",
    etapes: [
      { date: "05/09", statut: "Confirmée", icon: <CheckCircle className="text-green-500" /> },
      { date: "07/09", statut: "En préparation", icon: <Truck className="text-yellow-500" /> },
      { date: "10/09", statut: "Livraison partielle (15T/20T)", icon: <MapPin className="text-blue-500" /> },
      { date: "12/09", statut: "Livraison complète", icon: <CheckCircle className="text-green-600" /> },
    ],
  },
];

const Commandes = () => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [openIssueModal, setOpenIssueModal] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarFournisseur />

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        {/* Header */}
        <HeaderFournisseur />

        <h1 className="text-3xl font-bold mb-6">📦 Suivi des Commandes</h1>

        {commandes.map((commande) => (
          <Card key={commande.id} className="mb-6">
            <CardHeader>
              <CardTitle>Commande #{commande.id} - {commande.produit}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Timeline */}
              <div className="relative border-l-4 border-gray-300 pl-6">
                {commande.etapes.map((etape, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center gap-2">
                      {etape.icon}
                      <p className="text-lg font-semibold">{etape.statut}</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">{etape.date}</p>
                  </div>
                ))}
              </div>

              {/* Carte de suivi */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">🗺️ Suivi de Livraison</h2>
                <div className="border rounded-lg overflow-hidden">
                  <Map />
                </div>
              </div>

              {/* Messagerie contextuelle */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">💬 Messagerie</h2>
                <div className="border p-3 rounded-md flex items-center gap-2">
                  <MessageCircle className="text-blue-500" />
                  <input type="text" placeholder="Envoyer un message..." className="flex-1 p-2 border rounded" />
                  <button className="bg-blue-600 text-white px-3 py-1 rounded">Envoyer</button>
                </div>
              </div>

              {/* Bouton Signaler un problème */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">⚠️ Signaler un problème</h2>
                <button
                  onClick={() => setOpenIssueModal(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <AlertTriangle size={18} /> Signaler un problème
                </button>

                {openIssueModal && (
                  <div className="mt-3 p-3 border rounded bg-gray-100">
                    <p className="font-semibold mb-2">Sélectionner un problème :</p>
                    <select
                      className="p-2 border rounded w-full"
                      value={selectedIssue}
                      onChange={(e) => setSelectedIssue(e.target.value)}
                    >
                      <option value="">-- Choisir un problème --</option>
                      <option value="Retard">📅 Retard</option>
                      <option value="Quantité erronée">⚖️ Quantité erronée</option>
                    </select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Commandes;
