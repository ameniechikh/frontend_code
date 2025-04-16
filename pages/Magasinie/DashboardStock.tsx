import React from "react";
import Sidebar from "../../componentMagasinie/Sidebar";
import Header from "../../componentMagasinie/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Package, AlertCircle, ArrowDown, ArrowUp, List, Zap, Clock, Box, Warehouse } from "lucide-react";

const data = [
  { name: 'Lun', entrées: 30, sorties: 20 },
  { name: 'Mar', entrées: 40, sorties: 25 },
  { name: 'Mer', entrées: 35, sorties: 30 },
  { name: 'Jeu', entrées: 50, sorties: 45 },
  { name: 'Ven', entrées: 55, sorties: 40 },
  { name: 'Sam', entrées: 70, sorties: 60 },
  { name: 'Dim', entrées: 65, sorties: 50 },
];

const recentMovements = [
  { date: '2023-10-05 08:30', type: 'Entrée', product: 'Produit A', quantity: 50 },
  { date: '2023-10-05 10:15', type: 'Sortie', product: 'Produit B', quantity: 30 },
  { date: '2023-10-04 14:00', type: 'Entrée', product: 'Produit C', quantity: 75 },
  { date: '2023-10-04 16:45', type: 'Sortie', product: 'Produit D', quantity: 20 },
];

const DashboardStock = () => {
  const currentStock = 2458;
  const todayEntries = 78;
  const todayExits = 45;
  const pendingOrders = 12;
  const lowStockItems = 9;

  const alerts = [
    { message: 'Produit A: Seulement 3 unités restantes', critical: true },
    { message: 'Produit C: Seulement 5 unités restantes', critical: true },
    { message: 'Produit E: Seulement 2 unités restantes', critical: true },
  ];

  const orders = [
    { id: '#1234', customer: 'Client X', items: 15, status: 'En préparation' },
    { id: '#1235', customer: 'Client Y', items: 8, status: 'En attente' },
    { id: '#1236', customer: 'Client Z', items: 22, status: 'Expédié' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Warehouse className="text-blue-600" size={28} />
            Tableau de bord du stock
          </h1>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Stock actuel</p>
                  <p className="text-3xl font-bold mt-1">{currentStock}</p>
                </div>
                <Package className="text-blue-200" size={36} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Entrées 24h</p>
                  <p className="text-3xl font-bold mt-1 flex items-center gap-2">
                    <ArrowUp size={24} /> {todayEntries}
                  </p>
                </div>
                <Box className="text-green-200" size={36} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Commandes en attente</p>
                  <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
                </div>
                <List className="text-purple-200" size={36} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Faibles stocks</p>
                  <p className="text-3xl font-bold mt-1">{lowStockItems}</p>
                </div>
                <AlertCircle className="text-red-200" size={36} />
              </div>
            </div>
          </div>

          {/* Section principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Graphiques */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                  <Zap className="text-yellow-500" size={24} />
                  Activité des stocks (7 jours)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="entréesColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="sortiesColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F44336" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#F44336" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="entrées" 
                      stroke="#4CAF50"
                      fill="url(#entréesColor)"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sorties" 
                      stroke="#F44336"
                      fill="url(#sortiesColor)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Commandes en cours */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                  <Clock className="text-purple-500" size={24} />
                  Commandes en traitement
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-sm text-gray-500">
                        <th className="px-4 py-3 font-medium">Commande</th>
                        <th className="px-4 py-3 font-medium">Client</th>
                        <th className="px-4 py-3 font-medium">Articles</th>
                        <th className="px-4 py-3 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-700">{order.id}</td>
                          <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                          <td className="px-4 py-3 text-gray-600">{order.items}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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

            {/* Colonne de droite */}
            <div className="space-y-6">
              {/* Alertes */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                  <AlertCircle className="text-red-500" size={24} />
                  Alertes de stock
                </h2>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg flex items-start bg-red-50 border border-red-100 transition-transform hover:scale-[1.01]"
                    >
                      <AlertCircle className="mr-3 text-red-500 shrink-0" size={20} />
                      <span className="text-sm text-red-700 leading-snug">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mouvements récents */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                  <Clock className="text-blue-500" size={24} />
                  Mouvements récents
                </h2>
                <div className="space-y-3">
                  {recentMovements.map((movement, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${movement.type === 'Entrée' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {movement.type === 'Entrée' ? (
                            <ArrowUp size={16} />
                          ) : (
                            <ArrowDown size={16} />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">{movement.product}</div>
                          <div className="text-xs text-gray-500">{movement.date}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${movement.type === 'Entrée' ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardStock;