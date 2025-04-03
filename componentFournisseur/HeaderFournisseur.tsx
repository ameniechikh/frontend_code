import { useState } from "react";
import { Search, Download, Factory, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/router";  // Importation de useRouter

const HeaderFournisseur = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "1234 Steel Rd.",
    phone: "+1234567890",
  });

  const router = useRouter();  // Utilisation de useRouter

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour soumettre les modifications (mettre à jour la base de données ou autre)
    alert("Informations mises à jour");
    setIsFormOpen(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) setNewPhoto(file);
    }
  };

  const handleLogout = () => {
    // Logique de déconnexion (si nécessaire)
    router.push('/Fournisseur/auth');  // Redirige vers la page de connexion
  };

  return (
    <header className="bg-gray-50 text-black shadow-md p-4 flex justify-between items-center">
    

      {/* Barre de recherche */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher matière première, N° commande..."
          className="pl-10 p-2 border rounded w-full bg-black-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

  

      {/* Profil fournisseur */}
      <div className="relative">
        <div className="flex items-center cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          <img
            src="/user.jpg"
            alt="Fournisseur"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">AcierMax</p>
            <p className="text-sm text-gray-300">{userInfo.firstName} {userInfo.lastName}</p>
            <p className="text-sm text-gray-300">{userInfo.email}</p>
          </div>
        </div>

        {/* Menu déroulant */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-3 w-48">
            {/* Icône de paramètres */}
            <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => setIsFormOpen(true)}>
              <Settings className="inline mr-2" /> Paramètres du compte
            </p>
            {/* Icône de déconnexion */}
            <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={handleLogout}>
              <LogOut className="inline mr-2" /> Déconnexion
            </p>
          </div>
        )}
      </div>

     

      {/* Formulaire de modification des informations utilisateur */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Modifier les informations</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Adresse</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>

            {/* Sélectionner une nouvelle photo */}
            <div className="mb-4">
              <label className="block text-gray-700">Changer la photo de profil</label>
              <input
                type="file"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default HeaderFournisseur;
