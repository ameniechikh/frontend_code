import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Employes = () => {
  // Liste des employés
  const [employes, setEmployes] = useState([
    { id: 1, nom: "Dupont Jean", poste: "Responsable Production", departement: "Production", dateEmbauche: "2020-03-12", salaire: "2500€", contact: "0123456789", statut: "Actif" },
    { id: 2, nom: "Lemoine Alice", poste: "Magasinier", departement: "Logistique", dateEmbauche: "2021-06-15", salaire: "1800€", contact: "0987654321", statut: "Inactif" }
  ]);

  // Fonction pour ajouter un employé
  const ajouterEmploye = () => {
    const nom = prompt("Nom et Prénom de l'employé :")?.trim();
    const poste = prompt("Poste de l'employé :")?.trim();
    const departement = prompt("Département de l'employé :")?.trim() || "Non spécifié";
    const salaire = prompt("Salaire de l'employé :")?.trim();
    const contact = prompt("Contact de l'employé :")?.trim();
    const statut = prompt("Statut de l'employé (Actif / Inactif) :")?.trim();

    if (nom && poste && salaire && contact && statut) {
      const nouvelEmploye = {
        id: employes.length + 1,
        nom,
        poste,
        departement,
        dateEmbauche: new Date().toLocaleDateString(),
        salaire,
        contact,
        statut,
      };
      setEmployes([...employes, nouvelEmploye]);
    } else {
      alert("⚠️ Veuillez remplir tous les champs !");
    }
  };

  // Fonction pour supprimer un employé
  const supprimerEmploye = (id: number) => {
    setEmployes(employes.filter(employe => employe.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">👥 Gestion des Employés</h1>

          {/* Bouton Ajouter un Employé */}
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
            onClick={ajouterEmploye}
          >
            <FaPlus /> Ajouter un Employé
          </button>

          {/* Tableau des employés */}
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
