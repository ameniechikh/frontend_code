import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash } from "react-icons/fa";

const Stock = () => {
  // Données initiales des stocks avec 10 exemples
  const [stocks, setStocks] = useState([
    { id: "STK-001", produit: "Acier", quantite: 500, statut: "Disponible" },
    { id: "STK-002", produit: "Aluminium", quantite: 200, statut: "Faible" },
    { id: "STK-003", produit: "Cuivre", quantite: 0, statut: "Rupture" },
    { id: "STK-004", produit: "Zinc", quantite: 150, statut: "Disponible" },
    { id: "STK-005", produit: "Nickel", quantite: 80, statut: "Faible" },
    { id: "STK-006", produit: "Plomb", quantite: 20, statut: "Rupture" },
    { id: "STK-007", produit: "Titane", quantite: 300, statut: "Disponible" },
    { id: "STK-008", produit: "Magnésium", quantite: 90, statut: "Faible" },
    { id: "STK-009", produit: "Fer", quantite: 600, statut: "Disponible" },
    { id: "STK-010", produit: "Bronze", quantite: 0, statut: "Rupture" },
  ]);

  const [editingStock, setEditingStock] = useState(null);
  const [formData, setFormData] = useState({ id: "", produit: "", quantite: 0, statut: "" });

  const handleDelete = (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce stock ?")) {
      setStocks(stocks.filter(stock => stock.id !== id));
    }
  };

  const handleEdit = (stock) => {
    setEditingStock(stock.id);
    setFormData(stock);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setStocks(stocks.map(stock => (stock.id === formData.id ? formData : stock)));
    setEditingStock(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">📦 Gestion des Stocks</h1>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Liste des Stocks</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b py-2">ID</th>
                  <th className="border-b py-2">Produit</th>
                  <th className="border-b py-2">Quantité</th>
                  <th className="border-b py-2">Statut</th>
                  <th className="border-b py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id} className="text-center">
                    <td className="border-b py-2">{stock.id}</td>
                    <td className="border-b py-2">{stock.produit}</td>
                    <td className="border-b py-2">{stock.quantite}</td>
                    <td className={`border-b py-2 ${
                      stock.statut === "Disponible" ? "text-green-500" :
                      stock.statut === "Faible" ? "text-yellow-500" : "text-red-500"
                    }`}>
                      {stock.statut}
                    </td>
                    <td className="border-b py-2">
                      <button onClick={() => handleEdit(stock)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(stock.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingStock && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Modifier le Stock</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Produit :</label>
                  <input type="text" name="produit" value={formData.produit} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-gray-700">Quantité :</label>
                  <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-gray-700">Statut :</label>
                  <select name="statut" value={formData.statut} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="Disponible">Disponible</option>
                    <option value="Faible">Faible</option>
                    <option value="Rupture">Rupture</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Enregistrer
                </button>
                <button onClick={() => setEditingStock(null)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Annuler
                </button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Stock;
