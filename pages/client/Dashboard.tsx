import React, { useState } from "react";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const kpiData = [
    { title: "🛒 Commandes totales", value: 8, color: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    { title: "⏳ En attente", value: 2, color: "border-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
    { title: "🚚 En livraison", value: 1, color: "border-green-500", bg: "bg-green-50", text: "text-green-700" },
    { title: "✅ Livrées", value: 5, color: "border-gray-500", bg: "bg-gray-50", text: "text-gray-700" }
  ];

  const orders = [
    { ref: "C001", date: "01/05/2025", products: "Fer plat x3", amount: "480 TND", status: "Livrée" },
    { ref: "C003", date: "03/05/2025", products: "Tôle laminée x2", amount: "400 TND", status: "En attente" }
  ];

  const chartData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Fév', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Avr', amount: 2780 },
    { name: 'Mai', amount: 1890 },
  ];

  const pieData = [
    { name: 'Tôle', value: 40 },
    { name: 'Fer', value: 30 },
    { name: 'Bobines', value: 30 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#6366F1'];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 h-screen bg-white border-r sticky top-0">
        <Sidebar isOpen={true} toggle={() => {}} />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <Header toggleSidebar={() => {}} />
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* Section KPI */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {kpiData.map((kpi, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 ${kpi.color} ${kpi.bg} shadow hover:shadow-md transition`}>
                <h3 className={`text-sm ${kpi.text}`}>{kpi.title}</h3>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </div>
            ))}
          </section>

          {/* Tableau des commandes */}
          <section className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">📦 Dernières commandes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-blue-50 text-blue-700">
                  <tr>
                    <th className="px-6 py-3">Réf</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Produits</th>
                    <th className="px-6 py-3">Montant</th>
                    <th className="px-6 py-3">État</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{order.ref}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">{order.products}</td>
                      <td className="px-6 py-4 font-semibold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                          order.status === 'En livraison' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Suivre</button>
                        <button className="text-red-600 hover:text-red-900">Annuler</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Graphiques */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">📈 Dépenses mensuelles</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">🥧 Répartition des produits</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
