import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Employes = () => {
  const [employes, setEmployes] = useState([
    { id: 1, nom: "Dupont Jean", poste: "Responsable Production", departement: "Production", dateEmbauche: "2020-03-12", salaire: "2500€", contact: "0123456789", statut: "Actif" },
    { id: 2, nom: "Lemoine Alice", poste: "Magasinier", departement: "Logistique", dateEmbauche: "2021-06-15", salaire: "1800€", contact: "0987654321", statut: "Inactif" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    poste: "",
    departement: "",
    salaire: "",
    contact: "",
    statut: "Actif"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ajouterEmploye = (e: React.FormEvent) => {
    e.preventDefault();

    const { nom, poste, salaire, contact, statut } = formData;
    if (!nom || !poste || !salaire || !contact || !statut) {
      alert("⚠️ Veuillez remplir tous les champs !");
      return;
    }

    const nouvelEmploye = {
      id: employes.length + 1,
      ...formData,
      departement: formData.departement || "Non spécifié",
      dateEmbauche: new Date().toLocaleDateString()
    };

    setEmployes([...employes, nouvelEmploye]);
    setFormData({ nom: "", poste: "", departement: "", salaire: "", contact: "", statut: "Actif" });
    setShowModal(false);
  };

  const supprimerEmploye = (id: number) => {
    setEmployes(employes.filter((employe) => employe.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">👥 Gestion des Employés</h1>

          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Ajouter un Employé
          </button>

          {/* MODAL */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Ajouter un Employé</h2>
                <form onSubmit={ajouterEmploye} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="nom" placeholder="Nom et Prénom" value={formData.nom} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="poste" placeholder="Poste" value={formData.poste} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="departement" placeholder="Département" value={formData.departement} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="salaire" placeholder="Salaire" value={formData.salaire} onChange={handleChange} className="border p-2 rounded" />
                  <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="border p-2 rounded" />
                  <select name="statut" value={formData.statut} onChange={handleChange} className="border p-2 rounded">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>

                  <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Ajouter</button>
                    <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TABLEAU DES EMPLOYÉS */}
          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nom et Prénom</th>
                  <th className="border p-2">Poste</th>
                  <th className="border p-2">Département</th>
                  <th className="border p-2">Date d'Embauche</th>
                  <th className="border p-2">Salaire</th>
                  <th className="border p-2">Contact</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employes.map((employe) => (
                  <tr key={employe.id} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{employe.id}</td>
                    <td className="border p-2">{employe.nom}</td>
                    <td className="border p-2">{employe.poste}</td>
                    <td className="border p-2">{employe.departement}</td>
                    <td className="border p-2">{employe.dateEmbauche}</td>
                    <td className="border p-2">{employe.salaire}</td>
                    <td className="border p-2">{employe.contact}</td>
                    <td className={`border p-2 ${employe.statut === "Actif" ? "text-green-600" : "text-red-600"}`}>
                      {employe.statut}
                    </td>
                    <td className="border p-2 flex justify-center gap-4">
                      <button className="text-red-500 hover:text-red-700" onClick={() => supprimerEmploye(employe.id)}>
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

export default Employes;
