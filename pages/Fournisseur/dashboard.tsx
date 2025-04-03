import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Truck, Euro, Clock, Package, X } from "lucide-react";

// Composants personnalisés
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle 
} from "../../componentFournisseur/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardFournisseur = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", message: "Stock critique de Coke Métallurgique (12T restants)" },
    { id: 2, type: "success", message: "Livraison #4587 acceptée par ArcelorMittal" },
  ]);

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Commandes Honorées",
        data: [100, 120, 80, 150, 130, 170],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Retards",
        data: [10, 20, 15, 30, 25, 35],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Coke", "Minerai Fer", "Charbon", "Calcaire"],
    datasets: [{
      label: "Ventes Mensuelles (T)",
      data: [65, 59, 80, 81],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Performances des Commandes" }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Fixée */}
      <div className="fixed h-screen w-64 z-50">
        <SidebarFournisseur />
      </div>

      {/* Contenu Principal */}
      <div className="ml-64">
        <HeaderFournisseur />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Opérationnel</h1>
            <span className="text-sm text-gray-500">Mis à jour il y a 5 min</span>
          </div>

          <div className="grid gap-3">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg flex items-center justify-between shadow-sm ${
                  alert.type === 'danger' 
                    ? 'bg-red-50 border-l-4 border-red-400' 
                    : 'bg-green-50 border-l-4 border-green-400'
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${alert.type === 'danger' ? 'text-red-400' : 'text-green-400'}`}>
                    {alert.type === 'danger' ? '⚠️' : '✅'}
                  </div>
                  <p className="ml-3 text-sm font-medium">{alert.message}</p>
                </div>
                <button 
                  onClick={() => setAlerts(a => a.filter(item => item.id !== alert.id))}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Commandes en cours</CardTitle>
                <Package className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2.5% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Livraisons hebdo</CardTitle>
                <Truck className="h-6 w-6 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15/20T</div>
                <p className="text-xs text-muted-foreground">3 en transit</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">CA Mensuel</CardTitle>
                <Euro className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">225K€</div>
                <p className="text-xs text-muted-foreground">+14% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Délai moyen</CardTitle>
                <Clock className="h-6 w-6 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.3j</div>
                <p className="text-xs text-muted-foreground">-0.5j vs objectif</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 h-96">
              <h3 className="text-lg font-semibold mb-4">Performance des Livraisons</h3>
              <Line data={lineChartData} options={chartOptions} />
            </Card>

            <Card className="p-4 h-96">
              <h3 className="text-lg font-semibold mb-4">Répartition des Ventes</h3>
              <Bar data={barChartData} options={chartOptions} />
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commandes Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">N° Commande</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Produit</th>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3">Livraison</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-t">
                        <td className="py-3">#45{i}87</td>
                        <td>ArcelorMittal</td>
                        <td>Coke Métallurgique</td>
                        <td>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Livré
                          </span>
                        </td>
                        <td>12/06/2024</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardFournisseur;