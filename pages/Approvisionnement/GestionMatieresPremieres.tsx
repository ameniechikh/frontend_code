import { useState } from "react";
import { Search, Package, Filter, Plus, Trash2, Edit } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface RawMaterial {
  id: number;
  name: string;
  code: string;
  unit: string;
  unitPrice?: number;
  minThreshold: number;
  description?: string;
  quantityAvailable: number;
  dateAdded: Date;
  status: "en attente" | "validée";
}

const GestionMatieresPremieres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ date: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

  const [materials, setMaterials] = useState<RawMaterial[]>([
    {
      id: 1,
      name: "Fer",
      code: "MAT-001",
      unit: "kg",
      unitPrice: 15.5,
      minThreshold: 100,
      quantityAvailable: 150,
      dateAdded: new Date("2024-01-15"),
      status: "validée",
    },
    {
      id: 2,
      name: "Cuivre",
      code: "MAT-002",
      unit: "tonne",
      minThreshold: 5,
      quantityAvailable: 3,
      dateAdded: new Date("2024-02-01"),
      status: "en attente",
    },
  ]);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.code.toLowerCase().includes(searchTerm.toLowerCase());

    const materialDate = new Date(material.dateAdded).toISOString().split("T")[0];
    const matchesDate = filters.date ? materialDate === filters.date : true;

    return matchesSearch && matchesDate;
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const newMaterial: RawMaterial = {
      id: editingMaterial ? editingMaterial.id : materials.length + 1,
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      unit: formData.get("unit") as string,
      unitPrice: formData.get("unitPrice") ? Number(formData.get("unitPrice")) : undefined,
      minThreshold: Number(formData.get("minThreshold")),
      description: formData.get("description") as string || undefined,
      quantityAvailable: editingMaterial ? editingMaterial.quantityAvailable : 0,
      dateAdded: editingMaterial ? editingMaterial.dateAdded : new Date(),
      status: editingMaterial ? editingMaterial.status : "en attente",
    };

    if (editingMaterial) {
      setMaterials(materials.map(m => (m.id === editingMaterial.id ? newMaterial : m)));
    } else {
      setMaterials([...materials, newMaterial]);
    }

    setShowAddModal(false);
    setEditingMaterial(null);
  };

  const handleDelete = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const handleValidateReception = (id: number) => {
    setMaterials(prev =>
      prev.map(material =>
        material.id === id ? { ...material, status: "validée" } : material
      )
    );
  };

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
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="primary"
                    onClick={() => setShowAddModal(true)}
                    className="mr-auto"
                  >
                    <Plus className="mr-2" /> Ajouter matière première
                  </Button>

                  <Search className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, code..."
                    className="flex-1 p-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <input
                    type="date"
                    className="p-2 border rounded-lg"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-blue-500" /> Liste des matières premières
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">Code</th>
                      <th className="p-3">Nom</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">Seuil min</th>
                      <th className="p-3">Unité</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map(material => (
                      <tr
                        key={material.id}
                        className={`border-b hover:bg-gray-50 ${
                          material.quantityAvailable < material.minThreshold ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="p-3">{material.code}</td>
                        <td className="p-3 font-medium">{material.name}</td>
                        <td className="p-3">{material.quantityAvailable}</td>
                        <td className="p-3">{material.minThreshold}</td>
                        <td className="p-3">{material.unit}</td>
                        <td className="p-3">{material.dateAdded.toLocaleDateString()}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              material.status === "validée"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {material.status}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingMaterial(material)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(material.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                          </Button>
                          {material.status !== "validée" && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleValidateReception(material.id)}
                            >
                              Valider
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>

        {(showAddModal || editingMaterial) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {editingMaterial ? "Modifier Matière" : "Ajouter Matière Première"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom *</label>
                  <input
                    name="name"
                    required
                    className="w-full p-2 border rounded-lg"
                    defaultValue={editingMaterial?.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Code *</label>
                  <input
                    name="code"
                    required
                    className="w-full p-2 border rounded-lg"
                    defaultValue={editingMaterial?.code}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Unité *</label>
                  <select
                    name="unit"
                    required
                    className="w-full p-2 border rounded-lg"
                    defaultValue={editingMaterial?.unit}
                  >
                    <option value="kg">kg</option>
                    <option value="tonne">tonne</option>
                    <option value="litre">litre</option>
                    <option value="unité">unité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Prix unitaire (optionnel)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="unitPrice"
                    className="w-full p-2 border rounded-lg"
                    defaultValue={editingMaterial?.unitPrice}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Seuil minimum *</label>
                  <input
                    type="number"
                    name="minThreshold"
                    required
                    className="w-full p-2 border rounded-lg"
                    defaultValue={editingMaterial?.minThreshold}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description (optionnel)
                  </label>
                  <textarea
                    name="description"
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    defaultValue={editingMaterial?.description}
                  />
                </div>

                <div className="flex gap-2 justify-end mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingMaterial(null);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button variant="primary" type="submit">
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionMatieresPremieres;
