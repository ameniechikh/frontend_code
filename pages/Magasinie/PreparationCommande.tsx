import React, { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { CheckCircle, Box, Package } from "lucide-react";

const PreparationCommande = () => {
  const [commandes, setCommandes] = useState([
    { id: "CMD-2024-001", client: "Entreprise A", statut: "En cours", poids: "12kg", fragile: true },
    { id: "CMD-2024-002", client: "Entreprise B", statut: "À préparer", poids: "25kg", fragile: false },
  ]);

  const handleValidation = (id) => {
    setCommandes(
      commandes.map((cmd) =>
        cmd.id === id ? { ...cmd, statut: "Validée" } : cmd
      )
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">📦 Préparation des Commandes</h1>
          <div className="grid gap-4">
            {commandes.map((commande) => (
              <div key={commande.id} className="p-4 border rounded-lg bg-gray-100">
                <h2 className="text-lg font-semibold">Commande: {commande.id}</h2>
                <p><strong>Client :</strong> {commande.client}</p>
                <p><strong>Poids :</strong> {commande.poids}</p>
                <p><strong>Fragile :</strong> {commande.fragile ? "Oui" : "Non"}</p>
                <p className={`mt-2 p-2 rounded ${commande.statut === "Validée" ? "bg-green-200" : "bg-yellow-200"}`}>
                  {commande.statut}
                </p>
                {commande.statut !== "Validée" && (
                  <button
                    className="mt-2 bg-blue-500 text-white p-2 rounded flex items-center"
                    onClick={() => handleValidation(commande.id)}
                  >
                    <CheckCircle className="mr-2" /> Valider
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationCommande;
