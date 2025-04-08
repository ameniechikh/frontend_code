import React, { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Printer, Edit, Plus, Save, X } from "lucide-react";

const GestionProduitsFinis = () => {
  const [products, setProducts] = useState([
    {
      id: "P-2024-001",
      reference: "AC-S355-10MM",
      nom: "Acier Haute Résistance",
      quantite: 150,
      dateEntree: "2024-03-15",
    },
    {
      id: "P-2024-002",
      reference: "AL-6061-T6",
      nom: "Profilé Aluminium",
      quantite: 85,
      dateEntree: "2024-03-18",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editQuantity, setEditQuantity] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nom: "",
    reference: "",
    quantite: "",
    dateEntree: "",
  });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: `P-${Date.now()}` }]);
    setShowAddModal(false);
    setNewProduct({ nom: "", reference: "", quantite: "", dateEntree: "" });
  };

  const handleUpdateQuantity = () => {
    setProducts(products.map(p => 
      p.id === editQuantity.id ? { ...p, quantite: editQuantity.value } : p
    ));
    setEditQuantity(null);
  };

  const handlePrintCard = (product) => {
    // Logique d'impression ici
    console.log("Impression de la fiche pour:", product);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* En-tête avec bouton d'ajout */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">📦 Gestion des Produits Finis</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus size={18} className="mr-2" /> Nouveau Produit
              </button>
            </div>

            {/* Tableau des produits */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Référence</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantité</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date d'entrée</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{product.nom}</td>
                      <td className="px-4 py-3 text-gray-600">{product.reference}</td>
                      <td className="px-4 py-3">
                        {editQuantity?.id === product.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editQuantity.value}
                              onChange={(e) => setEditQuantity({
                                ...editQuantity,
                                value: e.target.value
                              })}
                              className="w-20 px-2 py-1 border rounded"
                            />
                            <button
                              onClick={handleUpdateQuantity}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Save size={18} />
                            </button>
                            <button
                              onClick={() => setEditQuantity(null)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {product.quantite}
                            <button
                              onClick={() => setEditQuantity({
                                id: product.id,
                                value: product.quantite
                              })}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">{product.dateEntree}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handlePrintCard(product)}
                          className="text-gray-600 hover:text-gray-800 p-2 rounded-md"
                        >
                          <Printer size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-bold mb-4">Ajouter un nouveau produit</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    value={newProduct.nom}
                    onChange={(e) => setNewProduct({...newProduct, nom: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Référence</label>
                  <input
                    type="text"
                    value={newProduct.reference}
                    onChange={(e) => setNewProduct({...newProduct, reference: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantité</label>
                  <input
                    type="number"
                    value={newProduct.quantite}
                    onChange={(e) => setNewProduct({...newProduct, quantite: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date d'entrée</label>
                  <input
                    type="date"
                    value={newProduct.dateEntree}
                    onChange={(e) => setNewProduct({...newProduct, dateEntree: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionProduitsFinis;