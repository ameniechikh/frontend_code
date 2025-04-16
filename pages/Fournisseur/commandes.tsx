import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle, Bell, AlertCircle } from "lucide-react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

interface Order {
  id: number;
  reference: string;
  date: string;
  product: string;
  quantity: number;
  status: "new" | "inProgress" | "completed";
  urgency: "high" | "medium" | "low";
}

const HistoriqueCommandes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      reference: "CMD-2301",
      date: "15/03/2024",
      product: "Tôles d'acier",
      quantity: 500,
      status: "new",
      urgency: "high"
    },
    {
      id: 2,
      reference: "CMD-2302",
      date: "18/03/2024",
      product: "Profilés aluminium",
      quantity: 1200,
      status: "inProgress",
      urgency: "medium"
    },
    {
      id: 3,
      reference: "CMD-2303",
      date: "20/03/2024",
      product: "Roulements SKF",
      quantity: 800,
      status: "completed",
      urgency: "low"
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (newStatus: Order["status"]) => {
    if (selectedOrder) {
      setOrders(orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      ));
      addNotification(`Statut de ${selectedOrder.reference} mis à jour à "${newStatus}"`);
      setShowStatusModal(false);
    }
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 5000);
  };

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      new: { color: "bg-blue-100 text-blue-800", icon: <Bell className="h-4 w-4" /> },
      inProgress: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
      completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> }
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[status].color}`}>
        {statusConfig[status].icon}
        <span className="ml-2 capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar fixée */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <SidebarFournisseur />
      </div>

      {/* Contenu principal */}
      <div className="ml-64 min-h-screen flex flex-col">
        <HeaderFournisseur />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Historique des Commandes</h1>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border rounded-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous statuts</option>
                <option value="new">Nouveau</option>
                <option value="inProgress">En cours</option>
                <option value="completed">Terminé</option>
              </select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">Référence</th>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Produit</th>
                      <th className="p-4 text-left">Quantité</th>
                      <th className="p-4 text-left">Statut</th>
                      <th className="p-4 text-left">Urgence</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-t hover:bg-gray-50">
                        <td className="p-4 font-medium">{order.reference}</td>
                        <td className="p-4">{order.date}</td>
                        <td className="p-4">{order.product}</td>
                        <td className="p-4">{order.quantity.toLocaleString()}</td>
                        <td className="p-4">{getStatusBadge(order.status)}</td>
                        <td className="p-4">
                          {order.urgency === "high" && <AlertCircle className="text-red-500 h-5 w-5" />}
                          {order.urgency === "medium" && <AlertCircle className="text-yellow-500 h-5 w-5" />}
                          {order.urgency === "low" && <AlertCircle className="text-green-500 h-5 w-5" />}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowStatusModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {showStatusModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader className="relative">
                  <CardTitle>Modifier le statut</CardTitle>
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={selectedOrder?.status}
                    onChange={(e) => handleStatusChange(e.target.value as Order["status"])}
                  >
                    <option value="new">Nouvelle commande</option>
                    <option value="inProgress">En préparation</option>
                    <option value="completed">Livrée</option>
                  </select>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setShowStatusModal(false)}
                  >
                    Confirmer
                  </button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {notifications.map((message, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
                <span>{message}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoriqueCommandes;
