import { useState } from "react";
import { Package, AlertCircle, Clock, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface ProductionDemand {
  id: string;
  product: string;
  quantity: number;
  priority: "high" | "medium" | "low";
  dueDate: Date;
  status: "sent" | "accepted" | "in-production" | "completed";
  observations?: string;
  createdAt: Date;
}

interface FinishedProduct {
  name: string;
  currentStock: number;
  criticalThreshold: number;
  estimatedNeed: number;
}

const DemandeProduction = () => {
  const [demands, setDemands] = useState<ProductionDemand[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<FinishedProduct | null>(null);
  const [newDemand, setNewDemand] = useState({
    quantity: 1,
    priority: "medium" as "high" | "medium" | "low",
    dueDate: new Date().toISOString().split('T')[0],
    observations: ""
  });
  const [filters, setFilters] = useState({
    status: "",
    date: ""
  });

  // Données de démonstration
  const [products, setProducts] = useState<FinishedProduct[]>([
    {
      name: "Acier de construction",
      currentStock: 150,
      criticalThreshold: 200,
      estimatedNeed: 500
    },
    {
      name: "Tubes en acier galvanisé",
      currentStock: 80,
      criticalThreshold: 100,
      estimatedNeed: 300
    }
  ]);

  const handleSubmitDemand = () => {
    if (!selectedProduct) return;

    const newProductionDemand: ProductionDemand = {
      id: `DEM-${demands.length + 1}`,
      product: selectedProduct.name,
      ...newDemand,
      status: "sent",
      createdAt: new Date(),
      dueDate: new Date(newDemand.dueDate)
    };

    setDemands([...demands, newProductionDemand]);
    setSelectedProduct(null);
    setNewDemand({
      quantity: 1,
      priority: "medium",
      dueDate: new Date().toISOString().split('T')[0],
      observations: ""
    });
  };

  const cancelDemand = (id: string) => {
    setDemands(demands.filter(d => d.id !== id));
  };

  const filteredDemands = demands.filter(demand => {
    const matchesStatus = filters.status ? demand.status === filters.status : true;
    const matchesDate = filters.date ? 
      new Date(demand.createdAt).toISOString().split('T')[0] === filters.date : true;
    
    return matchesStatus && matchesDate;
  });

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
            {/* Liste des produits critiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="text-red-500" /> Produits en Alerte de Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">Produit</th>
                      <th className="p-3">Stock Actuel</th>
                      <th className="p-3">Seuil Critique</th>
                      <th className="p-3">Besoin Estimé</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(p => p.currentStock < p.criticalThreshold)
                      .map(product => (
                        <tr key={product.name} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{product.name}</td>
                          <td className={`p-3 ${product.currentStock < product.criticalThreshold ? "text-red-500" : ""}`}>
                            {product.currentStock}
                          </td>
                          <td className="p-3">{product.criticalThreshold}</td>
                          <td className="p-3">{product.estimatedNeed}</td>
                          <td className="p-3">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                            >
                              Demander production
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Formulaire de demande */}
            {selectedProduct && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="text-blue-500" />
                    Nouvelle Demande pour {selectedProduct.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantité demandée *</label>
                      <input
                        type="number"
                        min="1"
                        value={newDemand.quantity}
                        onChange={(e) => setNewDemand({
                          ...newDemand,
                          quantity: Math.max(1, Number(e.target.value))
                        })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Priorité *</label>
                      <select
                        className="w-full p-2 border rounded-lg"
                        value={newDemand.priority}
                        onChange={(e) => setNewDemand({
                          ...newDemand,
                          priority: e.target.value as "high" | "medium" | "low"
                        })}
                      >
                        <option value="high">Haute</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Basse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Date souhaitée *</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={newDemand.dueDate}
                        onChange={(e) => setNewDemand({
                          ...newDemand,
                          dueDate: e.target.value
                        })}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Observations</label>
                    <textarea
                      value={newDemand.observations}
                      onChange={(e) => setNewDemand({
                        ...newDemand,
                        observations: e.target.value
                      })}
                      className="w-full p-2 border rounded-lg h-24"
                      placeholder="Notes supplémentaires..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedProduct(null)}
                    >
                      Annuler
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={handleSubmitDemand}
                    >
                      Envoyer la demande
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Historique des demandes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-blue-500" /> Historique des Demandes
                </CardTitle>
                <div className="flex gap-4 mt-4">
                  <select
                    className="p-2 border rounded-lg"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="">Tous les statuts</option>
                    <option value="sent">Envoyée</option>
                    <option value="accepted">Acceptée</option>
                    <option value="in-production">En production</option>
                    <option value="completed">Terminée</option>
                  </select>
                  <input
                    type="date"
                    className="p-2 border rounded-lg"
                    onChange={(e) => setFilters({...filters, date: e.target.value})}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">Produit</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">Priorité</th>
                      <th className="p-3">Date demande</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDemands.map(demand => (
                      <tr key={demand.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{demand.product}</td>
                        <td className="p-3">{demand.quantity}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            demand.priority === "high" ? "bg-red-100 text-red-800" :
                            demand.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {demand.priority === "high" && "Haute"}
                            {demand.priority === "medium" && "Moyenne"}
                            {demand.priority === "low" && "Basse"}
                          </span>
                        </td>
                        <td className="p-3">{demand.createdAt.toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            demand.status === "sent" ? "bg-blue-100 text-blue-800" :
                            demand.status === "accepted" ? "bg-green-100 text-green-800" :
                            demand.status === "in-production" ? "bg-purple-100 text-purple-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {demand.status === "sent" && "Envoyée"}
                            {demand.status === "accepted" && "Acceptée"}
                            {demand.status === "in-production" && "En production"}
                            {demand.status === "completed" && "Terminée"}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2">
                          {demand.status === "sent" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancelDemand(demand.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeProduction;