import { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { useRouter } from "next/router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/client/auth"); // Redirection vers la page de connexion
  };

  return (
    <header className="bg-ocean shadow-md p-4 flex justify-between items-center">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="pl-10 p-2 border rounded w-80"
        />
      </div>

      {/* Notifications et Profil */}
      <div className="flex items-center space-x-4">
        <Bell className="text-gray-600 cursor-pointer" />

        {/* Menu utilisateur */}
        <div className="relative">
          <img
            src="/user.jpg"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded p-2 w-40">
              <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => router.push("/account")}>⚙️ Paramètres</p>
              <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={handleLogout}>🚪 Déconnexion</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
