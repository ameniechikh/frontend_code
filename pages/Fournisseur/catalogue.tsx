import { useState } from "react";
import { Search, Download, Edit, Trash, X } from "lucide-react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const CatalogueMP = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [materials, setMaterials] = useState([
    {
      id: 1,
      ref: "F001",
      name: "Ferraille",
      category: "Métal",
      specs: "Ferraille de qualité",
      stock: 1200,
      price: "350 €/T",
      supplier: "Fournisseur A",
      status: "Disponible",
      urgency: "🟢",
      nextDelivery: "01/04/2025",
    },
    {
      id: 2,
      ref: "C002",
      name: "Coke",
      category: "Combustible",
      specs: "Coke de qualité supérieure",
      stock: 800,
      price: "500 €/T",
      supplier: "Fournisseur B",
      status: "En rupture",
      urgency: "🔴",
      nextDelivery: "N/A",
    },
    {
      id: 3,
      ref: "M003",
      name: "Minerai de fer",
      category: "Métal",
      specs: "Minerai de haute qualité",
      stock: 1500,
      price: "420 €/T",
      supplier: "Fournisseur C",
      status: "Disponible",
      urgency: "🟠",
      nextDelivery: "15/05/2025",
    },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    ref: "",
    name: "",
    category: "",
    specs: "",
    stock: "",
    price: "",
    supplier: "",
    status: "Disponible",
    urgency: "🟢",
    nextDelivery: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Contrôle l'affichage du formulaire

  const filteredMaterials = materials.filter(
    (mat) =>
      mat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || mat.status === filterStatus)
  );

  const handleDelete = (id: number) => {
    setMaterials(materials.filter((mat) => mat.id !== id));
  };

  const handleEdit = (id: number) => {
    const materialToEdit = materials.find((mat) => mat.id === id);
    setNewMaterial(materialToEdit);
    setIsEditing(true);
    setEditId(id);
    setShowForm(true); // Afficher le formulaire pour modification
  };

  const handleAddOrUpdate = () => {
    if (isEditing) {
      // Mettre à jour la matière
      setMaterials(
        materials.map((mat) =>
          mat.id === editId ? { ...mat, ...newMaterial } : mat
        )
      );
    } else {
      // Ajouter une nouvelle matière
      setMaterials([
        ...materials,
        { id: Date.now(), ...newMaterial },
      ]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewMaterial({
      ref: "",
      name: "",
      category: "",
      specs: "",
      stock: "",
      price: "",
      supplier: "",
      status: "Disponible",
      urgency: "🟢",
      nextDelivery: "",
    });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false); // Cacher le formulaire après l'action
  };

  const openForm = () => {
    setIsEditing(false);
    resetForm();
    setShowForm(true); // Ouvrir le formulaire
  };

  const closeForm = () => {
    setShowForm(false); // Cacher le formulaire
    resetForm(); // Réinitialiser les champs du formulaire
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarFournisseur />

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        {/* Header */}
        <HeaderFournisseur />

        <h1 className="text-3xl font-bold mb-6">📦 Catalogue Matières Premières</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher une matière..."
              className="pl-10 p-2 border rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-2 border rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="Disponible">Disponible</option>
            <option value="En rupture">En rupture</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Download size={16} /> Exporter (PDF/Excel)
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📋 Liste des Matières Premières</CardTitle>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={openForm} // Ouvrir le formulaire pour ajouter une matière
            >
              Ajouter une matière
            </button>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Référence</th>
                  <th className="border p-2">Nom Matière</th>
                  <th className="border p-2">Catégorie</th>
                  <th className="border p-2">Spécifications Techniques</th>
                  <th className="border p-2">Stock (tonnes)</th>
                  <th className="border p-2">Prix (€/tonne)</th>
                  <th className="border p-2">Fournisseur</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Urgence</th>
                  <th className="border p-2">Prochaine Livraison</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((mat) => (
                  <tr key={mat.id} className="text-center">
                    <td className="border p-2">{mat.ref}</td>
                    <td className="border p-2">{mat.name}</td>
                    <td className="border p-2">{mat.category}</td>
                    <td className="border p-2">{mat.specs}</td>
                    <td className="border p-2">{mat.stock} T</td>
                    <td className="border p-2">{mat.price}</td>
                    <td className="border p-2">{mat.supplier}</td>
                    <td className="border p-2">{mat.status}</td>
                    <td className="border p-2">{mat.urgency}</td>
                    <td className="border p-2">{mat.nextDelivery}</td>
                    <td className="border p-2">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEdit(mat.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(mat.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Formulaire d'ajout ou modification d'une matière */}
        {showForm && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{isEditing ? "Modifier une Matière" : "Ajouter une Matière"}</CardTitle>
              <button
                className="absolute top-2 right-2 text-red-600"
                onClick={closeForm}
              >
                <X size={24} />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Référence"
                  className="p-2 border rounded w-full"
                  value={newMaterial.ref}
                  onChange={(e) => setNewMaterial({ ...newMaterial, ref: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Nom de la Matière"
                  className="p-2 border rounded w-full"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Catégorie"
                  className="p-2 border rounded w-full"
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Spécifications Techniques"
                  className="p-2 border rounded w-full"
                  value={newMaterial.specs}
                  onChange={(e) => setNewMaterial({ ...newMaterial, specs: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Stock (tonnes)"
                  className="p-2 border rounded w-full"
                  value={newMaterial.stock}
                  onChange={(e) => setNewMaterial({ ...newMaterial, stock: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Prix (€/tonne)"
                  className="p-2 border rounded w-full"
                  value={newMaterial.price}
                  onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Fournisseur"
                  className="p-2 border rounded w-full"
                  value={newMaterial.supplier}
                  onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                />
                <select
                  className="p-2 border rounded w-full"
                  value={newMaterial.status}
                  onChange={(e) => setNewMaterial({ ...newMaterial, status: e.target.value })}
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En rupture">En rupture</option>
                </select>
                <input
                  type="text"
                  placeholder="Urgence"
                  className="p-2 border rounded w-full"
                  value={newMaterial.urgency}
                  onChange={(e) => setNewMaterial({ ...newMaterial, urgency: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Prochaine Livraison"
                  className="p-2 border rounded w-full"
                  value={newMaterial.nextDelivery}
                  onChange={(e) => setNewMaterial({ ...newMaterial, nextDelivery: e.target.value })}
                />
                <button
                  onClick={handleAddOrUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Modifier" : "Ajouter"} une Matière
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CatalogueMP;
