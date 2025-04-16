import { useState } from "react";
import Sidebar from "../../componentMagasinie/Sidebar";
import Header from "../../componentMagasinie/Header";
import { Search, Filter, Calendar, Package, Truck, Warehouse, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";

// Définition initiale des commandes
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
  // État principal des commandes
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    statut: "Tous",
    client: "",
    date: ""
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Fonction de mise à jour du statut
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, statut: newStatus } : order
    ));
  };

  // Vérification du stock
  const checkStock = (produits: any[]) => {
    return produits.every(produit => produit.quantité <= produit.stock);
  };

  // Envoi de message
  const sendMessage = (orderId: string) => {
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

  // Filtrage des commandes
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.statut === "Tous" || order.statut === filters.statut;
    const matchesClient = order.client.toLowerCase().includes(filters.client.toLowerCase());
    const matchesDate = order.date.includes(filters.date);
    return matchesStatus && matchesClient && matchesDate;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-purple-100 h-full flex-shrink-0 border-r">
        <div className="p-0 h-full">
          <Sidebar />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 bg-gray-50 space-y-6">
          {/* Section Statistiques */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">📊 Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Commandes totales</span>
                  <span className="font-bold">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>En préparation</span>
                  <span className="font-bold text-yellow-600">
                    {orders.filter(o => o.statut === 'En préparation').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Filtres */}
            <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </CardContent>
            </Card>
          </div>

          {/* Liste des commandes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Liste des Commandes
                <span className="text-sm font-normal text-gray-500">
                  ({filteredOrders.length} résultats)
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {/* Colonne Informations */}
                      <div className="space-y-1">
                        <div className="font-semibold text-purple-600">{order.id}</div>
                        <div className="text-sm">{order.date}</div>
                        <div className="text-sm flex items-center gap-1">
                          <MessageCircle size={14} />
                          {order.messages.length} messages
                        </div>
                      </div>

                      {/* Colonne Client */}
                      <div className="space-y-1">
                        <div className="font-medium">{order.client}</div>
                        <div className="text-sm text-gray-500 break-all">
                          {order.contact}
                        </div>
                      </div>

                      {/* Colonne Produits */}
                      <div className="space-y-2">
                        {order.produits.map((produit: any, index: number) => (
                          <div key={index} className="text-sm">
                            <div className="flex justify-between">
                              <span>{produit.quantité}x {produit.nom}</span>
                              <span className="font-medium">
                                {(produit.quantité * produit.prix).toLocaleString()}€
                              </span>
                            </div>
                            <div className="text-gray-500 text-xs">
                              Stock: {produit.stock} unités
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Colonne Statut */}
                      <div className="flex flex-col gap-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          order.statut === "Livrée" ? "bg-green-100 text-green-800" :
                          order.statut === "Annulée" ? "bg-red-100 text-red-800" :
                          order.statut === "Expédiée" ? "bg-blue-100 text-blue-800" :
                          order.statut === "En préparation" ? "bg-yellow-100 text-yellow-800" :
                          "bg-orange-100 text-orange-800"
                        }`}>
                          {order.statut}
                        </div>
                        <div className="text-sm">
                          Paiement: {' '}
                          <span className={order.paiement === 'Payé' 
                            ? 'text-green-600' 
                            : 'text-red-600'}>
                            {order.paiement}
                          </span>
                        </div>
                      </div>

                      {/* Colonne Actions */}
                      <div className="space-y-2">
                        <select
                          value={order.statut}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="w-full p-1 border rounded text-sm"
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
                          className="w-full"
                        >
                          <MessageCircle className="mr-2" size={14} /> Messagerie
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    Aucune commande trouvée avec ces critères
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Messagerie Sidebar */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  Messagerie - {selectedOrder.client}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </Button>
              </div>

              <div className="h-[calc(100vh-180px)] overflow-y-auto space-y-4 pr-4">
                {selectedOrder.messages.map((msg: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.sender === 'commercial' 
                        ? 'bg-blue-100 ml-6' 
                        : 'bg-gray-100 mr-6'
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.date}
                    </div>
                    <div className="text-sm">{msg.text}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrire un message..."
                  className="flex-1 p-2 border rounded"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(selectedOrder.id)}
                />
                <Button onClick={() => sendMessage(selectedOrder.id)}>
                  Envoyer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionCommandes;