"use client";

import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { 
  Package, AlertTriangle, Truck, ClipboardList, 
  Bell, Factory, CheckCircle 
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import Sidebar from "../../componentApprovisionnement/sidebar";
import Header from "../../componentApprovisionnement/header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Données des graphiques
  const stockHistoryData = {
    labels: ["24/04", "23/04", "22/04", "21/04", "20/04", "19/04", "18/04"],
    datasets: [
      {
        label: "Zinc brut",
        data: [450, 600, 550, 700, 800, 750, 900],
        borderColor: '#3B82F6',
        tension: 0.4
      },
      {
        label: "Acier galvanisé",
        data: [150, 300, 400, 350, 200, 250, 300],
        borderColor: '#F59E0B',
        tension: 0.4
      },
      {
        label: "Aluminium",
        data: [2200, 2000, 1800, 2100, 1900, 2300, 2400],
        borderColor: '#10B981',
        tension: 0.4
      }
    ]
  };

  const stockDistributionData = {
    labels: ["Zinc brut", "Aluminium", "Acier galvanisé"],
    datasets: [{
      data: [25, 50, 25],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
    }]
  };

  const alertsData = {
    labels: ["MP001", "MP003"],
    datasets: [{
      label: "Alertes de seuil",
      data: [3, 4],
      backgroundColor: ['#EF4444']
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="p-6 bg-gray-50 mt-16 space-y-6">
          {/* Section KPI */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Package className="text-blue-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Stock total matières</p>
                  <p className="text-2xl font-bold">12 400 kg</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Matières sous seuil</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Réceptions aujourd'hui</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-blue-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Demandes de production</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Tableaux */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tableau Stock */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">État du stock des matières premières</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">Code</th>
                    <th className="pb-2">Matière</th>
                    <th className="pb-2">Stock actuel</th>
                    <th className="pb-2">Seuil min.</th>
                    <th className="pb-2">Fournisseur</th>
                    <th className="pb-2">Dernière entrée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-red-50">
                    <td className="py-2">MP001</td>
                    <td>Zinc brut</td>
                    <td>450 kg</td>
                    <td>500 kg</td>
                    <td>ZincPro</td>
                    <td>24/04/2025</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">MP002</td>
                    <td>Bobine aluminium</td>
                    <td>2200 kg</td>
                    <td>1000 kg</td>
                    <td>AluSteel</td>
                    <td>24/04/2025</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="py-2">MP003</td>
                    <td>Acier galvanisé</td>
                    <td>150 kg</td>
                    <td>400 kg</td>
                    <td>FerTun</td>
                    <td>23/04/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Réceptions récentes */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Réceptions récentes</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">Réf</th>
                    <th className="pb-2">Fournisseur</th>
                    <th className="pb-2">Matière</th>
                    <th className="pb-2">Qté</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">REC0021</td>
                    <td>ZincPro</td>
                    <td>Zinc brut</td>
                    <td>300 kg</td>
                    <td>24/04/2025</td>
                    <td><CheckCircle className="text-green-500 inline"/></td>
                  </tr>
                  <tr>
                    <td className="py-2">REC0020</td>
                    <td>AluSteel</td>
                    <td>Aluminium</td>
                    <td>1200 kg</td>
                    <td>23/04/2025</td>
                    <td>
                      <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                        Valider
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section Demandes + Alertes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Demandes production */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Demandes de production</h3>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  + Nouvelle
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">Réf</th>
                    <th className="pb-2">Produit</th>
                    <th className="pb-2">Matière</th>
                    <th className="pb-2">Qté</th>
                    <th className="pb-2">État</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">DP0012</td>
                    <td>Fer plat</td>
                    <td>Zinc brut</td>
                    <td>600 kg</td>
                    <td><span className="text-yellow-500">🟡 En attente</span></td>
                    <td>24/04/2025</td>
                  </tr>
                  <tr>
                    <td className="py-2">DP0011</td>
                    <td>Bobine acier</td>
                    <td>Acier</td>
                    <td>800 kg</td>
                    <td><CheckCircle className="text-green-500 inline"/></td>
                    <td>23/04/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Alertes */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Alertes en temps réel</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded">
                  <Bell className="text-red-500 mt-1 h-5 w-5"/>
                  <div>
                    <div className="text-sm font-medium">10:00 - Stock Zinc</div>
                    <div className="text-sm text-gray-500">Seuil minimal dépassé (500kg)</div>
                    <button className="text-blue-500 text-sm mt-1">
                      Créer demande de production →
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                  <Bell className="text-blue-500 mt-1 h-5 w-5"/>
                  <div>
                    <div className="text-sm font-medium">11:15 - Réception</div>
                    <div className="text-sm text-gray-500">Validation en attente</div>
                    <button className="text-blue-500 text-sm mt-1">
                      Vérifier la livraison →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-semibold mb-3">Historique des stocks (7j)</h4>
              <div className="h-48">
                <Line data={stockHistoryData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-semibold mb-3">Répartition du stock</h4>
              <div className="h-48">
                <Doughnut data={stockDistributionData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm font-semibold mb-3">Alertes de seuil</h4>
              <div className="h-48">
                <Bar data={alertsData} options={chartOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;