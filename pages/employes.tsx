import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

const Employes = () => {
  // Liste des employés
  const [employes, setEmployes] = useState([
    { id: 1, nom: "Dupont Jean", poste: "Responsable Production", departement: "Production", dateEmbauche: "2020-03-12", salaire: "2500€", contact: "0123456789", statut: "Actif" },
    { id: 2, nom: "Lemoine Alice", poste: "Magasinier", departement: "Logistique", dateEmbauche: "2021-06-15", salaire: "1800€", contact: "0987654321", statut: "Inactif" },
    { id: 3, nom: "Martins Pierre", poste: "Directeur", departement: "Direction", dateEmbauche: "2018-05-01", salaire: "4500€", contact: "0612345678", statut: "Actif" },
    { id: 4, nom: "Dufresne Léa", poste: "Commercial", departement: "Ventes", dateEmbauche: "2022-01-10", salaire: "2000€", contact: "0771234567", statut: "Actif" },
    { id: 5, nom: "Leclerc Paul", poste: "Technicien", departement: "Maintenance", dateEmbauche: "2019-08-25", salaire: "2200€", contact: "0789654321", statut: "Inactif" },
    { id: 6, nom: "Nguyen Mai", poste: "Analyste BI", departement: "Informatique", dateEmbauche: "2021-09-01", salaire: "3000€", contact: "0654321098", statut: "Actif" },
    { id: 7, nom: "Boutin Marc", poste: "Responsable RH", departement: "Ressources Humaines", dateEmbauche: "2017-11-30", salaire: "3500€", contact: "0611223344", statut: "Actif" },
    { id: 8, nom: "Morin Claire", poste: "Comptable", departement: "Finance", dateEmbauche: "2020-03-01", salaire: "2800€", contact: "0785123456", statut: "Inactif" },
    { id: 9, nom: "Robert Jacques", poste: "Chef de Projet", departement: "Production", dateEmbauche: "2018-09-17", salaire: "3300€", contact: "0612345670", statut: "Actif" },
    { id: 10, nom: "Gauthier Sophie", poste: "Assistante", departement: "Admin", dateEmbauche: "2023-02-21", salaire: "1600€", contact: "0678901234", statut: "Actif" },
  ]);

  // Fonction pour supprimer un employé
  const supprimerEmploye = (id: number) => {
    const nouveauxEmployes = employes.filter(employe => employe.id !== id);
    setEmployes(nouveauxEmployes);
  };

  // Fonction pour modifier un employé
  const modifierEmploye = (id: number) => {
    const employe = employes.find(employe => employe.id === id);
    if (employe) {
      const nouveauNom = prompt("Entrez le nouveau nom et prénom de l'employé:", employe.nom);
      const nouveauPoste = prompt("Entrez le nouveau poste de l'employé:", employe.poste);
      const nouveauSalaire = prompt("Entrez le nouveau salaire de l'employé:", employe.salaire);
      const nouveauContact = prompt("Entrez le nouveau contact de l'employé:", employe.contact);
      const nouveauStatut = prompt("Entrez le nouveau statut de l'employé (Actif / Inactif):", employe.statut);
      
      const nouveauxEmployes = employes.map(emp =>
        emp.id === id
          ? { ...emp, nom: nouveauNom || emp.nom, poste: nouveauPoste || emp.poste, salaire: nouveauSalaire || emp.salaire, contact: nouveauContact || emp.contact, statut: nouveauStatut || emp.statut }
          : emp
      );
      setEmployes(nouveauxEmployes);
    }
  };

  // Fonction pour ajouter un employé
  const ajouterEmploye = () => {
    const nom = prompt("Nom et Prénom de l'employé:");
    const poste = prompt("Poste de l'employé:");
    const salaire = prompt("Salaire de l'employé:");
    const contact = prompt("Contact de l'employé:");
    const statut = prompt("Statut de l'employé (Actif / Inactif):");

    if (nom && poste && salaire && contact && statut) {
      const nouvelEmploye = {
        id: employes.length + 1,
        nom,
        poste,
        departement: "Non spécifié",
        dateEmbauche: new Date().toLocaleDateString(),
        salaire,
        contact,
        statut,
      };
      setEmployes([...employes, nouvelEmploye]);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">👥 Gestion des Employés</h1>
          
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={ajouterEmploye}
          >
            <FaPlus /> Ajouter un Employé
          </button>

          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nom et Prénom</th>
                  <th className="border p-2">Poste</th>
                  <th className="border p-2">Département</th>
                  <th className="border p-2">Date d'Embauche</th>
                  <th className="border p-2">Salaire (Mensuel)</th>
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
                    <td className={`border p-2 ${employe.statut === "Actif" ? "text-green-600" : "text-red-600"}`}>{employe.statut}</td>
                    <td className="border p-2 flex justify-center gap-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => modifierEmploye(employe.id)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => supprimerEmploye(employe.id)}
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

export default Employes;
