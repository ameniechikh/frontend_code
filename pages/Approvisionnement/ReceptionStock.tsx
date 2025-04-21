import { useState } from "react";
import { Package, ClipboardCheck, Clock, Truck, Filter, Search, AlertCircle, Calendar, BarChart } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";
import  {Badge}  from "../../componentFournisseur/Badge";

interface OrderMaterial {
  name: string;
  orderedQuantity: number;
  receivedQuantity?: number;
  condition?: "conforme" | "endommagée" | "manquante";
}

interface Order {
  id: string;
  reference: string;
  supplier: string;
  materials: OrderMaterial[];
  orderDate: Date;
  status: "Reçue" | "Partielle" | "En attente";
  receptionDate?: Date;
  proof?: string;
}

const ReceptionStock = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receptionForm, setReceptionForm] = useState<{
    materials: { [key: string]: { received: number; condition: "conforme" | "endommagée" | "manquante" } };
    receptionDate: string;
    proof: string;
  }>({
    materials: {},
    receptionDate: new Date().toISOString().split('T')[0],
    proof: ""
  });

  // Données de démonstration
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      reference: "CMD-2023-001",
      supplier: "Acier France",
      materials: [
        { name: "Tôle d'acier", orderedQuantity: 100 },
        { name: "Profilés aluminium", orderedQuantity: 50 }
      ],
      orderDate: new Date("2024-03-01"),
      status: "En attente"
    }
  ]);

  const handleReceptionSubmit = () => {
    if (!selectedOrder) return;

    const updatedMaterials = selectedOrder.materials.map(material => ({
      ...material,
      receivedQuantity: receptionForm.materials[material.name]?.received || 0,
      condition: receptionForm.materials[material.name]?.condition
    }));

    const allReceived = updatedMaterials.every(m => m.receivedQuantity === m.orderedQuantity);
    const partialReceived = updatedMaterials.some(m => m.receivedQuantity && m.receivedQuantity < m.orderedQuantity);

    const updatedOrder: Order = {
      ...selectedOrder,
      materials: updatedMaterials,
      status: allReceived ? "Reçue" : partialReceived ? "Partielle" : "En attente",
      receptionDate: new Date(receptionForm.receptionDate),
      proof: receptionForm.proof
    };

    setOrders(orders.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setSelectedOrder(null);
  };

  const getStatusBadge = (status: string) => (
    <Badge
      variant={
        status === "Reçue" ? "success" :
        status === "Partielle" ? "warning" : "neutral"
      }
    >
      {status}
    </Badge>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarApprovisionnement />

      <div className="flex-1 ml-64">
        <HeaderApprovisionnement />

        <main className="p-8 space-y-8">
          {/* Section Statistiques */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Réceptions ce mois</CardTitle>
                <BarChart className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-gray-500 mt-1">+12.5% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Commandes en attente</CardTitle>
                <AlertCircle className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-gray-500 mt-1">Dont 3 en retard</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Top Matière</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Acier INOX</div>
                <p className="text-xs text-gray-500 mt-1">1200 tonnes reçues</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Prochaine livraison</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/03</div>
                <p className="text-xs text-gray-500 mt-1">Fournisseur MétalPro</p>
              </CardContent>
            </Card>
          </div>

          {/* Section Principale */}
          <div className="grid grid-cols-3 gap-8">
            {/* Liste des Commandes */}
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      Réceptions de stock
                    </CardTitle>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="input-sm"
                        onChange={e => console.log(e.target.value)}
                      />
                      <select className="select-sm">
                        <option>Tous statuts</option>
                        <option>Reçue</option>
                        <option>Partielle</option>
                        <option>En attente</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm font-medium text-gray-500 border-b">
                        <th className="p-3 text-left">Référence</th>
                        <th className="p-3 text-left">Fournisseur</th>
                        <th className="p-3 text-left">Matières</th>
                        <th className="p-3 text-left">Quantité</th>
                        <th className="p-3 text-left">Statut</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 border-b">
                          <td className="p-3 font-medium">{order.reference}</td>
                          <td className="p-3">{order.supplier}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2">
                              {order.materials.map(m => (
                                <Badge key={m.name} variant="outline">
                                  {m.name}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            {order.materials.map(m => (
                              <div key={m.name} className="text-sm">
                                {m.receivedQuantity || 0}/{m.orderedQuantity}
                              </div>
                            ))}
                          </td>
                          <td className="p-3">{getStatusBadge(order.status)}</td>
                          <td className="p-3">
                            <Button
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Gérer réception
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de Réception */}
            {selectedOrder && (
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-green-600" />
                      Réceptionner commande
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Référence</label>
                      <input
                        className="input w-full"
                        value={selectedOrder.reference}
                        disabled
                      />
                    </div>

                    {selectedOrder.materials.map(material => (
                      <div key={material.name} className="space-y-2">
                        <label className="block text-sm font-medium">
                          {material.name} (max {material.orderedQuantity})
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            className="input flex-1"
                            min="0"
                            max={material.orderedQuantity}
                            onChange={e => setReceptionForm({
                              ...receptionForm,
                              materials: {
                                ...receptionForm.materials,
                                [material.name]: {
                                  received: Number(e.target.value),
                                  condition: receptionForm.materials[material.name]?.condition || "conforme"
                                }
                              }
                            })}
                          />
                          <select
                            className="select"
                            onChange={e => setReceptionForm({
                              ...receptionForm,
                              materials: {
                                ...receptionForm.materials,
                                [material.name]: {
                                  received: receptionForm.materials[material.name]?.received || 0,
                                  condition: e.target.value as any
                                }
                              }
                            })}
                          >
                            <option value="conforme">Conforme</option>
                            <option value="endommagée">Endommagé</option>
                            <option value="manquante">Manquant</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium mb-2">Bon de livraison</label>
                      <input
                        type="file"
                        className="file-input w-full"
                        onChange={e => setReceptionForm({
                          ...receptionForm,
                          proof: e.target.files?.[0]?.name || ""
                        })}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedOrder(null)}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="primary"
                        className="flex-1"
                        onClick={handleReceptionSubmit}
                      >
                        Valider la réception
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReceptionStock;