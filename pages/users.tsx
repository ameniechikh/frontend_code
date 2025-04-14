import { useState } from "react";
import { Edit, Trash, PlusCircle, Search, Unlock } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const roles = [
  "Agent Production",
  "Agent approvisionnement",
  "Agent magasinier",
  "Fournisseur",
  "Client",
];

const initialUsers = [
  { id: 1, name: "Admin", email: "admin@smartsteel.com", role: "Admin", status: "Actif" },
  { id: 2, name: "Ali Ben Salah", email: "ali.ben@smartsteel.com", role: "Agent commercial", status: "Inactif" },
  { id: 3, name: "Nadia Trabelsi", email: "nadia.trabelsi@smartsteel.com", role: "Client", status: "Actif" },
];

const User = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ id: null, name: "", email: "", role: "Client", status: "Actif" });

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  // Ajouter ou Modifier un utilisateur
  const handleSaveUser = () => {
    if (newUser.id) {
      setUsers(users.map(user => (user.id === newUser.id ? newUser : user)));
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setShowForm(false);
    setNewUser({ id: null, name: "", email: "", role: "Client", status: "Actif" });
  };

  // Supprimer un utilisateur
  const handleDeleteUser = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Activer/Désactiver un utilisateur
  const toggleUserStatus = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "Actif" ? "Inactif" : "Actif" } : user));
  };

  // Réinitialiser le mot de passe
  const resetPassword = (id) => {
    alert(`Mot de passe réinitialisé pour l'utilisateur ID ${id}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <div className="flex flex-col p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">👤 Gestion des Utilisateurs</h2>
            <button
              onClick={() => {
                setNewUser({ id: null, name: "", email: "", role: "Client", status: "Actif" });
                setShowForm(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <PlusCircle className="mr-2" /> Ajouter Utilisateur
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="pl-10 p-2 border rounded w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white shadow-md rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Rôle</th>
                  <th className="p-3 text-left">Statut</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className={`p-3 font-bold ${user.status === "Actif" ? "text-green-600" : "text-red-600"}`}>{user.status}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => { setNewUser(user); setShowForm(true); }} className="text-blue-500 mr-3"><Edit /></button>
                      <button onClick={() => toggleUserStatus(user.id)} className="text-yellow-500 mr-3">🔄</button>
                      <button onClick={() => resetPassword(user.id)} className="text-purple-500 mr-3"><Unlock /></button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-500"><Trash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showForm && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4">{newUser.id ? "Modifier" : "Ajouter"} Utilisateur</h3>
                <input type="text" placeholder="Nom" className="w-full p-2 border mb-3 rounded" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full p-2 border mb-3 rounded" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <select className="w-full p-2 border mb-3 rounded" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>{roles.map(role => <option key={role}>{role}</option>)}</select>
                <button onClick={() => setShowForm(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Annuler</button>
                <button onClick={handleSaveUser} className="bg-blue-500 px-4 py-2 rounded text-white ml-2">Enregistrer</button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default User;
