import { Search, BarChart } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [objectifMensuel, setObjectifMensuel] = useState(75); // Exemple d'objectifs mensuels (en pourcentage)

  return (
    <header className="bg-white p-4 shadow-md flex justify-between items-center">
      {/* Recherche Client */}
      <div className="flex items-center space-x-3">
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          className="border border-gray-300 rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Indicateur Objectifs Mensuels */}
      <div className="flex items-center space-x-3">
        <BarChart className="text-green-500 w-5 h-5" />
        <div>
          <h3 className="font-semibold">Objectif Mensuel</h3>
          <p className="text-sm text-gray-600">{objectifMensuel}% atteint</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
