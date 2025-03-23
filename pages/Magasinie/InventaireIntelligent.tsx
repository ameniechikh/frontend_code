import { useState, useEffect } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import Button from "../../componentFournisseur/Button";

const InventaireIntelligent = () => {
  const [stocks, setStocks] = useState([]);
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    // Simuler l'importation des stocks depuis l'ERP
    const fetchedStocks = [
      { id: 1, produit: "Bobine Acier X1", quantitePhysique: 50, quantiteLogique: 48 },
      { id: 2, produit: "Tube Acier Y2", quantitePhysique: 30, quantiteLogique: 30 },
      { id: 3, produit: "Plaque Acier Z3", quantitePhysique: 20, quantiteLogique: 25 },
    ];
    setStocks(fetchedStocks);

    // Détecter les divergences
    const foundAlertes = fetchedStocks.filter(stock => stock.quantitePhysique !== stock.quantiteLogique);
    setAlertes(foundAlertes);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">📦 Inventaire Intelligent</h1>
          
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">🔍 Scan RFID en temps réel</h2>
            <Button variant="outline" className="mt-2 flex items-center">
              <RefreshCw size={18} className="mr-2" /> Scanner le stock
            </Button>
          </div>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">⚠️ Alertes de divergence</h2>
            {alertes.length > 0 ? (
              <ul className="mt-2">
                {alertes.map((alerte) => (
                  <li key={alerte.id} className="text-red-500 flex items-center">
                    <AlertCircle size={18} className="mr-2" /> {alerte.produit} - {alerte.quantitePhysique} vs {alerte.quantiteLogique}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600 flex items-center">
                <CheckCircle size={18} className="mr-2" /> Aucun problème détecté
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">📊 Optimisation des emplacements</h2>
            <p className="mt-2 text-sm text-gray-600">Synchronisation automatique avec l'ERP et le module d'approvisionnement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventaireIntelligent;
