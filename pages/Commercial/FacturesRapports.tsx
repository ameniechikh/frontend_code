import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Printer, Mail, Edit, FileText, Calendar, DollarSign, Truck, UserCheck, UserX } from "lucide-react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

// Données de démonstration
const factures = [
  { id: "FAC-1001", client: "Client A", date: "2024-03-15", montant: 15000, statut: "Payée" },
  { id: "FAC-1002", client: "Client B", date: "2024-03-14", montant: 23400, statut: "En retard" },
  { id: "FAC-1003", client: "Client C", date: "2024-03-13", montant: 9800, statut: "Partiellement payée" },
];

const rapportsData = {
  ventes: [
    { mois: "Jan", ventes: 40000, profit: 12000 },
    { mois: "Fév", ventes: 68000, profit: 18000 },
    { mois: "Mar", ventes: 79000, profit: 21000 },
  ],
  expeditions: [
    { id: "EXP-1001", statut: "Livrée", retard: 0 },
    { id: "EXP-1002", statut: "En transit", retard: 2 },
    { id: "EXP-1003", statut: "En préparation", retard: 0 },
  ],
  clients: [
    { nom: "Client A", commandes: 15, impayé: 0 },
    { nom: "Client B", commandes: 9, impayé: 4500 },
    { nom: "Client C", commandes: 12, impayé: 0 },
  ]
};

const FacturesRapports = () => {
  const [filtresFactures, setFiltresFactures] = useState({
    dateDebut: "",
    dateFin: "",
    statut: "Tous"
  });

  const [selectedFacture, setSelectedFacture] = useState(null);
  const [periodeRapport, setPeriodeRapport] = useState("mensuel");

  const filtrerFactures = () => {
    return factures.filter(f => {
      const matchDate = (!filtresFactures.dateDebut || f.date >= filtresFactures.dateDebut) &&
                       (!filtresFactures.dateFin || f.date <= filtresFactures.dateFin);
      const matchStatut = filtresFactures.statut === "Tous" || f.statut === filtresFactures.statut;
      return matchDate && matchStatut;
    });
  };

  const envoyerFacture = (id) => alert(`Facture ${id} envoyée`);
  const imprimerFacture = (id) => window.print();

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <HeaderAgentCommercial />

        <div className="p-6 space-y-8">
          {/* Section Factures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Gestion des Factures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="date"
                  className="p-2 border rounded-lg"
                  value={filtresFactures.dateDebut}
                  onChange={e => setFiltresFactures({...filtresFactures, dateDebut: e.target.value})}
                />
                <input
                  type="date"
                  className="p-2 border rounded-lg"
                  value={filtresFactures.dateFin}
                  onChange={e => setFiltresFactures({...filtresFactures, dateFin: e.target.value})}
                />
                <select
                  className="p-2 border rounded-lg"
                  value={filtresFactures.statut}
                  onChange={e => setFiltresFactures({...filtresFactures, statut: e.target.value})}
                >
                  <option value="Tous">Tous statuts</option>
                  <option value="Payée">Payée</option>
                  <option value="En retard">En retard</option>
                  <option value="Partiellement payée">Partiellement payée</option>
                </select>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Client</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Montant</th>
                      <th className="p-3 text-left">Statut</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrerFactures().map(facture => (
                      <tr key={facture.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{facture.id}</td>
                        <td className="p-3">{facture.client}</td>
                        <td className="p-3">{facture.date}</td>
                        <td className="p-3">{facture.montant}€</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            facture.statut === "Payée" ? "bg-green-100 text-green-800" :
                            facture.statut === "En retard" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {facture.statut}
                          </span>
                        </td>
                        <td className="p-3 space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => envoyerFacture(facture.id)}>
                            <Mail className="h-4 w-4 mr-1" /> Envoyer
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => imprimerFacture(facture.id)}>
                            <Printer className="h-4 w-4 mr-1" /> Imprimer
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedFacture(facture)}>
                            <Edit className="h-4 w-4 mr-1" /> Modifier
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Section Rapports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Tableau de Bord Analytique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Rapports de Ventes */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="h-5 w-5" /> Performances Commerciales
                  </h3>
                  <select 
                    className="p-2 border rounded-lg"
                    value={periodeRapport}
                    onChange={e => setPeriodeRapport(e.target.value)}
                  >
                    <option value="mensuel">Mensuel</option>
                    <option value="trimestriel">Trimestriel</option>
                    <option value="annuel">Annuel</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BarChart width={500} height={300} data={rapportsData.ventes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventes" fill="#3b82f6" name="Ventes totales" />
                    <Bar dataKey="profit" fill="#10b981" name="Bénéfices" />
                  </BarChart>

                  <LineChart width={500} height={300} data={rapportsData.ventes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventes" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" />
                  </LineChart>
                </div>
              </div>

              {/* Rapports d'Expéditions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" /> Statistiques Logistiques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <span>Expéditions livrées</span>
                      <span className="text-2xl font-bold text-green-600">
                        {rapportsData.expeditions.filter(e => e.statut === "Livrée").length}
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <span>En retard</span>
                      <span className="text-2xl font-bold text-red-600">
                        {rapportsData.expeditions.filter(e => e.retard > 0).length}
                      </span>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <span>En préparation</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {rapportsData.expeditions.filter(e => e.statut === "En préparation").length}
                      </span>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Rapports Clients */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserCheck className="h-5 w-5" /> Analyse Clientèle
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <UserCheck className="h-6 w-6 text-green-600" />
                      <h4>Top Clients</h4>
                    </div>
                    {rapportsData.clients.slice(0, 3).map((client, index) => (
                      <div key={index} className="flex justify-between p-2 border-b">
                        <span>{client.nom}</span>
                        <span>{client.commandes} commandes</span>
                      </div>
                    ))}
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <UserX className="h-6 w-6 text-red-600" />
                      <h4>Clients en retard</h4>
                    </div>
                    {rapportsData.clients.filter(c => c.impayé > 0).map((client, index) => (
                      <div key={index} className="flex justify-between p-2 border-b">
                        <span>{client.nom}</span>
                        <span>{client.impayé}€</span>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacturesRapports;