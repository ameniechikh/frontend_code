import React from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Line, Bar, Radar, Pie } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  RadialLinearScale,
  ArcElement
} from "chart.js";

// Enregistrement des composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

const Dashboard = () => {
  const stats = [
    { label: "Stocks", value: "1.2M", color: "bg-blue-500" },
    { label: "Commandes", value: "7.2K", color: "bg-orange-500" },
    { label: "Employés", value: "320", color: "bg-green-500" },
    { label: "Production", value: "8.3M", color: "bg-red-500" },
  ];

  const productionData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Production (pièces)",
        data: [80, 150, 120, 180, 220, 160, 200],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const stockData = {
    labels: ["Acier", "Aluminium", "Cuivre", "Plastique", "Verre"],
    datasets: [
      {
        label: "Stocks Disponibles",
        data: [400, 300, 200, 150, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Stocks Utilisés",
        data: [200, 150, 120, 80, 60],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const radarData = {
    labels: ["Qualité", "Efficacité", "Délais", "Sécurité", "Coût"],
    datasets: [
      {
        label: "Performance des employés",
        data: [90, 80, 85, 75, 95],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Projet A", "Projet B", "Projet C", "Projet D", "Projet E"],
    datasets: [
      {
        label: "Commandes par projet",
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)"
        ],
      },
    ],
  };

  return (
    <div className="flex">
      {/* Sidebar non fixe */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        
        <main className="p-6 bg-gray-100 flex-grow">
          <h1 className="text-2xl font-bold mb-4">📊 Dashboard SmartSteel</h1>

          {/* Indicateurs Clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className={`p-4 ${stat.color} text-white rounded-lg shadow-lg text-center`}>
                <h3 className="text-lg font-semibold">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">📈 Production Hebdomadaire</h3>
              <Line data={productionData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">📦 Stocks disponibles vs. utilisés</h3>
              <Bar data={stockData} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">🕷️ Performance des employés</h3>
              <Radar data={radarData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">📊 Commandes par projet</h3>
              <Pie data={pieData} />
            </div>
          </div>
        </main>

        {/* Footer reste en bas */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
