import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductionChart from "../components/ProductionChart";

const Production = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold mb-4">🏭 Dashboard de Production</h1>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Ligne 1 - Assemblage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Objectif et Réalisé */}
              <div className="flex flex-col justify-between p-6 border rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Objectif Quotidien</h3>
                <p className="text-2xl font-bold text-gray-800">500 pièces/jour</p>
                <h3 className="text-lg font-semibold mt-4">Réalisé</h3>
                <p className="text-2xl font-bold text-gray-800">420/500 (84%)</p>
              </div>

              {/* Temps d'Arrêt et Efficacité */}
              <div className="flex flex-col justify-between p-6 border rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Temps d'Arrêt</h3>
                <p className="text-2xl font-bold text-red-600">1h30 (Panne électrique)</p>
                <h3 className="text-lg font-semibold mt-4">Efficacité</h3>
                <p className="text-2xl font-bold text-green-600">88% 🟢</p>
              </div>
            </div>

            {/* Graphique de Production */}
            <div className="bg-white p-6 rounded-lg shadow mt-6">
              <h3 className="text-xl font-semibold mb-4">Graphique de Production</h3>
              <ProductionChart />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Production;
