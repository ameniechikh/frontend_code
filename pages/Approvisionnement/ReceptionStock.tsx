import { useState } from "react";
import { Package, ClipboardCheck, Clock, Truck, Filter, Search } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface Order {
  id: string;
  supplier: string;
  material: string;
  quantity: number;
  orderDate: Date;
  status: "pending" | "in-transit" | "delivered";
  receivedQuantity?: number;
  condition?: "conforme" | "endommagée" | "manquante";
  receptionDate?: Date;
  proof?: string;
}

interface MaterialStock {
  name: string;
  quantity: number;
}

const ReceptionStock = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receptionForm, setReceptionForm] = useState({
    receivedQuantity: 0,
    condition: "conforme" as "conforme" | "endommagée" | "manquante",
    receptionDate: new Date().toISOString().split('T')[0],
    proof: ""
  });
  const [filters, setFilters] = useState({
    date: "",
    supplier: "",
    material: ""
  });

  // Données de démonstration
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CMD-001",
      supplier: "Fournisseur A",
      material: "Fer 50%",
      quantity: 100,
      orderDate: new Date("2024-03-01"),
      status: "pending"
    },
    {
      id: "CMD-002",
      supplier: "Fournisseur B",
      material: "Charbon Métallurgique",
      quantity: 50,
      orderDate: new Date("2024-03-05"),
      status: "in-transit"
    }
  ]);

  const [materialsStock, setMaterialsStock] = useState<MaterialStock[]>([
    { name: "Fer 50%", quantity: 150 },
    { name: "Charbon Métallurgique", quantity: 30 }
  ]);

  const handleConfirmReception = () => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? {
        ...order,
        status: "delivered",
        ...receptionForm,
        receivedQuantity: Number(receptionForm.receivedQuantity),
        receptionDate: new Date(receptionForm.receptionDate)
      } : order
    );

    // Mise à jour du stock
    if (receptionForm.condition === "conforme") {
      const updatedStock = materialsStock.map(material => 
        material.name === selectedOrder.material ? {
          ...material,
          quantity: material.quantity + Number(receptionForm.receivedQuantity)
        } : material
      );
      setMaterialsStock(updatedStock);
    }

    setOrders(updatedOrders);
    setSelectedOrder(null);
    setReceptionForm({
      receivedQuantity: 0,
      condition: "conforme",
      receptionDate: new Date().toISOString().split('T')[0],
      proof: ""
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesDate = filters.date ? 
      new Date(order.orderDate).toISOString().split('T')[0] === filters.date : true;
    const matchesSupplier = filters.supplier ? 
      order.supplier.toLowerCase().includes(filters.supplier.toLowerCase()) : true;
    const matchesMaterial = filters.material ? 
      order.material.toLowerCase().includes(filters.material.toLowerCase()) : true;
    
    return matchesDate && matchesSupplier && matchesMaterial;
  });

  const receptionHistory = orders.filter(order => order.status === "delivered");

  return (
    <div className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <SidebarApprovisionnement />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <div className="fixed top-0 right-0 left-64 z-50 bg-white shadow-sm">
          <HeaderApprovisionnement />
        </div>

        <div className="flex gap-6 p-6 flex-1 mt-16">
          <div className="w-full space-y-6">
            {/* Commandes en attente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-orange-500" /> Commandes en Cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 flex-1">
                    <Search className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher par fournisseur"
                      className="p-2 border rounded-lg flex-1"
                      onChange={(e) => setFilters({...filters, supplier: e.target.value})}
                    />
                  </div>
                  <input
                    type="date"
                    className="p-2 border rounded-lg"
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                  />
                </div>
                
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">N° Commande</th>
                      <th className="p-3">Fournisseur</th>
                      <th className="p-3">Matière</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">Date Commande</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders
                      .filter(order => order.status !== "delivered")
                      .map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{order.id}</td>
                          <td className="p-3">{order.supplier}</td>
                          <td className="p-3">{order.material}</td>
                          <td className="p-3">{order.quantity}</td>
                          <td className="p-3">{order.orderDate.toLocaleDateString()}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {order.status === "pending" ? "En attente" : "En cours"}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                              disabled={order.status === "pending"}
                            >
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              {order.status === "pending" ? "En attente" : "Réceptionner"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Historique des réceptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="text-green-500" /> Historique des Réceptions
                </CardTitle>
                <div className="flex gap-4 mt-4">
                  <input
                    type="date"
                    className="p-2 border rounded-lg"
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Filtrer par matière"
                    className="p-2 border rounded-lg"
                    onChange={(e) => setFilters({...filters, material: e.target.value})}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">Date Réception</th>
                      <th className="p-3">Fournisseur</th>
                      <th className="p-3">Matière</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">État</th>
                      <th className="p-3">Preuve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receptionHistory.map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{order.receptionDate?.toLocaleDateString()}</td>
                        <td className="p-3">{order.supplier}</td>
                        <td className="p-3">{order.material}</td>
                        <td className="p-3">{order.receivedQuantity}/{order.quantity}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.condition === "conforme" ? "bg-green-100 text-green-800" :
                            order.condition === "endommagée" ? "bg-orange-100 text-orange-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {order.condition}
                          </span>
                        </td>
                        <td className="p-3">
                          {order.proof && (
                            <a 
                              href={order.proof} 
                              target="_blank" 
                              className="text-blue-500 hover:underline"
                            >
                              Voir document
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Modal de réception */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h3 className="text-xl font-semibold mb-4">
                    Réception pour {selectedOrder.material}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Quantité reçue (max {selectedOrder.quantity})
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={selectedOrder.quantity}
                        className="w-full p-2 border rounded-lg"
                        value={receptionForm.receivedQuantity}
                        onChange={(e) => setReceptionForm({
                          ...receptionForm,
                          receivedQuantity: Math.min(Number(e.target.value), selectedOrder.quantity)
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">État</label>
                      <select
                        className="w-full p-2 border rounded-lg"
                        value={receptionForm.condition}
                        onChange={(e) => setReceptionForm({
                          ...receptionForm,
                          condition: e.target.value as any
                        })}
                      >
                        <option value="conforme">Conforme</option>
                        <option value="endommagée">Endommagée</option>
                        <option value="manquante">Manquante</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Date de réception</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-lg"
                        value={receptionForm.receptionDate}
                        onChange={(e) => setReceptionForm({
                          ...receptionForm,
                          receptionDate: e.target.value
                        })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Justificatif (PDF/image)
                      </label>
                      <input
                        type="file"
                        className="w-full p-2 border rounded-lg"
                        onChange={(e) => setReceptionForm({
                          ...receptionForm,
                          proof: e.target.files?.[0]?.name || ""
                        })}
                      />
                    </div>

                    <div className="flex gap-2 justify-end mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedOrder(null)}
                      >
                        Annuler
                      </Button>
                      <Button 
                        variant="primary"
                        onClick={handleConfirmReception}
                        disabled={receptionForm.receivedQuantity <= 0}
                      >
                        Confirmer la réception
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionStock;