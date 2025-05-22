import { useState, useEffect } from "react";
import { Search, Settings, LogOut, Bell, X, AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);

  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "1234 Steel Rd.",
    phone: "+1234567890",
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: "low-stock", message: "Stock critique : Fer (50kg restants)", read: false, date: new Date().toISOString(), critical: true },
    { id: 2, type: "reception", message: "Réception validée : 200kg Cuivre (CMD-456)", read: false, date: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, type: "production", message: "Demande production approuvée : Tubes Acier", read: true, date: new Date(Date.now() - 86400000).toISOString() }
  ]);

  const notificationConfig = {
    "low-stock": { title: "Alertes Stock", color: "bg-red-100", icon: <AlertTriangle className="text-red-600" size={18} />, textColor: "text-red-700" },
    "reception": { title: "Réceptions", color: "bg-green-100", icon: <CheckCircle className="text-green-600" size={18} />, textColor: "text-green-700" },
    "production": { title: "Production", color: "bg-blue-100", icon: "🏭", textColor: "text-blue-700" }
  };

  const styles = {
    searchBar: "border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-12 text-lg transition-all w-full",
    profileImage: "border-2 border-gray-200 rounded-full shadow-sm"
  };

  const unreadCount = notifications.filter(n => !n.read && n.type === 'low-stock').length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days} j`;
  };

  const SearchBar = () => (
    <div className="relative flex-1 max-w-2xl mr-8 group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="text-gray-500 group-focus-within:text-blue-500 transition-colors" size={24} />
      </div>
      <input type="text" placeholder="" className={`pl-12 pr-4 py-3 ${styles.searchBar} text-gray-700 placeholder-gray-400 focus:border-blue-500`} />
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleLogout = () => {
    router.push('/Approvisionnement/LoginPage');
  };

  // 🔐 États pour mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <SearchBar />

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={24} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-xl border border-gray-200">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                <h3 className="font-semibold text-lg">Alertes et Notifications</h3>
                <div className="flex items-center gap-2">
                  <button onClick={clearAllNotifications} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Tout marquer comme lu
                  </button>
                  <X size={20} className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors" onClick={() => setNotificationsOpen(false)} />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(notification => {
                  const config = notificationConfig[notification.type as keyof typeof notificationConfig];
                  return (
                    <div key={notification.id} className={`p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-start transition-colors ${!notification.read ? 'bg-blue-50' : ''}`} onClick={() => markAsRead(notification.id)}>
                      <div className="flex gap-3">
                        <div className={`${config.color} p-2 rounded-lg`}>
                          {config.icon}
                        </div>
                        <div>
                          <p className={`text-sm ${config.textColor} font-medium`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {timeAgo(notification.date)}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <img src="/user.jpg" alt="Profil" className={`w-10 h-10 object-cover ${styles.profileImage}`} />
            <div>
              <p className="font-semibold text-sm">{userInfo.firstName} {userInfo.lastName}</p>
              <p className="text-xs text-gray-600">Agent d'approvisionnement</p>
            </div>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl">
              <div className="p-2">
                <button onClick={() => setIsFormOpen(true)} className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2">
                  <Settings size={18} className="text-gray-600" />
                  Paramètres
                </button>
                <button onClick={handleLogout} className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2">
                  <LogOut size={18} className="text-gray-600" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modale paramètres */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Modifier le profil</h2>
              <X size={24} className="cursor-pointer hover:text-gray-700" onClick={() => setIsFormOpen(false)} />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <input type="text" name="firstName" value={userInfo.firstName} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input type="text" name="lastName" value={userInfo.lastName} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Photo</label>
                  <input type="file" onChange={(e) => e.target.files?.[0] && setNewPhoto(e.target.files[0])} className="w-full p-2 border rounded-md" />
                </div>

                {/* 🔐 CHAMPS MOT DE PASSE */}
                <div>
                  <label className="block text-sm font-medium mb-1">Mot de passe actuel</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
