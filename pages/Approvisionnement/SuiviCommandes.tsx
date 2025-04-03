import { useState } from "react";
import { Package, ClipboardList, CheckCircle, AlertCircle, Truck, RefreshCw } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface Order {
  id: string;
  material: string;
  quantity: number;
  receivedQuantity: number;
  supplier: string;
  status: "pending" | "delivered" | "partial" | "rejected";
  notes: string;
}

const SuiviCommandes = () => {
  const [activeTab, setActiveTab] = useState<"suivi" | "reception">("suivi");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CMD-001",
      material: "Fer 50%",
      quantity: 500,
      receivedQuantity: 500,
      supplier: "Fournisseur A",
      status: "delivered",
      notes: ""
    },
    {
      id: "CMD-002",
      material: "Charbon Métallurgique",
      quantity: 300,
      receivedQuantity: 250,
      supplier: "Fournisseur B",
      status: "partial",
      notes: "Manque 50T, livraison complémentaire prévue"
    },
    {
      id: "CMD-003",
      material: "Cuivre",
      quantity: 200,
      receivedQuantity: 0,
      supplier: "Fournisseur C",
      status: "pending",
      notes: "Livraison prévue le 15/06"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receptionNotes, setReceptionNotes] = useState("");
  const [receivedQty, setReceivedQty] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateOrderStatus = (id: string, status: Order["status"], received: number, notes: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { 
        ...order, 
        status,
        receivedQuantity: received,
        notes 
      } : order
    ));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReception = () => {
    if (selectedOrder) {
      let status: Order["status"] = "delivered";
      if (receivedQty === 0) status = "rejected";
      else if (receivedQty < selectedOrder.quantity) status = "partial";
      
      updateOrderStatus(
        selectedOrder.id, 
        status,
        receivedQty,
        receptionNotes
      );
      setSelectedOrder(null);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <SidebarApprovisionnement />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <div className="sticky top-0 z-10">
          <HeaderApprovisionnement />
        </div>

        <div className="flex justify-center p-6 flex-1">
          <div className="w-full max-w-7xl space-y-6">
            {/* Onglets */}
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "suivi" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                onClick={() => setActiveTab("suivi")}
              >
                <ClipboardList className="inline mr-2" />
                Suivi des Commandes
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "reception" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                onClick={() => setActiveTab("reception")}
              >
                <Truck className="inline mr-2" />
                Réception des Matières
              </button>
            </div>

            {/* Contenu Suivi des Commandes */}
            {activeTab === "suivi" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="text-blue-500" /> Historique des Commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="p-3">N° Commande</th>
                          <th className="p-3">Matière</th>
                          <th className="p-3">Quantité</th>
                          <th className="p-3">Reçue</th>
                          <th className="p-3">Fournisseur</th>
                          <th className="p-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{order.id}</td>
                            <td className="p-3">{order.material}</td>
                            <td className="p-3">{order.quantity.toLocaleString()} T</td>
                            <td className="p-3">{order.receivedQuantity.toLocaleString()} T</td>
                            <td className="p-3">{order.supplier}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                order.status === "delivered" ? "bg-green-100 text-green-800" :
                                order.status === "partial" ? "bg-blue-100 text-blue-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {order.status === "pending" && "En attente"}
                                {order.status === "delivered" && "Livré"}
                                {order.status === "partial" && "Partiel"}
                                {order.status === "rejected" && "Rejeté"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contenu Réception des Matières */}
            {activeTab === "reception" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="text-green-500" /> Commandes à Réceptionner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="p-3">N° Commande</th>
                            <th className="p-3">Matière</th>
                            <th className="p-3">Quantité</th>
                            <th className="p-3">Fournisseur</th>
                            <th className="p-3">Statut</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.filter(o => o.status !== "delivered").map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-medium">{order.id}</td>
                              <td className="p-3">{order.material}</td>
                              <td className="p-3">{order.quantity.toLocaleString()} T</td>
                              <td className="p-3">{order.supplier}</td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                  order.status === "partial" ? "bg-blue-100 text-blue-800" :
                                  "bg-red-100 text-red-800"
                                }`}>
                                  {order.status === "pending" && "En attente"}
                                  {order.status === "partial" && "Partiel"}
                                  {order.status === "rejected" && "Rejeté"}
                                </span>
                              </td>
                              <td className="p-3">
                                <Button 
                                  variant="primary" 
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setReceivedQty(order.receivedQuantity);
                                    setReceptionNotes(order.notes);
                                  }}
                                >
                                  Valider réception
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Formulaire de réception */}
                {selectedOrder && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="text-purple-500" /> 
                        Réception de {selectedOrder.material}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Quantité reçue (max: {selectedOrder.quantity}T)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={selectedOrder.quantity}
                            value={receivedQty}
                            onChange={(e) => setReceivedQty(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Statut de livraison
                          </label>
                          <select
                            className="w-full p-2 border rounded-lg"
                            value={
                              receivedQty === 0 ? "rejected" :
                              receivedQty < selectedOrder.quantity ? "partial" :
                              "delivered"
                            }
                            disabled
                          >
                            <option value="delivered">Livraison complète</option>
                            <option value="partial">Livraison partielle</option>
                            <option value="rejected">Non livré</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Notes (problèmes, observations...)
                        </label>
                        <textarea
                          value={receptionNotes}
                          onChange={(e) => setReceptionNotes(e.target.value)}
                          className="w-full p-2 border rounded-lg h-24"
                          placeholder="Décrire les éventuels problèmes..."
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button 
                          variant="ghost" 
                          onClick={() => setSelectedOrder(null)}
                        >
                          Annuler
                        </Button>
                        <Button 
                          variant="primary"
                          onClick={handleReception}
                        >
                          <CheckCircle className="mr-2" />
                          Confirmer la réception
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Notification de succès */}
            {showSuccess && (
              <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 shadow-lg">
                <CheckCircle className="h-6 w-6" />
                {activeTab === "reception" 
                  ? "Réception enregistrée avec succès !" 
                  : "Statut mis à jour avec succès !"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuiviCommandes;