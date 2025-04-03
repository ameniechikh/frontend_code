import { useState } from "react";
import { Search, Download, Edit, Trash, X, FileText, Image, Check, Ban } from "lucide-react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

interface Material {
  id: number;
  name: string;
  description: string;
  quantity: number;
  minimumOrder: number;
  pricePerUnit: number;
  specifications: string[];
  available: boolean;
}

const GestionMatieresPremieres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      name: "Coke Métallurgique",
      description: "Coke de qualité supérieure - Source: Allemagne",
      quantity: 1200,
      minimumOrder: 100,
      pricePerUnit: 500,
      specifications: ["specs.pdf", "photo.jpg"],
      available: true,
    },
    {
      id: 2,
      name: "Minerai de Fer 65%",
      description: "Minerai de haute teneur - Brésil",
      quantity: 0,
      minimumOrder: 50,
      pricePerUnit: 420,
      specifications: ["analyse.pdf"],
      available: false,
    },
  ]);

  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: "",
    description: "",
    quantity: 0,
    minimumOrder: 0,
    pricePerUnit: 0,
    specifications: [],
    available: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Filtrage des matières premières
  const filteredMaterials = materials.filter(mat => {
    const matchesSearch = mat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = filterAvailability === "all" || 
      (filterAvailability === "available" && mat.available) || 
      (filterAvailability === "unavailable" && !mat.available);
    return matchesSearch && matchesAvailability;
  });

  // Gestion des actions
  const handleDelete = (id: number) => {
    setMaterials(materials.filter(mat => mat.id !== id));
  };

  const handleEdit = (id: number) => {
    const material = materials.find(mat => mat.id === id);
    if (material) {
      setNewMaterial(material);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      setMaterials(materials.map(mat => 
        mat.id === newMaterial.id ? { ...mat, ...newMaterial } : mat
      ));
    } else {
      setMaterials([...materials, { 
        id: Date.now(), 
        ...newMaterial as Material 
      }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewMaterial({
      name: "",
      description: "",
      quantity: 0,
      minimumOrder: 0,
      pricePerUnit: 0,
      specifications: [],
      available: true,
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Fixe */}
      <div className="fixed left-0 top-0 h-screen w-64 shadow-lg">
        <SidebarFournisseur />
      </div>

      {/* Contenu Principal */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <HeaderFournisseur />

        <main className="flex-1 p-6 space-y-6">
          {/* En-tête */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Matières Premières</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              + Ajouter une matière
            </button>
          </div>

          {/* Filtres */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border rounded-lg"
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="available">Disponible</option>
              <option value="unavailable">Indisponible</option>
            </select>
          </div>

          {/* Tableau */}
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left">Nom</th>
                    <th className="p-4 text-left">Description</th>
                    <th className="p-4 text-left">Stock (T)</th>
                    <th className="p-4 text-left">Commande Min.</th>
                    <th className="p-4 text-left">Prix/Unité</th>
                    <th className="p-4 text-left">Spécifications</th>
                    <th className="p-4 text-left">Statut</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map(mat => (
                    <tr key={mat.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{mat.name}</td>
                      <td className="p-4 text-gray-600">{mat.description}</td>
                      <td className="p-4">{mat.quantity.toLocaleString()} T</td>
                      <td className="p-4">{mat.minimumOrder} T</td>
                      <td className="p-4">{mat.pricePerUnit.toLocaleString()} €/T</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {mat.specifications.map((file, index) => (
                            <a 
                              key={index} 
                              href="#" 
                              className="text-blue-600 flex items-center gap-1"
                            >
                              <FileText className="h-4 w-4" />
                              {file}
                            </a>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        {mat.available ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="h-5 w-5" /> Disponible
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <Ban className="h-5 w-5" /> Indisponible
                          </span>
                        )}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(mat.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(mat.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Formulaire */}
          {showForm && (
            <Card className="mt-6">
              <CardHeader className="relative">
                <CardTitle>
                  {isEditing ? "Modifier la Matière" : "Nouvelle Matière"}
                </CardTitle>
                <button 
                  onClick={resetForm}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>Nom de la matière *</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Description</label>
                    <textarea
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Stock actuel (tonnes) *</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.quantity}
                      onChange={(e) => setNewMaterial({...newMaterial, quantity: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Commande minimale (tonnes) *</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.minimumOrder}
                      onChange={(e) => setNewMaterial({...newMaterial, minimumOrder: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Prix par tonne (€) *</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.pricePerUnit}
                      onChange={(e) => setNewMaterial({...newMaterial, pricePerUnit: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Disponibilité</label>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={newMaterial.available ? "true" : "false"}
                      onChange={(e) => setNewMaterial({...newMaterial, available: e.target.value === "true"})}
                    >
                      <option value="true">Disponible</option>
                      <option value="false">Indisponible</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label>Fichiers techniques (PDF/Images)</label>
                    <div className="flex items-center gap-2 border rounded-lg p-2">
                      <label className="cursor-pointer text-blue-600 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Ajouter des fichiers
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept=".pdf,.jpg,.png"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setNewMaterial({
                              ...newMaterial,
                              specifications: [
                                ...(newMaterial.specifications || []),
                                ...files.map(f => f.name)
                              ]
                            });
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newMaterial.specifications?.map((file, index) => (
                        <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Mettre à jour" : "Enregistrer"}
                </button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default GestionMatieresPremieres;