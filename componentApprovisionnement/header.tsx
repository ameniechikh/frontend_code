import { useState } from "react";
import { Search, Settings, LogOut, Bell, X } from "lucide-react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  
  // États utilisateur
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "1234 Steel Rd.",
    phone: "+1234567890",
  });

  // Système de notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: "order", 
      message: "Commande #1234 validée", 
      read: false,
      date: "2024-03-15 14:30"
    },
    { 
      id: 2, 
      type: "invoice", 
      message: "Facture #5678 disponible", 
      read: false,
      date: "2024-03-15 10:15"
    },
    { 
      id: 3, 
      type: "new-material", 
      message: "Nouvel acier inoxydable disponible", 
      read: false,
      date: "2024-03-14 16:45"
    },
    { 
      id: 4, 
      type: "low-stock", 
      message: "Stock critique de charbon métallurgique (reste 50T)", 
      read: false,
      date: "2024-03-14 09:20"
    },
  ]);

  // Configuration des types de notifications
  const notificationConfig = {
    order: { title: "Commandes & Factures", color: "bg-blue-100", icon: "📦" },
    invoice: { title: "Commandes & Factures", color: "bg-blue-100", icon: "🧾" },
    "new-material": { title: "Nouvelles Matières", color: "bg-green-100", icon: "🆕" },
    "low-stock": { title: "Alertes Stock", color: "bg-red-100", icon: "⚠️" }
  };

  // Styles personnalisés
  const styles = {
    searchBar: "border-2 border-black rounded-lg focus:ring-2 focus:ring-yellow-500 h-12 text-lg",
    profileImage: "border-2 border-black rounded-full"
  };

  // Gestion des notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAllNotifications = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Gestion du profil utilisateur
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleLogout = () => {
    router.push('/Approvisionnement/LoginPage');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Barre de recherche agrandie */}
      <div className="relative flex-1 max-w-2xl mr-8">
        <Search className="absolute left-4 top-3.5 text-gray-500" size={24} />
        <input
          type="text"
          placeholder="Rechercher des matières premières, fournisseurs..."
          className={`pl-12 pr-4 py-3 w-full ${styles.searchBar} text-gray-700 placeholder-gray-400`}
        />
      </div>

      {/* Section de droite */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 relative hover:bg-gray-100 rounded-full"
          >
            <Bell size={24} className="text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown des notifications */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-lg border border-gray-200">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearAllNotifications}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Tout marquer comme lu
                  </button>
                  <X 
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setNotificationsOpen(false)}
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {Object.entries(notificationConfig).map(([type, config]) => {
                  const filteredNotifications = notifications.filter(
                    n => n.type === type && !n.read
                  );

                  return filteredNotifications.length > 0 && (
                    <div key={type} className="border-b last:border-b-0">
                      <div className="p-3 bg-gray-50 flex items-center gap-2">
                        <span className={config.color + " p-2 rounded-lg"}>
                          {config.icon}
                        </span>
                        <h4 className="font-medium">{config.title}</h4>
                      </div>
                      {filteredNotifications.map(notification => (
                        <div
                          key={notification.id}
                          className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-start"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.date}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profil utilisateur */}
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src="/user.jpg"
              alt="Profil"
              className={`w-10 h-10 object-cover ${styles.profileImage}`}
            />
            <div>
              <p className="font-semibold text-sm">{userInfo.firstName} {userInfo.lastName}</p>
              <p className="text-xs text-gray-600">Agent d'approvisionnement</p>
            </div>
          </div>

          {/* Menu déroulant du profil */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl">
              <div className="p-2">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2"
                >
                  <Settings size={18} className="text-gray-600" />
                  Paramètres du compte
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full p-2 text-left hover:bg-gray-100 rounded flex items-center gap-2"
                >
                  <LogOut size={18} className="text-gray-600" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modale des paramètres utilisateur */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Modifier le profil</h2>
              <X 
                size={24}
                className="cursor-pointer hover:text-gray-700"
                onClick={() => setIsFormOpen(false)}
              />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photo de profil</label>
                <input
                  type="file"
                  onChange={(e) => e.target.files?.[0] && setNewPhoto(e.target.files[0])}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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