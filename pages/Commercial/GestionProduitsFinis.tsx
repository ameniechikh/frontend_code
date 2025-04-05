import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { Package, Plus, Edit, Trash2, Tag, Search, Filter, Save, X } from "lucide-react";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const initialProducts = [
  {
    id: "P-1001",
    name: "Acier S235",
    price: 450,
    quantity: 1500,
    category: "Acier de construction",
    sku: "ACS235-20"
  },
  {
    id: "P-1002",
    name: "Tôle galvanisée",
    price: 320,
    quantity: 800,
    category: "Produits finis",
    sku: "TGALV-15"
  }
];

const GestionProduits = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    sku: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ["Tous", "Acier de construction", "Produits finis", "Tubes", "Profilés"];

  const handleSearch = (e) => setSearchTerm(e.target.value);
  
  const handleFilterChange = (e) => setSelectedCategory(e.target.value);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const startEditing = (product) => {
    setEditingProduct(product.id);
    setNewProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      price: "",
      quantity: "",
      category: "",
      sku: ""
    });
  };

  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct ? { ...p, ...newProduct } : p
      ));
    } else {
      setProducts([...products, { ...newProduct, id: `P-${Date.now()}` }]);
    }
    setShowAddModal(false);
    cancelEditing();
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity: Math.max(0, newQuantity) } : p
    ));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <HeaderAgentCommercial />

        <div className="p-6">
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Gestion des Produits
                </CardTitle>
                <Button onClick={() => setShowAddModal(true)} variant="primary">
                  <Plus className="mr-2" /> Ajouter Produit
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Barre de recherche et filtres */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou SKU..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="pl-10 pr-4 py-2 border rounded-lg"
                    value={selectedCategory}
                    onChange={handleFilterChange}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Liste des produits */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">Nom</th>
                      <th className="p-3">Prix (€/T)</th>
                      <th className="p-3">Quantité</th>
                      <th className="p-3">Catégorie</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            >
                              -
                            </Button>
                            <span>{product.quantity}T</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3 text-gray-600">{product.sku}</td>
                        <td className="p-3 flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => startEditing(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <X className="h-8 w-8 mx-auto mb-2" />
                    Aucun produit trouvé
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal Ajout/Modification */}
        {showAddModal || editingProduct ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-6 w-6" />
                  {editingProduct ? "Modifier Produit" : "Nouveau Produit"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label>Nom du Produit</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>Prix (€/T)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="space-y-2">
                    <label>Quantité (T)</label>
                    <input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Catégorie</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {categories.filter(c => c !== "Tous").map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label>SKU</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
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

export default GestionProduits;