import { useState } from "react";
import Sidebar from "../../componentMagasinie/Sidebar";
import Header from "../../componentMagasinie/Header";
import { CheckCircle, XCircle, Bell, Search, Filter, Calendar, Package, Truck, Warehouse, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";

const initialOrders = [
  {
    id: "CMD-2023-0456",
    client: "Client A",
    contact: "contact@client-a.com",
    produits: [
      { nom: "Acier S235", quantité: 50, prix: 1200, stock: 150 },
      { nom: "Tôle Galvanisée", quantité: 20, prix: 800, stock: 30 }
    ],
    date: "2023-11-15",
    statut: "En préparation",
    paiement: "Payé",
    messages: []
  },
  {
    id: "CMD-2023-0457",
    client: "Client B",
    contact: "contact@client-b.com",
    produits: [
      { nom: "Profilé Aluminium", quantité: 30, prix: 950, stock: 15 }
    ],
    date: "2023-11-14",
    statut: "En attente de stock",
    paiement: "En attente",
    messages: []
  },
];

const GestionCommandes = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    statut: "Tous",
    client: "",
    date: ""
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, statut: newStatus } : order
    ));
  };

  const checkStock = (produits) => {
    return produits.every(produit => produit.quantité <= produit.stock);
  };

  const sendMessage = (orderId) => {
    if (!newMessage.trim()) return;
    
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        messages: [...order.messages, {
          text: newMessage,
          date: new Date().toLocaleString(),
          sender: "commercial"
        }]
      } : order
    ));
    setNewMessage("");
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.statut === "Tous" || order.statut === filters.statut;
    const matchesClient = order.client.toLowerCase().includes(filters.client.toLowerCase());
    const matchesDate = order.date.includes(filters.date);
    return matchesStatus && matchesClient && matchesDate;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixe à gauche */}
      <div className="w-64 bg-purple-100 h-full flex-shrink-0 border-r">
        <div className="p-5 h-full">
          <Sidebar />
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fixe en haut */}
        <div className="h-16 bg-white border-b flex-shrink-0">
          <Header />
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Gestion des Commandes Clients
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
                    <option value="En préparation">En préparation</option>
                    <option value="En attente de stock">En attente de stock</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
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
                      <th className="p-3">Stock</th>
                      <th className="p-3">Statut</th>
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
                        
                        <td className="p-3">
                          <div>{order.client}</div>
                          <div className="text-sm text-gray-500">{order.contact}</div>
                        </td>
                        
                        <td className="p-3">
                          {order.produits.map((produit, index) => (
                            <div key={index} className="text-sm mb-2">
                              <div>{produit.quantité}x {produit.nom}</div>
                              <div className="text-gray-500">
                                {produit.prix}€/unité • Total: {produit.quantité * produit.prix}€
                              </div>
                            </div>
                          ))}
                        </td>
                        
                        <td className="p-3 text-center">
                          {checkStock(order.produits) ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                              Stock OK
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                              Rupture stock
                            </span>
                          )}
                        </td>
                        
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm flex items-center justify-center gap-1 ${
                            order.statut === "Livrée" ? "bg-green-100 text-green-800" :
                            order.statut === "Annulée" ? "bg-red-100 text-red-800" :
                            order.statut === "Expédiée" ? "bg-blue-100 text-blue-800" :
                            order.statut === "En préparation" ? "bg-yellow-100 text-yellow-800" :
                            "bg-orange-100 text-orange-800"
                          }`}>
                            {order.statut === "En préparation" && <Package size={14} />}
                            {order.statut === "En attente de stock" && <Warehouse size={14} />}
                            {order.statut === "Expédiée" && <Truck size={14} />}
                            {order.statut}
                          </span>
                        </td>
                        
                        <td className="p-3 space-x-2">
                          <div className="flex flex-col gap-2">
                            <select
                              value={order.statut}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="p-1 border rounded text-sm"
                            >
                              <option value="En préparation">En préparation</option>
                              <option value="En attente de stock">En attente stock</option>
                              <option value="Expédiée">Expédiée</option>
                              <option value="Livrée">Livrée</option>
                              <option value="Annulée">Annulée</option>
                            </select>
                            
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <MessageCircle className="mr-2" size={14} /> Messagerie
                            </Button>
                          </div>
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

          {/* Modal Messagerie */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
              <div className="bg-white p-6 rounded-lg w-1/2">
                <h3 className="text-lg font-bold mb-4">
                  Messagerie - {selectedOrder.client}
                </h3>
                
                <div className="h-64 overflow-y-auto mb-4 border p-2">
                  {selectedOrder.messages.map((msg, index) => (
                    <div key={index} className={`mb-2 p-2 rounded ${msg.sender === 'commercial' ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'}`}>
                      <div className="text-sm text-gray-500">{msg.date}</div>
                      {msg.text}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 p-2 border rounded"
                  />
                  <Button onClick={() => sendMessage(selectedOrder.id)}>
                    Envoyer
                  </Button>
                  <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                    Fermer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionCommandes;