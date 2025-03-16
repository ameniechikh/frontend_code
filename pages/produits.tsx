import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Produits = () => {
  // Liste initiale de produits
  const [produits, setProduits] = useState([
    { id: 1, nom: "Acier Inoxydable", quantite: 120, statut: "Disponible", prix: "500€" },
    { id: 2, nom: "Fer Forgé", quantite: 80, statut: "Disponible", prix: "350€" },
    { id: 3, nom: "Aluminium Brut", quantite: 200, statut: "Disponible", prix: "400€" },
    { id: 4, nom: "Cuivre Pur", quantite: 50, statut: "En rupture", prix: "600€" },
    { id: 5, nom: "Zinc Laminé", quantite: 100, statut: "Disponible", prix: "250€" },
    { id: 6, nom: "Plomb Industriel", quantite: 30, statut: "En rupture", prix: "700€" },
    { id: 7, nom: "Titane Renforcé", quantite: 60, statut: "Disponible", prix: "900€" },
    { id: 8, nom: "Nickel Pur", quantite: 20, statut: "En rupture", prix: "850€" },
    { id: 9, nom: "Laiton Poli", quantite: 90, statut: "Disponible", prix: "300€" },
    { id: 10, nom: "Bronze Massif", quantite: 40, statut: "En rupture", prix: "550€" },
  ]);

  // Variables d'état pour gérer la modal d'ajout de produit
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom: "",
    quantite: 0,
    statut: "Disponible",
    prix: "",
  });

  const [productToEdit, setProductToEdit] = useState({
    id: 0,
    nom: "",
    quantite: 0,
    statut: "Disponible",
    prix: "",
  });

  // Fonction pour supprimer un produit
  const supprimerProduit = (id: number) => {
    const nouveauxProduits = produits.filter(produit => produit.id !== id);
    setProduits(nouveauxProduits);
  };

  // Fonction pour ouvrir la modal de modification et pré-remplir les données
  const modifierProduit = (id: number) => {
    const produitAModifier = produits.find(produit => produit.id === id);
    if (produitAModifier) {
      setProductToEdit(produitAModifier);
      setShowEditModal(true);
    }
  };

  // Fonction pour appliquer la modification
  const applyModification = () => {
    const nouveauxProduits = produits.map(produit =>
      produit.id === productToEdit.id ? productToEdit : produit
    );
    setProduits(nouveauxProduits);
    setShowEditModal(false);
  };

  // Fonction pour ajouter un produit
  const ajouterProduit = () => {
    const newProductId = produits.length + 1;
    setProduits([...produits, { ...newProduct, id: newProductId }]);
    setShowModal(false); // Fermer la modal après ajout
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">📦 Gestion des Produits</h1>
          
          {/* Icône Ajouter un produit */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-blue-500 text-white p-2 rounded-md mb-4 hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Ajouter un produit
          </button>

          {/* Modal d'ajout de produit */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Ajouter un Nouveau Produit</h2>
                <div className="mb-4">
                  <label className="block">Nom du produit</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={newProduct.nom}
                    onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Quantité</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={newProduct.quantite}
                    onChange={(e) => setNewProduct({ ...newProduct, quantite: Number(e.target.value) })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Statut</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={newProduct.statut}
                    onChange={(e) => setNewProduct({ ...newProduct, statut: e.target.value })}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="En rupture">En rupture</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block">Prix</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={newProduct.prix}
                    onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 p-2 rounded text-black hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={ajouterProduit}
                    className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de modification */}
          {showEditModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Modifier le Produit</h2>
                <div className="mb-4">
                  <label className="block">Nom du produit</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={productToEdit.nom}
                    onChange={(e) => setProductToEdit({ ...productToEdit, nom: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Quantité</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={productToEdit.quantite}
                    onChange={(e) => setProductToEdit({ ...productToEdit, quantite: Number(e.target.value) })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Statut</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={productToEdit.statut}
                    onChange={(e) => setProductToEdit({ ...productToEdit, statut: e.target.value })}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="En rupture">En rupture</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block">Prix</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={productToEdit.prix}
                    onChange={(e) => setProductToEdit({ ...productToEdit, prix: e.target.value })}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-300 p-2 rounded text-black hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={applyModification}
                    className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nom du Produit</th>
                  <th className="border p-2">Quantité</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Prix</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((produit) => (
                  <tr key={produit.id} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{produit.id}</td>
                    <td className="border p-2">{produit.nom}</td>
                    <td className="border p-2">{produit.quantite}</td>
                    <td className={`border p-2 font-bold ${produit.statut === "Disponible" ? "text-green-600" : "text-red-600"}`}>
                      {produit.statut}
                    </td>
                    <td className="border p-2">{produit.prix}</td>
                    <td className="border p-2 flex justify-center gap-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => modifierProduit(produit.id)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => supprimerProduit(produit.id)}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Produits;
