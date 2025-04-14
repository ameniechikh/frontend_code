import { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Search, Filter, Mail, Bell, User, Phone, Clock, Ban } from "lucide-react";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const clients = [
  {
    id: "C-1001",
    nom: "Client A",
    email: "clientA@example.com",
    telephone: "+123456789",
    dateInscription: "2023-01-15",
    statut: "Actif",
    commandesEnCours: 3,
    totalAchats: 45000
  },
  {
    id: "C-1002",
    nom: "Client B",
    email: "clientB@example.com",
    telephone: "+987654321",
    dateInscription: "2023-03-20",
    statut: "Inactif",
    commandesEnCours: 0,
    totalAchats: 12000
  }
];

const GestionClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    statut: "Tous",
    dateDebut: "",
    dateFin: ""
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.telephone.includes(searchTerm);
    
    const matchesFilters = (
      (filters.statut === "Tous" || client.statut === filters.statut) &&
      (filters.dateDebut === "" || client.dateInscription >= filters.dateDebut) &&
      (filters.dateFin === "" || client.dateInscription <= filters.dateFin)
    );

    return matchesSearch && matchesFilters;
  });

  const sendNotification = (clientId) => {
    alert(`Notification envoyée au client ${clientId}`);
  };

  const sendEmail = (clientEmail) => {
    window.location.href = `mailto:${clientEmail}`;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <Sidebar />
      </div>

      {/* Contenu principal centré */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header en haut */}
        <Header />

        <div className="p-6">
          <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Gestion des Clients
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Barre de recherche et filtres */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher client..."
                    className="pl-10 pr-4 py-2 w-full border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="p-2 border rounded-lg"
                  value={filters.statut}
                  onChange={(e) => setFilters({...filters, statut: e.target.value})}
                >
                  <option value="Tous">Tous les statuts</option>
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="date"
                    className="p-2 border rounded-lg flex-1"
                    placeholder="Date début"
                    value={filters.dateDebut}
                    onChange={(e) => setFilters({...filters, dateDebut: e.target.value})}
                  />
                  <input
                    type="date"
                    className="p-2 border rounded-lg flex-1"
                    placeholder="Date fin"
                    value={filters.dateFin}
                    onChange={(e) => setFilters({...filters, dateFin: e.target.value})}
                  />
                </div>
              </div>

              {/* Liste des clients */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Nom</th>
                      <th className="p-3 text-left">Contact</th>
                      <th className="p-3 text-left">Inscription</th>
                      <th className="p-3 text-left">Statut</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(client => (
                      <tr 
                        key={client.id} 
                        className="border-t hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedClient(client)}
                      >
                        <td className="p-3 font-medium">{client.nom}</td>
                        <td className="p-3">
                          <div className="flex flex-col">
                            <span>{client.email}</span>
                            <span className="text-sm text-gray-600">{client.telephone}</span>
                          </div>
                        </td>
                        <td className="p-3">{client.dateInscription}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            client.statut === "Actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {client.statut}
                          </span>
                        </td>
                        <td className="p-3 space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              sendNotification(client.id);
                            }}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Notifier
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              sendEmail(client.email);
                            }}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Détails du client */}
              {selectedClient && (
                <div className="mt-6 p-6 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">Détails du Client</h3>
                    <Button variant="ghost" onClick={() => setSelectedClient(null)}>
                      ×
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informations de base */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{selectedClient.nom}</p>
                          <p className="text-sm text-gray-600">ID: {selectedClient.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-600" />
                        <span>{selectedClient.email}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-600" />
                        <span>{selectedClient.telephone}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <span>Inscrit le {selectedClient.dateInscription}</span>
                      </div>
                    </div>

                    {/* Statistiques */}
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg">
                        <h4 className="font-medium mb-2">Activité récente</h4>
                        <div className="flex justify-between">
                          <span>Commandes en cours:</span>
                          <span className="font-medium">{selectedClient.commandesEnCours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total achats:</span>
                          <span className="font-medium">{selectedClient.totalAchats}€</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg">
                        <h4 className="font-medium mb-2">Restrictions</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Ban className="h-4 w-4" />
                          <span>Aucune restriction appliquée</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GestionClients;