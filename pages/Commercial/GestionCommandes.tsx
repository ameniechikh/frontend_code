import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { CheckCircle, XCircle, Bell, Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";

const initialOrders = [
  {
    id: "CMD-2023-0456",
    client: "Client A",
    produits: [
      { nom: "Acier S235", quantité: 50, prix: 1200 },
      { nom: "Tôle Galvanisée", quantité: 20, prix: 800 }
    ],
    date: "2023-11-15",
    statut: "En attente",
    paiement: "Pending"
  },
  {
    id: "CMD-2023-0457",
    client: "Client B",
    produits: [
      { nom: "Profilé Aluminium", quantité: 30, prix: 950 }
    ],
    date: "2023-11-14",
    statut: "Confirmée",
    paiement: "Payé"
  },
];

const GestionCommandes = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    statut: "Tous",
    client: "",
    date: ""
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, statut: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.statut === "Tous" || order.statut === filters.statut;
    const matchesClient = order.client.toLowerCase().includes(filters.client.toLowerCase());
    const matchesDate = order.date.includes(filters.date);
    return matchesStatus && matchesClient && matchesDate;
  });

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <HeaderAgentCommercial />

        <div className="p-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Gestion des Commandes
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Filtres */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <select
                    value={filters.statut}
                    onChange={(e) => setFilters({...filters, statut: e.target.value})}
                    className="w-full pl-10 p-2 border rounded-lg"
                  >
                    <option value="Tous">Tous les statuts</option>
                    <option value="En attente">En attente</option>
                    <option value="Confirmée">Confirmée</option>
                    <option value="Annulée">Annulée</option>
                    <option value="Expédiée">Expédiée</option>
                  </select>
                  <Filter className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher client..."
                    className="w-full pl-10 p-2 border rounded-lg"
                    value={filters.client}
                    onChange={(e) => setFilters({...filters, client: e.target.value})}
                  />
                  <Search className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    className="w-full pl-10 p-2 border rounded-lg"
                    value={filters.date}
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                  />
                  <Calendar className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Liste des commandes */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Commande</th>
                      <th className="p-3 text-left">Client</th>
                      <th className="p-3 text-left">Produits</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Paiement</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.date}</div>
                        </td>
                        
                        <td className="p-3">{order.client}</td>
                        
                        <td className="p-3">
                          {order.produits.map((produit, index) => (
                            <div key={index} className="text-sm">
                              {produit.quantité}x {produit.nom}
                            </div>
                          ))}
                        </td>
                        
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.statut === "Confirmée" ? "bg-green-100 text-green-800" :
                            order.statut === "Annulée" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.statut}
                          </span>
                        </td>
                        
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.paiement === "Payé" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {order.paiement}
                          </span>
                        </td>
                        
                        <td className="p-3 space-x-2">
                          {order.statut === "En attente" && (
                            <>
                              <Button
                                variant="success"
                                onClick={() => updateOrderStatus(order.id, "Confirmée")}
                              >
                                <CheckCircle className="mr-2" /> Confirmer
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => updateOrderStatus(order.id, "Annulée")}
                              >
                                <XCircle className="mr-2" /> Annuler
                              </Button>
                            </>
                          )}
                          <Button
                            variant="primary"
                            onClick={() => alert(`Notification envoyée à ${order.client}`)}
                          >
                            <Bell className="mr-2" /> Notifier
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    Aucune commande trouvée avec ces critères
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GestionCommandes;