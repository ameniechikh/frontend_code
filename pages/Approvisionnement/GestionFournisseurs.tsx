import { useState } from "react";
import Sidebar from "../../componentApprovisionnement/sidebar";
import Header from "../../componentApprovisionnement/header";
import { Package, Plus, Edit, Trash2, Tag, Search, Save, X } from "lucide-react";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const initialSuppliers = [
  {
    id: "FR001",
    companyName: "Global Fer Distribution",
    
    email: "fer@global.com",
    phone: "+216 XX XXX XXX",
    status: "Actif",
    productsSupplied: "Fer, Carbone",
    lastUsed: new Date() // Date de la dernière utilisation
  },
  // Ajoutez d'autres fournisseurs si nécessaire
];

const GestionFournisseurs = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    companyName: "",
   
    email: "",
    phone: "",
    status: "Actif",
    productsSupplied: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredSuppliers = suppliers.filter(supplier => {
    return supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           supplier.productsSupplied.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const startEditing = (supplier) => {
    setEditingSupplier(supplier.id);
    setNewSupplier(supplier);
  };

  const cancelEditing = () => {
    setEditingSupplier(null);
    setNewSupplier({
      companyName: "",
      
      email: "",
      phone: "",
      status: "Actif",
      productsSupplied: ""
    });
  };

  const handleInputChange = (field, value) => {
    setNewSupplier(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => 
        s.id === editingSupplier ? { ...s, ...newSupplier, lastUsed: new Date() } : s
      ));
    } else {
      setSuppliers([...suppliers, { ...newSupplier, id: `FR${Date.now()}`, lastUsed: new Date() }]);
    }
    setShowAddModal(false);
    cancelEditing();
  };

  const deleteSupplier = (supplierId) => {
    setSuppliers(suppliers.filter(s => s.id !== supplierId));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-0 z-50 shadow-xl">
        <Sidebar/>
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <Header />

        <div className="p-6">
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Gestion des Fournisseurs
                </CardTitle>
                <Button onClick={() => setShowAddModal(true)} variant="primary">
                  <Plus className="mr-2" /> Ajouter Fournisseur
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Barre de recherche */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou produit fourni..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Liste des fournisseurs */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">ID</th>
                      <th className="p-3">Nom société</th>
                     
                      <th className="p-3">Email</th>
                      <th className="p-3">Téléphone</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Produits fournis</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSuppliers.map(supplier => (
                      <tr key={supplier.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{supplier.id}</td>
                        <td className="p-3">{supplier.companyName}</td>
                       
                        <td className="p-3">{supplier.email}</td>
                        <td className="p-3">{supplier.phone}</td>
                        <td className="p-3">{supplier.status}</td>
                        <td className="p-3">{supplier.productsSupplied}</td>
                        <td className="p-3 flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => startEditing(supplier)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteSupplier(supplier.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredSuppliers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <X className="h-8 w-8 mx-auto mb-2" />
                    Aucun fournisseur trouvé
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal Ajout/Modification */}
        {showAddModal || editingSupplier ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-6 w-6" />
                  {editingSupplier ? "Modifier Fournisseur" : "Nouveau Fournisseur"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label>Nom de la Société</label>
                  <input
                    type="text"
                    value={newSupplier.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

               

                <div className="space-y-2">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="space-y-2">
                  <label>Téléphone</label>
                  <input
                    type="text"
                    value={newSupplier.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="space-y-2">
                  <label>Statut</label>
                  <select
                    value={newSupplier.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label>Produits Fournis</label>
                  <input
                    type="text"
                    value={newSupplier.productsSupplied}
                    onChange={(e) => handleInputChange("productsSupplied", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={cancelEditing}>
                    Annuler
                  </Button>
                  <Button variant="primary" onClick={saveChanges}>
                    <Save className="mr-2" /> Enregistrer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GestionFournisseurs;