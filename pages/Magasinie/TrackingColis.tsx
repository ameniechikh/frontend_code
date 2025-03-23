import { useState, useEffect } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import dynamic from "next/dynamic";
import { AlertCircle } from "lucide-react";

const Map = dynamic(() => import("../../componentFournisseur/Map"), { ssr: false });

const TrackingColis = () => {
  const [colis, setColis] = useState([]);
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    // Simulation d'une API temps réel
    fetch("/api/tracking")
      .then((res) => res.json())
      .then((data) => setColis(data));
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">📍 Tracking des Colis</h1>
          
          {/* Carte GPS */}
          <div className="w-full h-96 mb-6">
            <Map colis={colis} />
          </div>

          {/* Alertes de retard ou anomalies */}
          {alertes.length > 0 && (
            <div className="bg-red-100 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold">🚨 Alertes</h2>
              <ul>
                {alertes.map((alerte, index) => (
                  <li key={index} className="flex items-center text-red-600">
                    <AlertCircle className="mr-2" /> {alerte.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingColis;
