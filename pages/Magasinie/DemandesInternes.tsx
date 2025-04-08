import { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Clock, CheckCircle, XCircle, Truck, User, Package, RefreshCw } from "lucide-react";

const DemandesInternes = () => {
  const [filterStatut, setFilterStatut] = useState("tous");
  const [filterType, setFilterType] = useState("tous");
  
  const [demandes, setDemandes] = useState([
    {
      id: "CMD-2401",
      type: "commercial",
      produit: "Acier S355",
      quantite: 50,
      demandeur: "Jean Dupont",
      date: "2024-03-20",
      statut: "en-attente",
      details: "Commande client #4567"
    },
    {
      id: "APP-2401",
      type: "approvisionnement",
      produit: "Bobines Aluminium",
      quantite: 200,
      demandeur: "Service Production",
      date: "2024-03-19",
      statut: "en-preparation",
      details: "Pour lot production #789"
    },
    {
      id: "CMD-2402",
      type: "commercial",
      produit: "Tubes Cuivre",
      quantite: 30,
      demandeur: "Marie Curie",
      date: "2024-03-21",
      statut: "termine",
      details: "Commande urgente client #4572"
    }
  ]);

  const getStatusBadge = (statut: string) => {
    const styles = {
      "en-attente": "bg-yellow-100 text-yellow-800",
      "en-preparation": "bg-blue-100 text-blue-800",
      "termine": "bg-green-100 text-green-800",
      "rejete": "bg-red-100 text-red-800"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${styles[statut]}`}>
        {statut.replace("-", " ")}
      </span>
    );
  };

  const handleConfirmer = (id: string) => {
    setDemandes(demandes.map(d => 
      d.id === id ? { ...d, statut: "en-preparation" } : d
    ));
  };

  const handleRejeter = (id: string) => {
    setDemandes(demandes.map(d => 
      d.id === id ? { ...d, statut: "rejete" } : d
    ));
  };

  const handleTerminer = (id: string) => {
    setDemandes(demandes.map(d => 
      d.id === id ? { ...d, statut: "termine" } : d
    ));
  };

  const filteredDemandes = demandes.filter(d => {
    const statutMatch = filterStatut === "tous" || d.statut === filterStatut;
    const typeMatch = filterType === "tous" || d.type === filterType;
    return statutMatch && typeMatch;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* En-tête avec filtres */}
            <div className="p-4 border-b flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Package size={24} />
                  Gestion des Demandes Internes
                </h2>
                <div className="flex gap-3">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  >
                    <option value="tous">Tous les types</option>
                    <option value="commercial">Agent Commercial</option>
                    <option value="approvisionnement">Approvisionnement</option>
                  </select>
                  <select
                    value={filterStatut}
                    onChange={(e) => setFilterStatut(e.target.value)}
                    className="border rounded-md px-4 py-2"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="en-attente">En attente</option>
                    <option value="en-preparation">En préparation</option>
                    <option value="termine">Terminé</option>
                    <option value="rejete">Rejeté</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Liste des demandes */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Produit</th>
                    <th className="px-4 py-3 text-left">Quantité</th>
                    <th className="px-4 py-3 text-left">Demandeur</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Statut</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDemandes.map((demande) => (
                    <tr key={demande.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {demande.type === "commercial" ? (
                            <User size={18} className="text-blue-600" />
                          ) : (
                            <Truck size={18} className="text-green-600" />
                          )}
                          {demande.type === "commercial" ? "Commercial" : "Approvisionnement"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{demande.produit}</div>
                        <div className="text-sm text-gray-500">{demande.details}</div>
                      </td>
                      <td className="px-4 py-3">{demande.quantite}</td>
                      <td className="px-4 py-3">{demande.demandeur}</td>
                      <td className="px-4 py-3">{demande.date}</td>
                      <td className="px-4 py-3">{getStatusBadge(demande.statut)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {demande.statut === "en-attente" && (
                            <>
                              <button
                                onClick={() => handleConfirmer(demande.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                                title="Confirmer la demande"
                              >
                                <CheckCircle size={20} />
                              </button>
                              <button
                                onClick={() => handleRejeter(demande.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                title="Rejeter la demande"
                              >
                                <XCircle size={20} />
                              </button>
                            </>
                          )}
                          {demande.statut === "en-preparation" && (
                            <button
                              onClick={() => handleTerminer(demande.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                              title="Marquer comme terminé"
                            >
                              <CheckCircle size={20} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statistiques */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600">Total Demandes</div>
                  <div className="text-2xl font-bold mt-1">{demandes.length}</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600">En Attente</div>
                  <div className="text-2xl font-bold mt-1">
                    {demandes.filter(d => d.statut === "en-attente").length}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600">Terminées</div>
                  <div className="text-2xl font-bold mt-1">
                    {demandes.filter(d => d.statut === "termine").length}
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-600">Rejetées</div>
                  <div className="text-2xl font-bold mt-1">
                    {demandes.filter(d => d.statut === "rejete").length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandesInternes;