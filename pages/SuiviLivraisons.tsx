"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

const livraisonsData = [
  {
    id: "LIV-001",
    client: "Entreprise A",
    destination: "Tunis, Tunisie",
    statut: "En cours",
    localisation: [36.8065, 10.1815],
    dateExpedition: "2025-03-25",
    dateLivraison: "2025-03-30",
  },
  {
    id: "LIV-002",
    client: "Entreprise B",
    destination: "Sfax, Tunisie",
    statut: "Livrée",
    localisation: [34.7333, 10.7667],
    dateExpedition: "2025-03-22",
    dateLivraison: "2025-03-27",
  },
  {
    id: "LIV-003",
    client: "Entreprise C",
    destination: "Sousse, Tunisie",
    statut: "Retardée",
    localisation: [35.8254, 10.6361],
    dateExpedition: "2025-03-24",
    dateLivraison: "2025-03-31",
  },
];

const SuiviLivraisons = () => {
  const [livraisons, setLivraisons] = useState(livraisonsData);

  useEffect(() => {
    livraisons.forEach((livraison) => {
      if (livraison.statut === "Retardée") {
        alert(`⚠️ Problème de livraison : ${livraison.client}`);
      }
    });
  }, [livraisons]);

  return (
    <div className="flex h-screen">
      {/* Sidebar qui descend avec le scroll */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
        {/* Header fixé en haut */}
        <Header />

        {/* Contenu défilable */}
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">📦 Suivi des Livraisons</h2>

          {/* Tableau des livraisons */}
          <div className="bg-white p-4 rounded shadow mb-6 overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Client</th>
                  <th className="border p-2">Destination</th>
                  <th className="border p-2">Statut</th>
                  <th className="border p-2">Date Expédition</th>
                  <th className="border p-2">Date Livraison</th>
                </tr>
              </thead>
              <tbody>
                {livraisons.map((livraison) => (
                  <tr key={livraison.id} className="border text-center">
                    <td className="p-2">{livraison.id}</td>
                    <td className="p-2">{livraison.client}</td>
                    <td className="p-2">{livraison.destination}</td>
                    <td
                      className={`p-2 font-bold ${
                        livraison.statut === "Livrée"
                          ? "text-green-600"
                          : livraison.statut === "En cours"
                          ? "text-blue-500"
                          : "text-red-600"
                      }`}
                    >
                      {livraison.statut}
                    </td>
                    <td className="p-2">{livraison.dateExpedition}</td>
                    <td className="p-2">{livraison.dateLivraison}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Carte de suivi des livraisons */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <MapPin className="mr-2" /> Carte des Livraisons
            </h3>
            <MapContainer center={[36.8065, 10.1815]} zoom={6} className="h-96 w-full rounded">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {livraisons.map((livraison) => (
                <Marker key={livraison.id} position={livraison.localisation}>
                  <Popup>
                    <div>
                      <p><strong>{livraison.client}</strong></p>
                      <p>Destination: {livraison.destination}</p>
                      <p>Statut: {livraison.statut}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SuiviLivraisons;
