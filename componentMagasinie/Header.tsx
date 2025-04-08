import { useState, useEffect, useRef } from "react";
import { Bell, Search, Settings, LogOut, User, X } from "lucide-react";
import { useRouter } from "next/router";

interface Notification {
  id: number;
  message: string;
  type: "stock" | "urgence" | "indisponible";
  timestamp: string;
  action?: string;
}

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Produit ABC - Stock critique (5 unités restantes)",
      type: "stock",
      timestamp: "2024-03-20 14:30",
      action: "Réapprovisionner"
    },
    {
      id: 2,
      message: "Commande urgente #1234 à expédier",
      type: "urgence",
      timestamp: "2024-03-20 15:15",
      action: "Traiter"
    }
  ]);

  const modalRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [userInfo, setUserInfo] = useState({
    firstName: "Utilisateur",
    lastName: "",
    email: "user@example.com",
    profilePic: "",
  });

  const [editUserInfo, setEditUserInfo] = useState({ ...userInfo });

  useEffect(() => {
    const loadUserInfo = () => {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (storedUserInfo.firstName) {
        setUserInfo(storedUserInfo);
        setEditUserInfo(storedUserInfo);
      }
    };

    loadUserInfo();
    window.addEventListener("storage", loadUserInfo);
    return () => window.removeEventListener("storage", loadUserInfo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.push("/Magasinie/login");
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setEditUserInfo(prev => ({
            ...prev,
            profilePic: reader.result as string
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    const updatedUserInfo = { 
      ...editUserInfo,
      profilePic: editUserInfo.profilePic || "/default-avatar.png"
    };
    
    setUserInfo(updatedUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    setEditModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setEditModalOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
        <input 
          type="text" 
          placeholder="Rechercher..." 
          className="pl-10 pr-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-lg border max-h-96 overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button 
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        {/* Icônes des notifications... */}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                        {notification.action && (
                          <button className="mt-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1"
          >
            <img
              src={userInfo.profilePic || "/default-avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg border">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <User className="text-gray-600" />
                  <div>
                    <p className="font-medium">{userInfo.firstName} {userInfo.lastName}</p>
                    <p className="text-sm text-gray-500">{userInfo.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span>Modifier le profil</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier le profil</h2>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <label className="cursor-pointer">
                  <img
                    src={editUserInfo.profilePic || "/default-avatar.png"}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full mb-2 object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-blue-600">
                  {editUserInfo.profilePic ? "Changer la photo" : "Ajouter une photo"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editUserInfo.firstName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editUserInfo.lastName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editUserInfo.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={saveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;