import { useState } from "react";
import { Package, PlusCircle, FileText, Clock, Edit, Trash2, Search, Download, AlertCircle, X, Check, Zap, Sliders } from "lucide-react";
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";

interface FinishedProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  technicalFile?: string;
  category?: string;
  productionTime: string;
  currentStock: number;
  rawMaterials: string[];
  status: "in-production" | "completed" | "stopped";
}

const GestionProduitsFinis = () => {
  const [products, setProducts] = useState<FinishedProduct[]>([
    {
      id: "PF-001",
      name: "Chaise en métal design",
      sku: "CHA-MET-01",
      unit: "pièce",
      category: "Mobilier",
      productionTime: "2 jours",
      currentStock: 150,
      rawMaterials: ["Acier", "Peinture", "Tissu"],
      status: "completed"
    },
    {
      id: "PF-002",
      name: "Table basse ovale",
      sku: "TAB-BAS-01",
      unit: "pièce",
      category: "Mobilier",
      productionTime: "3 jours",
      currentStock: 42,
      rawMaterials: ["Bois", "Vernis", "Métal"],
      status: "in-production"
    },
    {
      id: "PF-003",
      name: "Étagère murale moderne",
      sku: "ETA-MUR-01",
      unit: "pièce",
      category: "Décoration",
      productionTime: "1 jour",
      currentStock: 0,
      rawMaterials: ["Bois", "Clous", "Peinture"],
      status: "stopped"
    },
    {
      id: "PF-004",
      name: "Lampadaire design",
      sku: "LAM-DES-01",
      unit: "pièce",
      category: "Luminaire",
      productionTime: "4 jours",
      currentStock: 28,
      rawMaterials: ["Métal", "Verre", "Câble électrique"],
      status: "in-production"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<FinishedProduct | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: ""
  });

  const [newProduct, setNewProduct] = useState<Omit<FinishedProduct, "id">>({
    name: "",
    sku: "",
    unit: "pièce",
    productionTime: "",
    currentStock: 0,
    rawMaterials: [],
    status: "in-production"
  });

  const handleSubmit = () => {
    if (currentProduct) {
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...currentProduct } : p
      ));
    } else {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: `PF-${(products.length + 1).toString().padStart(3, "0")}`
        }
      ]);
    }
    setShowModal(false);
    setCurrentProduct(null);
    setNewProduct({
      name: "",
      sku: "",
      unit: "pièce",
      productionTime: "",
      currentStock: 0,
      rawMaterials: [],
      status: "in-production"
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addRawMaterial = () => {
    setNewProduct({
      ...newProduct,
      rawMaterials: [...newProduct.rawMaterials, ""]
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = filters.search ? 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) || 
      product.sku.toLowerCase().includes(filters.search.toLowerCase()) : true;
    
    const matchesCategory = filters.category ? 
      product.category === filters.category : true;
    
    const matchesStatus = filters.status ? 
      product.status === filters.status : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statusIcons = {
    "in-production": <Zap className="h-4 w-4 text-blue-500" />,
    "completed": <Check className="h-4 w-4 text-green-500" />,
    "stopped": <X className="h-4 w-4 text-red-500" />
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <Header />

        <main className="flex-1 p-8 overflow-auto">
          {/* Header avec actions */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Produits Finis</h1>
              <p className="text-gray-600">Gestion des produits manufacturés</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowModal(true);
                  setCurrentProduct(null);
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                Ajouter un produit
              </button>
              <button className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
                Exporter
              </button>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              
              <select
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">Toutes catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">Tous statuts</option>
                <option value="in-production">En production</option>
                <option value="completed">Terminé</option>
                <option value="stopped">Arrêté</option>
              </select>
              
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Sliders className="h-5 w-5" />
                Plus de filtres
              </button>
            </div>
          </div>

          {/* Cartes des produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.sku}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {statusIcons[product.status]}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "in-production" ? "bg-blue-100 text-blue-800" :
                          product.status === "completed" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {product.status === "in-production" ? "En production" : 
                           product.status === "completed" ? "Terminé" : "Arrêté"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Package className="h-4 w-4" />
                      <span>{product.category || "Aucune catégorie"}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="h-4 w-4" />
                      <span>Délai: {product.productionTime}</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Stock disponible</span>
                        <span className={`font-medium ${
                          product.currentStock === 0 ? "text-red-600" :
                          product.currentStock < 50 ? "text-yellow-600" :
                          "text-green-600"
                        }`}>
                          {product.currentStock} {product.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            product.currentStock === 0 ? "bg-red-500" :
                            product.currentStock < 50 ? "bg-yellow-500" :
                            "bg-green-500"
                          }`} 
                          style={{ width: `${Math.min(100, product.currentStock)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Matières premières</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.rawMaterials.map((material, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowModal(true);
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun produit trouvé</h3>
                <p className="mt-1 text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </main>

        {/* Modal d'ajout/modification */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
                </h2>
                <button 
                  onClick={() => {
                    setShowModal(false);
                    setCurrentProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
                    <input
                      type="text"
                      value={currentProduct ? currentProduct.name : newProduct.name}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, name: e.target.value}) :
                        setNewProduct({...newProduct, name: e.target.value})
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Ex: Chaise en métal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code interne / SKU *</label>
                    <input
                      type="text"
                      value={currentProduct ? currentProduct.sku : newProduct.sku}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, sku: e.target.value}) :
                        setNewProduct({...newProduct, sku: e.target.value})
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Ex: CHA-MET-01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unité de mesure *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={currentProduct ? currentProduct.unit : newProduct.unit}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, unit: e.target.value}) :
                        setNewProduct({...newProduct, unit: e.target.value})
                      }
                    >
                      <option value="pièce">Pièce</option>
                      <option value="kg">Kilogramme</option>
                      <option value="m">Mètre</option>
                      <option value="l">Litre</option>
                      <option value="paquet">Paquet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <input
                      type="text"
                      value={currentProduct ? currentProduct.category || "" : newProduct.category || ""}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, category: e.target.value}) :
                        setNewProduct({...newProduct, category: e.target.value})
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Ex: Mobilier"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Délai de fabrication *</label>
                    <input
                      type="text"
                      value={currentProduct ? currentProduct.productionTime : newProduct.productionTime}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, productionTime: e.target.value}) :
                        setNewProduct({...newProduct, productionTime: e.target.value})
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Ex: 2 jours"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={currentProduct ? currentProduct.status : newProduct.status}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, status: e.target.value as any}) :
                        setNewProduct({...newProduct, status: e.target.value as any})
                      }
                    >
                      <option value="in-production">En production</option>
                      <option value="completed">Terminé</option>
                      <option value="stopped">Arrêté</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantité disponible</label>
                    <input
                      type="number"
                      min="0"
                      value={currentProduct ? currentProduct.currentStock : newProduct.currentStock}
                      onChange={(e) => currentProduct ? 
                        setCurrentProduct({...currentProduct, currentStock: Number(e.target.value)}) :
                        setNewProduct({...newProduct, currentStock: Number(e.target.value)})
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fiche technique</label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="h-5 w-5" />
                            <span>{currentProduct?.technicalFile ? "Changer le fichier" : "Choisir un fichier"}</span>
                          </div>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.png"
                        />
                      </label>
                      {currentProduct?.technicalFile && (
                        <a 
                          href={currentProduct.technicalFile} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir le fichier"
                        >
                          <FileText className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Besoins en matières premières</label>
                  <div className="space-y-3">
                    {(currentProduct ? currentProduct.rawMaterials : newProduct.rawMaterials).map((material, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={material}
                          onChange={(e) => {
                            const updatedMaterials = [...(currentProduct ? currentProduct.rawMaterials : newProduct.rawMaterials)];
                            updatedMaterials[index] = e.target.value;
                            currentProduct ? 
                              setCurrentProduct({...currentProduct, rawMaterials: updatedMaterials}) :
                              setNewProduct({...newProduct, rawMaterials: updatedMaterials});
                          }}
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="Ex: Acier"
                        />
                        <button
                          onClick={() => {
                            const updatedMaterials = [...(currentProduct ? currentProduct.rawMaterials : newProduct.rawMaterials)];
                            updatedMaterials.splice(index, 1);
                            currentProduct ? 
                              setCurrentProduct({...currentProduct, rawMaterials: updatedMaterials}) :
                              setNewProduct({...newProduct, rawMaterials: updatedMaterials});
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addRawMaterial}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2 transition-colors"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Ajouter une matière première
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setCurrentProduct(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {currentProduct ? "Enregistrer" : "Ajouter"} le produit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionProduitsFinis;