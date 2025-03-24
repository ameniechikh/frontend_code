"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import Sidebar from "../../componentApprovisionnement/Sidebar";
import Header from "../../componentApprovisionnement/Header";

// ✅ Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Planification = () => {
  // Données pour le graphique
  const data = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Prévisions de consommation (Tonnes)",
        data: [120, 150, 180, 200, 220, 250],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      }
    ]
  };

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Prévisions de Consommation MP" }
    }
  };

  return (
    <div className="flex">
      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header en haut */}
        <Header />

        {/* Contenu centré sous le header */}
        <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100 mt-16">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[80%]">
            <h2 className="text-2xl font-semibold mb-4">📊 Planification des Matières Premières</h2>
            <p className="text-gray-600 mb-6">
              Analyse des prévisions de consommation et calculs de stock de sécurité.
            </p>

            {/* Graphique */}
            <div className="w-full h-96">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planification;
