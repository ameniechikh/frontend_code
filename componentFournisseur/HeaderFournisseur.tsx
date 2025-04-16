import { useState } from "react";
import { Search, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/router";

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

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    router.push('/Fournisseur/auth');
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
            <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => setIsFormOpen(true)}>
              <Settings className="inline mr-2" /> Paramètres du compte
            </p>
            <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={handleLogout}>
              <LogOut className="inline mr-2" /> Déconnexion
            </p>
          </div>
        )}
      </div>

      {/* Formulaire réduit */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-lg w-[320px] max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-bold mb-3 text-center">Modifier profil</h2>

            {[
              { label: "Nom", name: "firstName", type: "text" },
              { label: "Prénom", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Adresse", name: "address", type: "text" },
              { label: "Téléphone", name: "phone", type: "tel" }
            ].map(({ label, name, type }) => (
              <div className="mb-3" key={name}>
                <label className="block text-sm text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={userInfo[name as keyof typeof userInfo]}
                  onChange={handleInputChange}
                  className="w-full p-1.5 border border-gray-300 rounded text-sm text-black"
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block text-sm text-gray-700">Photo de profil</label>
              <input
                type="file"
                onChange={handlePhotoChange}
                className="w-full text-sm p-1 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600"
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
