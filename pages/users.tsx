import { useEffect, useState } from "react";
import { Edit, Trash, PlusCircle, Search, Unlock } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_USERS } from "../graphql/users/user.queries";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "../graphql/users/user.mutations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type UserStatus = "Actif" | "Inactif";
export type UserRole =
  | "Admin"
  | "Agent production"
  | "Agent approvisionnement"
  | "Agent magasinier"
  | "Fournisseur"
  | "Client";

export interface User {
  id: string | null;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

const roles = [
  "Agent production",
  "Agent approvisionnement",
  "Agent magasinier",
  "Fournisseur",
  "Client",
];

const User = () => {
  const { data } = useQuery(FIND_USERS);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  const [users, setUsers] = useState<User[]>(data?.users || []);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    role: "Client",
    status: "Actif",
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // GraphQL Mutations
  const [createUserMutation] = useMutation(CREATE_USER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, { refetchQueries: [FIND_USERS] });

  const getUserRole = (role: string): string => {
      switch (role) {
        case "Admin":
          return "ADMIN";
        case "Agent production":
          return "AGENT_PRODUCTION";
        case "Agent approvisionnement":
          return "AGENT_APPROVISIONNEMENT";
        case "Agent magasinier":
          return "AGENT_MAGASINIER";
        case "Fournisseur":
          return "FOURNISSEUR";
        case "Client":
          return "CLIENT";
        default:
          return newUser.role;
      }
  }

  const handleSaveUser = async (userToSave?: User) => {
     const user = userToSave || newUser;

     console.log(user);
    try {
      const input = {
        name: user.name,
        email: user.email,
        role: getUserRole(user.role),
        status: user.status.toUpperCase(),
      };

      if (user.id) {
        // Update existing user
        const { data } = await updateUserMutation({
          variables: { input: { ...input, id: user.id } },
        });

        if (data?.user) {
          console.log(users, data.user);
          // setUsers(
          //   users.map(user =>
          //     user.id === user.id ? data.user : user
          //   )
          // );
          toast.success("Utilisateur mis à jour avec succès!");
        }
      } else {
        // Create new user
        const { data } = await createUserMutation({
          variables: {
            input,
          },
        });

        if (data?.user) {
          setUsers([...users, data.user]);
          toast.success("Utilisateur créé avec succès!");
        }
      }

      // Reset form state
      setShowForm(false);
      setNewUser({ id: null, name: "", email: "", role: "Client", status: "Actif" });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de l'utilisateur:", err);
      toast.error("Une erreur est survenue lors de la sauvegarde de l'utilisateur.");
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      deleteUser({ variables: { id } })
        .then(() => {
          console.log("Utilisateur supprimé avec succès");
          toast.success("Utilisateur supprimé avec succès!");
        })
        .catch(err => {
          console.error("Erreur lors de la suppression de l'utilisateur:", err);
          toast.error("Une erreur est survenue lors de la suppression de l'utilisateur.");
        });
    }
  };

  const toggleUserStatus = (user: User) => {
    console.log(user);
    const newUserStatus = user!.status === "Actif" ? "Inactif" : "Actif";
    handleSaveUser({...user!, status: newUserStatus });
  };

  const resetPassword = (id: string) => {
    // TODO : Implement password reset logic
    toast.info(`Mot de passe réinitialisé pour l'utilisateur ID ${id}`);
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
              onChange={e => setSearch(e.target.value)}
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
                    <td className={`p-3 font-bold ${user.status === "Actif" ? "text-green-600" : "text-red-600"}`}
                    onClick={() => toggleUserStatus(user)}
                    >{user.status}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => { setNewUser(user); setShowForm(true); }} className="text-blue-500 mr-3"><Edit /></button>
                      <button onClick={() => resetPassword(user.id!)} className="text-purple-500 mr-3"><Unlock /></button>
                      <button onClick={() => handleDeleteUser(user.id!)} className="text-red-500"><Trash /></button>
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
                <input type="text" placeholder="Nom" className="w-full p-2 border mb-3 rounded" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full p-2 border mb-3 rounded" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                <select className="w-full p-2 border mb-3 rounded" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>{roles.map(role => <option key={role}>{role}</option>)}</select>
                <button onClick={() => setShowForm(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Annuler</button>
                <button onClick={() => handleSaveUser()} className="bg-blue-500 px-4 py-2 rounded text-white ml-2">Enregistrer</button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default User;
