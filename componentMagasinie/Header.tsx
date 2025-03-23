import { useState, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { useRouter } from "next/router";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Utilisateur",
    lastName: "",
    profilePic: "/default-avatar.png",
  });
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = () => {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (storedUserInfo.firstName) {
        setUserInfo(storedUserInfo);
      }
    };

    loadUserInfo();
    window.addEventListener("storage", loadUserInfo);
    return () => window.removeEventListener("storage", loadUserInfo);
  }, []);

  const handleLogout = () => {
    router.push("/Magasinie/logo");
  };

  return (
    <header className="bg-ocean shadow-md p-4 flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-500" />
        <input type="text" placeholder="Rechercher..." className="pl-10 p-2 border rounded w-80" />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-600 cursor-pointer" />
        <div className="relative">
          <img
            src={userInfo.profilePic}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded p-2 w-40">
              <p className="p-2">{userInfo.firstName} {userInfo.lastName}</p>
              <p className="cursor-pointer p-2 hover:bg-gray-200" onClick={handleLogout}>🚪 Déconnexion</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
