import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { Package, Clock, AlertCircle, ShoppingCart, Truck, MessageSquare, Bell, Box, Users, Activity, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(...registerables);

const Dashboard = () => {
  // Données de démonstration
  const stats = {
    totalOrders: 245,
    totalSuppliers: 15,
    dailySales: "15,400 €",
    monthlySales: "324,500 €",
    pendingOrders: 32,
    deliveredOrders: 198,
    topProduct: "Acier Inox 304"
  };

  const notifications = [
    { id: 1, type: "stock", message: "Stock critique - Acier Galvanisé (reste 50T)", urgent: true, date: "10:30" },
    { id: 2, type: "supplier", message: "Retard livraison Fournisseur MétalNord", urgent: true, date: "09:50" },
    { id: 3, type: "order", message: "Commande #CMD-2456 prête pour expédition", urgent: false, date: "09:45" }
  ];

  const orderData = {
    labels: ['En préparation', 'En transit', 'Livrées', 'Annulées'],
    datasets: [
      {
        label: 'Commandes',
        data: [32, 45, 198, 12],
        backgroundColor: ['#F59E0B', '#3B82F6', '#10B981', '#EF4444']
      }
    ]
  };

  const salesData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes mensuelles (k€)',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#3B82F6'
      }
    ]
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <HeaderAgentCommercial />

        <div className="p-6 space-y-6">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Commandes totales</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Commandes livrées</p>
                    <p className="text-2xl font-bold">{stats.deliveredOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fournisseurs actifs</p>
                    <p className="text-2xl font-bold">{stats.totalSuppliers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">En attente</p>
                    <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques et données */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    Performances des ventes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Bar 
                    data={salesData} 
                    options={{ 
                      responsive: true,
                      plugins: { legend: { position: 'top' } }
                    }}
                    height={300}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-6 w-6" />
                    Répartition des commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Pie 
                      data={orderData} 
                      options={{ 
                        responsive: true,
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Alertes en temps réel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg flex items-start gap-3 ${notification.urgent ? 'bg-red-50' : 'bg-gray-50'}`}
                      >
                        <AlertCircle className={`h-5 w-5 ${notification.urgent ? 'text-red-500' : 'text-gray-500'}`} />
                        <div>
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;