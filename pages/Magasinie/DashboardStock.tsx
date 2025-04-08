import React from "react";
import Sidebar from "../../componentMagasinie/Sidebar";
import Header from "../../componentMagasinie/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, AlertCircle, ArrowDown, ArrowUp, List, Zap } from "lucide-react";

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
  // Données de démonstration
  const currentStock = 2458;
  const todayEntries = 78;
  const todayExits = 45;
  const pendingOrders = 12;
  const lowStockItems = 9;

  const alerts = [
    { type: 'stock', message: 'Produit A: Seulement 3 unités restantes', critical: true },
    { type: 'order', message: 'Nouvelle commande #4567 reçue', critical: false },
    { type: 'expiration', message: 'Lot B: Expiration dans 2 jours', critical: true },
  ];

  const orders = [
    { id: '#1234', customer: 'Client X', items: 15, status: 'En préparation' },
    { id: '#1235', customer: 'Client Y', items: 8, status: 'En attente' },
    { id: '#1236', customer: 'Client Z', items: 22, status: 'Expédié' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">📦 Tableau de bord du stock</h1>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Stock actuel</p>
                  <p className="text-2xl font-bold mt-1">{currentStock}</p>
                </div>
                <Package className="text-blue-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Entrées/Sorties journalières</p>
                  <div className="flex gap-4 mt-1">
                    <div className="text-green-500">
                      <ArrowUp size={20} className="inline" /> {todayEntries}
                    </div>
                    <div className="text-red-500">
                      <ArrowDown size={20} className="inline" /> {todayExits}
                    </div>
                  </div>
                </div>
                <Zap className="text-yellow-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Commandes en attente</p>
                  <p className="text-2xl font-bold mt-1">{pendingOrders}</p>
                </div>
                <List className="text-purple-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Produits en faible stock</p>
                  <p className="text-2xl font-bold mt-1 text-red-500">{lowStockItems}</p>
                </div>
                <AlertCircle className="text-red-500" size={32} />
              </div>
            </div>
          </div>

          {/* Graphique et alertes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Activité des stocks</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="entrées" 
                    stroke="#4CAF50" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sorties" 
                    stroke="#F44336" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Section Alertes */}
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Alertes en temps réel</h2>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg flex items-start ${
                      alert.critical ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50 border-l-4 border-blue-500'
                    }`}
                  >
                    <AlertCircle 
                      className={`mr-3 ${alert.critical ? 'text-red-500' : 'text-blue-500'}`} 
                      size={20} 
                    />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commandes en cours */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Commandes en traitement</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Commande</th>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Articles</th>
                    <th className="pb-3">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.items}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'Expédié' 
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'En préparation'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStock;