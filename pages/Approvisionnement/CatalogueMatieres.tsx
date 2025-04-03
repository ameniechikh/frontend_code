import { useState } from "react";
import { Search, Package, Filter, FileText, ShoppingCart, Plus, Trash2, CheckCircle, Send, ChevronDown, ChevronUp } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface Material {
  id: number;
  name: string;
  supplier: string;
  quantity: number;
  price: number;
  quality: string;
  specifications: string;
}

interface CartItem {
  id: number;
  name: string;
  supplier: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}

const CatalogueAchatCombine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    supplier: "",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    quality: ""
  });
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cartCollapsed, setCartCollapsed] = useState(false);

  // Données de démonstration
  const materials: Material[] = [
    {
      id: 1,
      name: "Fer 50%",
      supplier: "Fournisseur A",
      quantity: 1000,
      price: 500,
      quality: "Grade A",
      specifications: "Densité: 7.85 g/cm³, Impuretés max: 2%"
    },
    {
      id: 2,
      name: "Charbon Métallurgique",
      supplier: "Fournisseur B",
      quantity: 500,
      price: 300,
      quality: "Grade B",
      specifications: "PCI: 7000 kcal/kg, Teneur en cendre: 8%"
    },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (
      (filters.supplier === "" || material.supplier === filters.supplier) &&
      (filters.minPrice === "" || material.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || material.price <= Number(filters.maxPrice)) &&
      (filters.minQuantity === "" || material.quantity >= Number(filters.minQuantity)) &&
      (filters.quality === "" || material.quality === filters.quality)
    );

    return matchesSearch && matchesFilters;
  });

  const handleAddToCart = (material: Material) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === material.id);
      if (existing) {
        return prev.map(item => item.id === material.id ? 
          { ...item, quantity: Math.min(item.quantity + 1, material.quantity) } : item
        );
      }
      return [...prev, {
        id: material.id,
        name: material.name,
        supplier: material.supplier,
        price: material.price,
        quantity: 1,
        maxQuantity: material.quantity
      }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { 
        ...item, 
        quantity: Math.min(Math.max(newQuantity, 1), item.maxQuantity)
      } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      setCartItems([]);
    }, 3000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar fixe */}
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <SidebarApprovisionnement />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        {/* Header fixe */}
        <div className="fixed top-0 right-0 left-64 z-50 bg-white shadow-sm">
          <HeaderApprovisionnement />
        </div>

        {/* Contenu principal avec padding pour compenser le header fixe */}
        <div className="flex gap-6 p-6 flex-1 mt-16"> {/* mt-16 pour compenser le header */}
          {/* Colonne Catalogue (75% de largeur) */}
          <div className="w-3/4 space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Search className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, fournisseur..."
                    className="flex-1 p-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary">
                    <Filter className="mr-2" /> Filtres
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <select
                    className="p-2 border rounded-lg"
                    value={filters.supplier}
                    onChange={(e) => setFilters({...filters, supplier: e.target.value})}
                  >
                    <option value="">Tous fournisseurs</option>
                    <option value="Fournisseur A">Fournisseur A</option>
                    <option value="Fournisseur B">Fournisseur B</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Prix min"
                    className="p-2 border rounded-lg"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  />

                  <input
                    type="number"
                    placeholder="Prix max"
                    className="p-2 border rounded-lg"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />

                  <input
                    type="number"
                    placeholder="Quantité min"
                    className="p-2 border rounded-lg"
                    value={filters.minQuantity}
                    onChange={(e) => setFilters({...filters, minQuantity: e.target.value})}
                  />

                  <select
                    className="p-2 border rounded-lg"
                    value={filters.quality}
                    onChange={(e) => setFilters({...filters, quality: e.target.value})}
                  >
                    <option value="">Toutes qualités</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="text-blue-500" /> Matières Disponibles
                  <span className="ml-auto text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {cartItems.length} article{cartItems.length !== 1 ? 's' : ''} dans le panier
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-3">Matière Première</th>
                      <th className="p-3">Fournisseur</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Prix (DT/T)</th>
                      <th className="p-3">Qualité</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map(material => (
                      <tr key={material.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{material.name}</td>
                        <td className="p-3">{material.supplier}</td>
                        <td className="p-3">{material.quantity.toLocaleString()} T</td>
                        <td className="p-3">{material.price.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {material.quality}
                          </span>
                        </td>
                        <td className="p-3 flex gap-2">
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleAddToCart(material)}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Panier
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMaterial(material)}
                          >
                            <FileText className="mr-2 h-4 w-4" /> Détails
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Colonne Panier (25% de largeur) */}
          <div className="w-1/4 sticky top-16 h-[calc(100vh-4rem)]"> {/* top-16 pour s'aligner sous le header */}
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-blue-500 h-5 w-5" />
                    <span>Panier</span>
                    <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-0.5 rounded-full">
                      {cartItems.length}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCartCollapsed(!cartCollapsed)}
                  >
                    {cartCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              
              {!cartCollapsed && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-0">
                    <div className="divide-y">
                      {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                          Votre panier est vide
                        </div>
                      ) : (
                        cartItems.map(item => (
                          <div key={item.id} className="p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.supplier}</p>
                                <p className="text-sm font-semibold mt-1">
                                  {(item.price * item.quantity).toLocaleString()} DT
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                  className="w-12 text-center border rounded p-1 text-sm h-8"
                                  min="1"
                                  max={item.maxQuantity}
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                              </div>
                              <span className="text-xs text-gray-500">
                                Max: {item.maxQuantity.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>

                  <div className="border-t p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-lg">{calculateTotal().toLocaleString()} DT</span>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={handleConfirmOrder}
                      disabled={cartItems.length === 0}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Confirmer
                    </Button>
                    {orderConfirmed && (
                      <div className="mt-3 p-2 bg-green-100 text-green-700 rounded text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Commande envoyée !
                      </div>
                    )}
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>

        {/* Modal des spécifications */}
        {selectedMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Détails - {selectedMaterial.name}</h3>
                <Button variant="ghost" onClick={() => setSelectedMaterial(null)}>
                  ×
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Fournisseur:</h4>
                  <p>{selectedMaterial.supplier}</p>
                </div>
                <div>
                  <h4 className="font-medium">Stock disponible:</h4>
                  <p>{selectedMaterial.quantity.toLocaleString()} T</p>
                </div>
                <div>
                  <h4 className="font-medium">Prix:</h4>
                  <p>{selectedMaterial.price.toLocaleString()} DT/T</p>
                </div>
                <div>
                  <h4 className="font-medium">Qualité:</h4>
                  <p>{selectedMaterial.quality}</p>
                </div>
                <div>
                  <h4 className="font-medium">Spécifications techniques:</h4>
                  <p className="whitespace-pre-wrap">{selectedMaterial.specifications}</p>
                </div>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => {
                    handleAddToCart(selectedMaterial);
                    setSelectedMaterial(null);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogueAchatCombine;