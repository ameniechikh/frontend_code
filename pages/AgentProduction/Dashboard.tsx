"use client";

import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Package, CheckCircle, AlertCircle, Clock, Zap, TrendingUp } from "lucide-react";
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
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Données des graphiques
  const progressData = {
    labels: ["9h", "10h", "11h", "12h", "13h", "14h"],
    datasets: [{
      label: "% d'avancement",
      data: [20, 45, 60, 70, 74, 78],
      borderColor: '#3B82F6',
      tension: 0.4,
    }]
  };

  const productionData = {
    labels: ["Fer plat", "Tôle laminée", "Bobine"],
    datasets: [{
      label: "Quantité (kg)",
      data: [1200, 850, 920],
      backgroundColor: ['#60A5FA', '#34D399', '#A78BFA']
    }]
  };

  const productDistribution = {
    labels: ["Fer plat", "Tôle", "Bobine"],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#60A5FA', '#34D399', '#A78BFA']
    }]
  };

  const issuesData = {
    labels: ["Panne", "Retard", "Matière"],
    datasets: [{
      label: "Incidents",
      data: [5, 3, 2],
      backgroundColor: '#F87171'
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } }
  };

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header onToggleSidebar={toggleSidebar} />

        <main className="p-6 bg-gray-50 mt-16">
          {/* Section KPI */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <Package className="text-blue-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Commandes en production</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Terminées aujourd'hui</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-purple-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Avancement global</p>
                  <p className="text-2xl font-bold">74%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-500 h-6 w-6"/>
                <div>
                  <p className="text-sm text-gray-500">Pannes signalées</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Tableau + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Productions actives</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">Réf</th>
                    <th className="pb-2">Produit</th>
                    <th className="pb-2">Qté prévue</th>
                    <th className="pb-2">Réalisée</th>
                    <th className="pb-2">État</th>
                    <th className="pb-2">%</th>
                    <th className="pb-2">Fin estimée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">P001</td>
                    <td>Tôle laminée</td>
                    <td>1200 kg</td>
                    <td>860 kg</td>
                    <td><span className="text-yellow-500">🟡 En cours</span></td>
                    <td>72%</td>
                    <td>14h30</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">P002</td>
                    <td>Bobine acier</td>
                    <td>850 kg</td>
                    <td>850 kg</td>
                    <td><span className="text-green-500">✅ Terminé</span></td>
                    <td>100%</td>
                    <td>11h00</td>
                  </tr>
                  <tr>
                    <td className="py-2">P003</td>
                    <td>Fer plat</td>
                    <td>600 kg</td>
                    <td>320 kg</td>
                    <td><span className="text-red-500">🔴 Problème</span></td>
                    <td>53%</td>
                    <td>17h45</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Timeline de production</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>P001</span>
                    <span className="text-sm text-gray-500">72%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Fin estimée: 14h30</div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>P002</span>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>P003</span>
                    <span className="text-sm text-gray-500">53%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full w-1/2"></div>
                  </div>
                  <div className="text-sm text-red-500 mt-1">⚠ Problème détecté</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Basse */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alertes */}
            <div className="lg:col-span-1 bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-4">Alertes & Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-red-500">🛑</div>
                  <div>
                    <div className="text-sm font-medium">10:42 - Panne</div>
                    <div className="text-sm text-gray-500">Ligne 3 arrêtée – intervention nécessaire</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500">⏰</div>
                  <div>
                    <div className="text-sm font-medium">11:25 - Retard</div>
                    <div className="text-sm text-gray-500">Prod P001 dépasse le délai prévu</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-500">📉</div>
                  <div>
                    <div className="text-sm font-medium">11:40 - Stock bas</div>
                    <div className="text-sm text-gray-500">Zinc brut presque épuisé</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-3">Avancement journalier</h4>
                  <div className="h-40">
                    <Line data={progressData} options={chartOptions} />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-3">Quantité produite</h4>
                  <div className="h-40">
                    <Bar data={productionData} options={chartOptions} />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-3">Répartition des types</h4>
                  <div className="h-40">
                    <Doughnut data={productDistribution} options={chartOptions} />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-3">Historique des problèmes</h4>
                  <div className="h-40">
                    <Bar data={issuesData} options={chartOptions} />
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

export default Dashboard;