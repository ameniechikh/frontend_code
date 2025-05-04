import { useState, useEffect } from "react";
import { Bell, Search, LogOut } from "lucide-react";
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
    router.push("/client/auth");
  };

  return (
    <header className="bg-blue-100 shadow-md p-4 flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-blue-600" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="pl-10 p-2 bg-white text-gray-700 placeholder-gray-400 border border-blue-300 rounded w-80 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-blue-600 cursor-pointer hover:text-blue-800 transition" />
        <div className="relative">
          <img
            src={userInfo.profilePic}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded p-2 w-44 z-50">
              <p className="p-2 font-medium">{userInfo.firstName} {userInfo.lastName}</p>
              <div
                className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-blue-100 rounded transition"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-blue-700" />
                <span>Déconnexion</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
