import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Produits = () => {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nomProduit: "Produit A",
      nature: "Assemblage mécanique",
      description: "Produit fini industriel haut de gamme.",
      matieresPremieres: [
        "MP-ACIER-005 (Acier inoxydable)",
        "MP-ELEC-012 (Circuits électroniques)"
      ],
      prix: "500€",
      categorie: "Catégorie 1"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nomProduit: "",
    nature: "",
    description: "",
    matieresPremieres: [],
    prix: "",
    categorie: ""
  });

  const ajouterProduit = () => {
    const productToAdd = {
      ...newProduct,
      id: produits.length + 1,
    };
    setProduits([...produits, productToAdd]);
    setShowModal(false);
  };

  const supprimerProduit = (id) => {
    const nouveauxProduits = produits.filter(produit => produit.id !== id);
    setProduits(nouveauxProduits);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar className="h-auto" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">📦 Gestion des Produits</h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-blue-500 text-white p-2 rounded-md mb-4 hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Ajouter un produit
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Ajouter un Nouveau Produit</h2>
                <div className="mb-4">
                  <label className="block">Nom de Produit</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    value={newProduct.nomProduit}
                    onChange={(e) => setNewProduct({ ...newProduct, nomProduit: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Matières Premières</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Séparées par des virgules"
                    onChange={(e) => setNewProduct({ ...newProduct, matieresPremieres: e.target.value.split(',') })}
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

          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nom de Produit</th>
                  <th className="border p-2">Nature</th>
                  <th className="border p-2">Matières Premières</th>
                  <th className="border p-2">Prix</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((produit) => (
                  <tr key={produit.id} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{produit.id}</td>
                    <td className="border p-2">{produit.nomProduit}</td>
                    <td className="border p-2">{produit.nature}</td>
                    <td className="border p-2">{produit.matieresPremieres.join(", ")}</td>
                    <td className="border p-2">{produit.prix}</td>
                    <td className="border p-2 flex justify-center gap-4">
                      <button className="text-blue-500 hover:text-blue-700">
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
