import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const clients = [
  {
    id: "C-1001",
    nom: "Client A",
    segment: "Automobile",
    commandes: 15,
    totalAchat: 50000,
    scoreRisque: "Faible",
    email: "clientA@example.com",
    historiqueAchats: [20000, 15000, 10000, 5000, 5000],
    delaisPaiement: "30 jours",
  },
  {
    id: "C-1002",
    nom: "Client B",
    segment: "BTP",
    commandes: 10,
    totalAchat: 30000,
    scoreRisque: "Moyenne",
    email: "clientB@example.com",
    historiqueAchats: [12000, 8000, 5000, 7000, 8000],
    delaisPaiement: "45 jours",
  },
];

const PortefeuilleClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      {/* Contenu principal centré */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header en haut */}
        <HeaderAgentCommercial />

        <div className="p-6 flex justify-center">
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>📊 Portefeuille Clients</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Liste des clients */}
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Nom du Client</th>
                    <th className="border border-gray-300 p-2">Segment</th>
                    <th className="border border-gray-300 p-2">Total des Achats</th>
                    <th className="border border-gray-300 p-2">Score Risque</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="text-center">
                      <td className="border border-gray-300 p-2">{client.nom}</td>
                      <td className="border border-gray-300 p-2">{client.segment}</td>
                      <td className="border border-gray-300 p-2">{client.totalAchat}€</td>
                      <td className="border border-gray-300 p-2">{client.scoreRisque}</td>
                      <td className="border border-gray-300 p-2 space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedClient(client)}
                        >
                          Voir Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Détails du client sélectionné */}
          {selectedClient && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>🔍 Détails du Client {selectedClient.nom}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Coordonnées :</strong> {selectedClient.email}</p>
                <p><strong>Segment Marché :</strong> {selectedClient.segment}</p>
                <p><strong>Délais de Paiement :</strong> {selectedClient.delaisPaiement}</p>

                <h3 className="text-lg font-semibold">Historique des Achats (5 ans)</h3>
                <LineChart width={500} height={300} data={selectedClient.historiqueAchats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="historiqueAchats" stroke="#8884d8" />
                </LineChart>

                <h3 className="text-lg font-semibold">Score Risque</h3>
                <p>Score Risque: {selectedClient.scoreRisque}</p>
                <p>Risque d'impayé: {selectedClient.scoreRisque === "Faible" ? "Aucun risque" : "Risque modéré"}</p>

                <Button variant="ghost" className="mt-4" onClick={() => alert("Email envoyé pour anniversaire/événement.")}>
                  📧 Envoyer Email
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortefeuilleClients;
