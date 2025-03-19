import React, { useState, useEffect } from "react";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const Account = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {/* Overlay Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} isMobile={isMobile} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Mon Compte</h1>
          <p>Gérez vos informations personnelles et votre historique d'achats.</p>
          
          {/* Informations personnelles */}
          <div className="bg-white p-4 shadow rounded mb-4 mt-4">
            <h2 className="text-xl font-semibold mb-3">Informations personnelles</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  defaultValue="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  defaultValue="jean.dupont@example.com"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Mettre à jour
              </button>
            </div>
          </div>
          
          {/* Historique des achats */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-3">Historique des achats</h2>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Commande #12345</span>
                  <span className="text-sm text-gray-500">15 Mars 2024</span>
                </div>
                <p className="text-gray-600">2 articles - Total: 198€</p>
              </div>
              <div className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Commande #12346</span>
                  <span className="text-sm text-gray-500">10 Février 2024</span>
                </div>
                <p className="text-gray-600">1 article - Total: 99€</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Account;