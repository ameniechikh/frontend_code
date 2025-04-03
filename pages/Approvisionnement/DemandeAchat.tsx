import { useState } from "react";
import { Package, ClipboardList, CheckCircle, Send, Plus, Trash2 } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface Material {
  id: number;
  name: string;
  suppliers: string[];
  price: number;
  stock: number;
}

interface OrderItem {
  materialId: number;
  quantity: number;
  supplier: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered";
  notes: string;
}

const DemandeAchat = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [notes, setNotes] = useState("");
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Données de démonstration
  const materials: Material[] = [
    {
      id: 1,
      name: "Fer 50%",
      suppliers: ["Fournisseur A", "Fournisseur B"],
      price: 500,
      stock: 1000
    },
    {
      id: 2,
      name: "Charbon Métallurgique",
      suppliers: ["Fournisseur C", "Fournisseur D"],
      price: 300,
      stock: 500
    }
  ];

  const addToCart = () => {
    if (selectedMaterial && selectedSupplier && quantity > 0) {
      const newItem: OrderItem = {
        materialId: selectedMaterial.id,
        quantity,
        supplier: selectedSupplier
      };
      setCartItems([...cartItems, newItem]);
      resetForm();
    }
  };

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const submitOrder = () => {
    const newOrder: Order = {
      id: `CMD-${orders.length + 1}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => {
        const material = materials.find(m => m.id === item.materialId);
        return sum + (material?.price || 0) * item.quantity;
      }, 0),
      status: "pending",
      notes
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setNotes("");
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const resetForm = () => {
    setSelectedMaterial(null);
    setQuantity(1);
    setSelectedSupplier("");
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
            {/* Formulaire de sélection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-blue-500" /> Nouvelle Demande d'Achat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    className="p-2 border rounded-lg"
                    value={selectedMaterial?.id || ""}
                    onChange={(e) => setSelectedMaterial(materials.find(m => m.id === Number(e.target.value)) || null)}
                  >
                    <option value="">Sélectionner une matière</option>
                    {materials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name} ({material.stock}T disponible)
                      </option>
                    ))}
                  </select>

                  <select
                    className="p-2 border rounded-lg"
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    disabled={!selectedMaterial}
                  >
                    <option value="">Choisir un fournisseur</option>
                    {selectedMaterial?.suppliers.map(supplier => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={selectedMaterial?.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(Number(e.target.value), selectedMaterial?.stock || 1))}
                      className="p-2 border rounded-lg w-full"
                      placeholder="Quantité"
                    />
                    <Button variant="primary" onClick={addToCart} disabled={!selectedMaterial}>
                      <Plus className="mr-2" /> Ajouter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panier et validation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Articles sélectionnés */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="text-green-500" /> Récapitulatif
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Aucun article sélectionné</p>
                  ) : (
                    <>
                      {cartItems.map((item, index) => {
                        const material = materials.find(m => m.id === item.materialId);
                        return (
                          <div key={index} className="flex justify-between items-center p-3 border-b">
                            <div>
                              <h3 className="font-medium">{material?.name}</h3>
                              <p className="text-sm text-gray-500">{item.supplier}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span>{item.quantity}T</span>
                              <span className="w-32 text-right">
                                {(material?.price || 0 * item.quantity).toLocaleString()} DT
                              </span>
                              <Button variant="ghost" onClick={() => removeItem(index)}>
                                <Trash2 className="h-5 w-5 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between font-bold">
                          <span>Total :</span>
                          <span>
                            {cartItems.reduce((sum, item) => {
                              const material = materials.find(m => m.id === item.materialId);
                              return sum + (material?.price || 0) * item.quantity;
                            }, 0).toLocaleString()} DT
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Notes et validation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="text-purple-500" /> Validation finale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 border rounded-lg h-32"
                    placeholder="Ajouter des notes (instructions spéciales, délais...)"
                  />
                  <Button 
                    variant="primary" 
                    className="w-full" 
                    onClick={submitOrder}
                    disabled={cartItems.length === 0}
                  >
                    Soumettre la demande
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Historique des commandes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500" /> Historique des Demandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">N° Commande</th>
                      <th className="p-3">Matière</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Fournisseur</th>
                      <th className="p-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{order.id}</td>
                        <td className="p-3">
                          {order.items.map(item => 
                            materials.find(m => m.id === item.materialId)?.name
                          ).join(", ")}
                        </td>
                        <td className="p-3">
                          {order.items.map(item => `${item.quantity}T`).join(", ")}
                        </td>
                        <td className="p-3">{order.total.toLocaleString()} DT</td>
                        <td className="p-3">
                          {order.items.map(item => item.supplier).join(", ")}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {order.status === "pending" && "En attente"}
                            {order.status === "confirmed" && "Confirmé"}
                            {order.status === "delivered" && "Livré"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Confirmation */}
            {showConfirmation && (
              <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 shadow-lg">
                <CheckCircle className="h-6 w-6" />
                Demande envoyée avec succès !
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeAchat;