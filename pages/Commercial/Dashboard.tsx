import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { Package, Clock, AlertCircle, ShoppingCart, Truck, MessageSquare, Bell, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";

const Dashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Données de démonstration
  const stats = {
    totalOrders: 245,
    dailySales: "15,400 €",
    pendingOrders: 32,
    topProduct: "Acier Inox 304"
  };

  const notifications = [
    { id: 1, type: "stock", message: "Stock critique - Acier Galvanisé (reste 50T)", urgent: true, date: "10:30" },
    { id: 2, type: "order", message: "Commande #CMD-2456 prête pour expédition", urgent: false, date: "09:45" },
    { id: 3, type: "update", message: "Livraison #LIV-032 retardée", urgent: true, date: "Hier" }
  ];

  const recentOrders = [
    { id: "CMD-2456", client: "Client A", status: "En préparation", amount: "12,400 €" },
    { id: "CMD-2455", client: "Client B", status: "En attente", amount: "8,200 €" },
    { id: "CMD-2454", client: "Client C", status: "Expédié", amount: "15,000 €" }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      {/* Contenu principal centré */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header en haut */}
        <HeaderAgentCommercial />

        <div className="p-6 space-y-6">
          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Commandes traitées</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Produit phare</p>
                    <p className="text-xl font-bold">{stats.topProduct}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ventes quotidiennes</p>
                    <p className="text-2xl font-bold">{stats.dailySales}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Commandes en attente</p>
                    <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne de gauche */}
            <div className="lg:col-span-2 space-y-6">
              {/* Liste des commandes récentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-6 w-6" />
                    Commandes récentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.client}</p>
                        </div>
                        <div className="text-right">
                          <p className={order.status === "En attente" ? "text-red-600" : "text-green-600"}>
                            {order.status}
                          </p>
                          <p className="text-sm text-gray-600">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Voir toutes les commandes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Alertes et notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg flex items-start gap-3 ${notification.urgent ? "bg-red-50" : "bg-gray-50"}`}
                      >
                        <AlertCircle className={`h-5 w-5 ${notification.urgent ? "text-red-500" : "text-gray-500"}`} />
                        <div>
                          <p className="font-medium">{notification.message}</p>
                          <p className="text-sm text-gray-500">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accès rapide */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="h-6 w-6" />
                    Accès rapide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-24 flex flex-col items-center justify-center gap-2">
                      <Package className="h-6 w-6" />
                      Produits disponibles
                    </Button>
                    
                    <Button className="h-24 flex flex-col items-center justify-center gap-2">
                      <ShoppingCart className="h-6 w-6" />
                      Gérer commandes
                    </Button>
                    
                    <Button className="h-24 flex flex-col items-center justify-center gap-2">
                      <MessageSquare className="h-6 w-6" />
                      Contacter magasinier
                    </Button>
                    
                    <Button className="h-24 flex flex-col items-center justify-center gap-2">
                      <Truck className="h-6 w-6" />
                      Suivi livraisons
                    </Button>
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