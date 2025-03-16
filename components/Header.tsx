import { useState, useEffect } from "react";
import { Bell, Mail, Search, CheckCircle, LogOut, Settings, X } from "lucide-react";
import { useRouter } from "next/router";

interface Notification {
  message: string;
}

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface HeaderProps {
  socket?: any;
  notifications?: Notification[];
  messages?: Message[];
}

const Header: React.FC<HeaderProps> = ({ socket, notifications = [], messages = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(notifications.length);
  const [unreadMessages, setUnreadMessages] = useState(messages.length);

  const [userInfo, setUserInfo] = useState({
    name: "Saidani Imen",
    photo: "/user.jpg",
    email: "Imen@saidani.com",
  });

  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notif: Notification) => {
      setUnreadNotifs((prev) => prev + 1);
    };

    const handleNewMessage = (msg: Message) => {
      setUnreadMessages((prev) => prev + 1);
    };

    socket.on("newNotification", handleNewNotification);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newNotification", handleNewNotification);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-[add8e6] shadow-md p-4 flex justify-between items-center relative">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-black-500" />
        <input type="text" placeholder="Rechercher..." className="pl-10 p-2 border rounded w-80" />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Bell className="text-black-600 cursor-pointer w-6 h-6" onClick={() => setNotifOpen(!notifOpen)} />
          {unreadNotifs > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{unreadNotifs}</span>}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded p-2">
              <h3 className="font-bold mb-2">🔔 Notifications</h3>
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
                    <CheckCircle className="text-green-500" />
                    <span>{notif.message}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucune notification</p>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <Mail className="text-gray-600 cursor-pointer w-6 h-6" onClick={() => setMessageOpen(!messageOpen)} />
          {unreadMessages > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{unreadMessages}</span>}
          {messageOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded p-2">
              <h3 className="font-bold mb-2">📩 Messages</h3>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <p className="font-bold">{msg.sender}</p>
                    <p className="text-gray-600 text-sm">{msg.text}</p>
                    <p className="text-xs text-gray-400">{msg.time}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Aucun message</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
