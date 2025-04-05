import { Search, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nom: "Jean",
    prenom: "Dupont",
    email: "jean.dupont@entreprise.com",
    adresse: "123 Rue des Aciéries",
    telephone: "+33 6 12 34 56 78",
    photo: "/user.jpg"
  });

  const handleLogout = () => {
    window.location.href = "/Commercial/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, photo: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center relative">
      {/* Recherche Client */}
      <div className="flex items-center gap-3">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="border border-gray-300 rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Profil utilisateur */}
      <div className="relative">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={profile.photo}
            alt="Profil"
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold">{profile.prenom} {profile.nom}</p>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Menu déroulant */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl">
            <div className="p-2">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Modifier profil
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de modification du profil */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier le profil</h2>
              <button onClick={() => setIsEditing(false)}>×</button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={profile.prenom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={profile.nom}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={profile.adresse}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={profile.telephone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photo de profil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;