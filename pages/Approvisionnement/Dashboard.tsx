"use client";

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { 
  Package, ClipboardList, Truck, FileText, AlertCircle, 
  PlusCircle, Zap, Box, TrendingUp, Database
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
  Legend
} from "chart.js";
import Sidebar from "../../componentApprovisionnement/Sidebar";
import Header from "../../componentApprovisionnement/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Données du graphique de stock
  const stockData = {
    labels: ["Acier", "Aluminium", "Cuivre", "Plastique", "Coke"],
    datasets: [
      {
        label: "Stock Actuel (Tonnes)",
        data: [1500, 800, 450, 2000, 1200],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 8,
      }
    ]
  };

  // Nouveau graphique de tendances
  const trendData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Demande Mensuelle (Tonnes)",
        data: [650, 590, 800, 810, 560, 550],
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false }
    },
    scales: {
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        beginAtZero: true
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <main className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 mt-16">
          {/* Section Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Package className="text-indigo-600 h-6 w-6"/>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Stock Total</p>
                  <p className="text-2xl font-bold text-gray-800">4,250T</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ClipboardList className="text-green-600 h-6 w-6"/>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Commandes en cours</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FileText className="text-purple-600 h-6 w-6"/>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Factures impayées</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertCircle className="text-red-600 h-6 w-6"/>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Alertes stock</p>
                  <p className="text-2xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graphique de stock */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Database className="text-indigo-600 h-6 w-6"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Niveaux de Stock</h2>
              </div>
              <div className="h-80">
                <Bar data={stockData} options={chartOptions} />
              </div>
            </div>

            {/* Graphique de tendances */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="text-green-600 h-6 w-6"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Tendance des Demandes</h2>
              </div>
              <div className="h-80">
                <Line data={trendData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Section Analyse Rapide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-8 w-8"/>
                <h3 className="text-lg font-semibold">Livraisons en Transit</h3>
              </div>
              <div className="text-3xl font-bold mb-2">5</div>
              <p className="text-indigo-100 text-sm">Dernière mise à jour: 2h</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Box className="text-green-600 h-8 w-8"/>
                <h3 className="text-lg font-semibold text-gray-800">Stock Optimal</h3>
              </div>
              <div className="text-3xl font-bold mb-2 text-gray-800">78%</div>
              <p className="text-gray-500 text-sm">Moyenne sectorielle: 65%</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-600 h-8 w-8"/>
                <h3 className="text-lg font-semibold text-gray-800">Activité Récente</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nouvelles commandes</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Réceptions stock</span>
                  <span className="font-semibold">2</span>
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