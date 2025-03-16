import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaExclamationTriangle, FaCog, FaSearch } from "react-icons/fa";

const Alertes = () => {
  const alertes = [
    {
      id: 1,
      type: "Retard de Production",
      source: "Ligne 3",
      priorite: "🔴 Haute",
      message: "Retard de 2h sur le plan de production",
      dateHeure: "2023-10-25 14:30",
      statut: "Non Résolue",
      actions: ["Vérifier", "Reporter"]
    },
    {
      id: 2,
      type: "Panne Machine",
      source: "Presse Hydraulique",
      priorite: "🔴 Haute",
      message: "Défaillance du moteur principal",
      dateHeure: "2023-10-25 10:15",
      statut: "En Cours",
      actions: ["Maintenance"]
    },
    {
      id: 3,
      type: "Stock Critique",
      source: "Matière Première A",
      priorite: "🟠 Moyenne",
      message: "Stock ≤ 50 unités (seuil : 100)",
      dateHeure: "2023-10-25 09:00",
      statut: "Résolue",
      actions: ["Commander"]
    },
    {
      id: 4,
      type: "Défaut Qualité",
      source: "Produit XYZ",
      priorite: "🟡 Basse",
      message: "5% de défauts détectés en contrôle",
      dateHeure: "2023-10-24 16:45",
      statut: "Enquête",
      actions: ["Analyser"]
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">🚨 Gestion des Alertes</h1>

          {/* Tableau des alertes */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Tableau des Alertes en Temps Réel</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Type d'Alerte</th>
                  <th className="border p-2">Source</th>
                  <th className="border p-2">Priorité</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Date/Heure</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alertes.map(alert => (
                  <tr key={alert.id} className="hover:bg-gray-100">
                    <td className="border p-2">{alert.type}</td>
                    <td className="border p-2">{alert.source}</td>
                    <td className="border p-2">{alert.priorite}</td>
                    <td className="border p-2">{alert.message}</td>
                    <td className="border p-2">{alert.dateHeure}</td>
                    <td className="border p-2">
                      <span className={`font-semibold ${alert.statut === "Non Résolue" ? "text-red-600" : alert.statut === "En Cours" ? "text-yellow-600" : "text-green-600"}`}>
                        {alert.statut}
                      </span>
                    </td>
                    <td className="border p-2 flex space-x-2">
                      {alert.actions.map((action, index) => (
                        <button key={index} className="text-blue-500 hover:text-blue-700">{action}</button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alertes Visuelles */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Alertes Visuelles (Dashboard)</h2>
            <div className="bg-red-500 text-white p-4 mb-4 rounded flex items-center space-x-3">
              <FaExclamationTriangle size={30} />
              <div>
                <h3 className="text-lg font-semibold">🔴 URGENT - Machine 5 - Surchauffe</h3>
                <p>Localisation : Zone de Soudage</p>
                <p>Température : 120°C (Seuil max: 90°C)</p>
                <p>Recommandation : Arrêt immédiat pour inspection.</p>
                <p>Responsable : Équipe Maintenance (Notifié à 15h20)</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Alertes;
