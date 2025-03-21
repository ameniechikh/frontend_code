import { useState } from "react";
import { Line } from "react-chartjs-2"; // Importation du graphique
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

// Enregistrement des composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardFournisseur = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", message: "⚠️ ALERTE - Stock critique de Coke Métallurgique (12T restants)" },
    { id: 2, type: "success", message: "✅ CONFIRMÉ - Livraison #4587 acceptée par ArcelorMittal" },
  ]);

  // Données du graphique
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Mois
    datasets: [
      {
        label: "Commandes Honorées",
        data: [100, 120, 80, 150, 130, 170], // Données pour les commandes honorées
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Retards",
        data: [10, 20, 15, 30, 25, 35], // Données pour les retards
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Commandes honorées vs retards (6 derniers mois)",
      },
    },
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarFournisseur />

      {/* Contenu Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderFournisseur />

        {/* Contenu Dashboard */}
        <main className="p-6 bg-gray-100 overflow-auto flex-1">
          <h1 className="text-3xl font-bold mb-6">📊 Dashboard Fournisseur Opérationnel</h1>

          {/* Alertes Personnalisées */}
          {alerts.length > 0 && (
            <div className="mb-6">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded mb-2 ${alert.type === "danger" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {alert.message}
                </div>
              ))}
            </div>
          )}

          {/* KPI - Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📦 Commandes en cours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600">12</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🚛 Livraisons cette semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-orange-600">15/20T</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Chiffre d'affaires mensuel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">€225K</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⏱ Délai moyen de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-red-600">2.3 jours</p>
              </CardContent>
            </Card>
          </div>

          {/* Graphique des Performances */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>📉 Graphique des Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={data} options={options} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardFournisseur;
