import React from "react";
import Sidebar from "../../componentMagasinie/Sidebar";
import Header from "../../componentMagasinie/Header"; // Vérifie ce chemin !
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', entrées: 30, sorties: 20 },
  { name: 'Mar', entrées: 40, sorties: 25 },
  { name: 'Mer', entrées: 35, sorties: 30 },
  { name: 'Jeu', entrées: 50, sorties: 45 },
  { name: 'Ven', entrées: 55, sorties: 40 },
  { name: 'Sam', entrées: 70, sorties: 60 },
  { name: 'Dim', entrées: 65, sorties: 50 },
];

const DashboardStock = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Contenu du Dashboard */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">📦 Dashboard Stock</h1>
          
          {/* Carte thermique des zones de stockage */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold">Carte thermique des zones de stockage</h2>
            <div className="w-full h-64 bg-gradient-to-r from-red-500 to-green-500 rounded-md mt-3 flex items-center justify-center">
              <span className="text-white font-bold">Simulation de la carte thermique 🔥</span>
            </div>
          </div>

          {/* Graphique des entrées/sorties */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold">Graphique des entrées/sorties</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entrées" stroke="#4CAF50" />
                <Line type="monotone" dataKey="sorties" stroke="#F44336" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alertes RFID */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">🚨 Alertes RFID</h2>
            <ul className="list-disc pl-5 mt-2">
              <li className="text-red-500">Produit X en péremption dans 2 jours</li>
              <li className="text-orange-500">Défaut détecté sur le lot Y</li>
              <li className="text-green-500">Stock à jour pour l’article Z</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStock;
