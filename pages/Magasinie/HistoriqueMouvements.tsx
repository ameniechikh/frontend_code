import { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Search, Filter, ArrowDown, ArrowUp, Calendar } from "lucide-react";

const HistoriqueMouvements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("tous");
  const [filterDate, setFilterDate] = useState("");

  const [mouvements, setMouvements] = useState([
    {
      id: "M-001",
      type: "entree",
      produit: "Acier S355",
      quantite: 150,
      responsable: "Jean Dupont",
      date: "2024-03-20",
      reference: "REF-AC-2024"
    },
    {
      id: "M-002",
      type: "sortie",
      produit: "Aluminium 6061",
      quantite: 75,
      responsable: "Marie Curie",
      date: "2024-03-21",
      client: "Client X"
    },
    {
      id: "M-003",
      type: "entree",
      produit: "Cuivre C1020",
      quantite: 200,
      responsable: "Pierre Martin",
      date: "2024-03-22",
      fournisseur: "Fournisseur Y"
    }
  ]);

  const filteredMouvements = mouvements.filter((mouvement) => {
    const matchesSearch =
      mouvement.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mouvement.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "tous" || mouvement.type === filterType;
    const matchesDate = !filterDate || mouvement.date === filterDate;

    return matchesSearch && matchesType && matchesDate;
  });

  const getTypeBadge = (type: string) => {
    const styles = {
      entree: "bg-green-100 text-green-800",
      sortie: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${styles[type]}`}>
        {type === "entree" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        {type === "entree" ? "Entrée" : "Sortie"}
      </span>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar à gauche qui prend toute la hauteur */}
      <div className="w-64 min-h-screen bg-white border-r">
        <Sidebar />
      </div>

      {/* Contenu à droite qui défile verticalement */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />

        <main className="p-6 flex-1 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Filtres */}
            <div className="p-4 border-b flex flex-col gap-4">
              <h1 className="text-xl font-bold flex items-center gap-2">
                📜 Historique des Mouvements
              </h1>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par produit ou responsable..."
                    className="pl-10 pr-4 py-2 border rounded-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <Filter size={18} />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="entree">Entrées</option>
                    <option value="sortie">Sorties</option>
                  </select>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Type</th>
                    <th className="px-4 py-3 text-left text-sm">Produit</th>
                    <th className="px-4 py-3 text-left text-sm">Quantité</th>
                    <th className="px-4 py-3 text-left text-sm">Responsable</th>
                    <th className="px-4 py-3 text-left text-sm">Date</th>
                    <th className="px-4 py-3 text-left text-sm">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMouvements.map((mouvement) => (
                    <tr key={mouvement.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{getTypeBadge(mouvement.type)}</td>
                      <td className="px-4 py-3 font-medium">{mouvement.produit}</td>
                      <td className="px-4 py-3">{mouvement.quantite}</td>
                      <td className="px-4 py-3">{mouvement.responsable}</td>
                      <td className="px-4 py-3 flex items-center gap-1">
                        <Calendar size={14} className="text-gray-500" />
                        {mouvement.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {mouvement.type === "entree"
                          ? `Réf. fournisseur: ${mouvement.reference}`
                          : `Client: ${mouvement.client}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-600">Total mouvements</div>
                  <div className="text-xl font-bold mt-1">{mouvements.length}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-600">Entrées</div>
                  <div className="text-xl font-bold mt-1">
                    {mouvements.filter((m) => m.type === "entree").length}
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-sm text-red-600">Sorties</div>
                  <div className="text-xl font-bold mt-1">
                    {mouvements.filter((m) => m.type === "sortie").length}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Dernière mise à jour</div>
                  <div className="text-xl font-bold mt-1">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoriqueMouvements;
