import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

const Header = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setDate(today.toLocaleDateString("fr-FR", options));
  }, []);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <h2 className="text-lg font-semibold">👋 Bonjour, Agent Approvisionnement</h2>
      <div className="flex items-center space-x-6">
        <span className="text-gray-600">{date}</span>
        <button className="flex items-center space-x-2 text-red-600 hover:text-red-800">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
