import { useState } from "react";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const orders = [
  {
    id: "#12345",
    date: "12 Mars 2025",
    status: "Livré",
    total: "198€",
    items: [
      { name: "Fer plat 20x5mm", quantity: 2, price: "99€" },
      { name: "Bobine d'acier galvanisé", quantity: 1, price: "99€" },
    ],
  },
  {
    id: "#12346",
    date: "5 Mars 2025",
    status: "En cours",
    total: "99€",
    items: [{ name: "Tôle en acier inoxydable", quantity: 1, price: "99€" }],
  },
  {
    id: "#12347",
    date: "28 Février 2025",
    status: "Annulé",
    total: "150€",
    items: [{ name: "Tube acier carré 50x50mm", quantity: 1, price: "150€" }],
  },
];

const History = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filter, setFilter] = useState("Tous");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Contenu principal */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Contenu principal avec scroll */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Historique des Achats</h1>

          {/* Filtres */}
          <div className="flex space-x-4 mb-4">
            {["Tous", "Livré", "En cours", "Annulé"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded text-white ${
                  filter === status ? "bg-blue-600" : "bg-gray-400 hover:bg-gray-500"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Liste des commandes */}
          <div className="space-y-4">
            {orders
              .filter((order) => filter === "Tous" || order.status === filter)
              .map((order) => (
                <div key={order.id} className="bg-white p-4 shadow-md rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">Commande {order.id}</p>
                      <p className="text-gray-500 text-sm">{order.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.status === "Livré"
                          ? "bg-green-500"
                          : order.status === "En cours"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="font-semibold">Total: {order.total}</p>

                  {/* Détails des produits */}
                  <div className="mt-3 space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>{item.name}</span>
                        <span>
                          {item.quantity} x {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </main>

        {/* Footer */}
      
      </div>
    </div>
  );
};

export default History;
