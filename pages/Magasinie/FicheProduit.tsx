import React from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";

const FicheProduit = () => {
  const produit = {
    id: "P-2024-001",
    nom: "Acier Haute Résistance",
    grade: "S355",
    dimensions: "2000x1000x10 mm",
    origine: "Fournisseur X",
    photos: ["/images/produit1.jpg", "/images/produit2.jpg"],
    historique: [
      { date: "10/03/2024", controle: "Résistance testée - Conforme" },
      { date: "15/02/2024", controle: "Test de composition chimique - OK" },
    ],
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold">📄 Fiche Produit : {produit.nom}</h2>
            <p><strong>Grade :</strong> {produit.grade}</p>
            <p><strong>Dimensions :</strong> {produit.dimensions}</p>
            <p><strong>Origine :</strong> {produit.origine}</p>
            <h3 className="mt-4 font-semibold">📷 Scan 3D et Photos</h3>
            <div className="flex space-x-4 mt-2">
              {produit.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Produit ${index + 1}`} className="w-32 h-32 rounded-lg border" />
              ))}
            </div>
            <h3 className="mt-4 font-semibold">📜 Historique des Contrôles Qualité</h3>
            <ul className="list-disc list-inside mt-2">
              {produit.historique.map((controle, index) => (
                <li key={index} className="text-gray-700">{controle.date} - {controle.controle}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit;
