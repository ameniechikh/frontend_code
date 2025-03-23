import React, { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { FileText, Download, QrCode } from "lucide-react";
import Button from "../../componentFournisseur/Button";

const BonDeSortie = () => {
  const [selectedBon, setSelectedBon] = useState(null);

  const bonsDeSortie = [
    { id: "BS-2024-001", date: "10/03/2024", poidsTheorique: "1200 kg", poidsReel: "1185 kg", qrCode: "qr_001.png", pdf: "bon_sortie_001.pdf" },
    { id: "BS-2024-002", date: "12/03/2024", poidsTheorique: "800 kg", poidsReel: "805 kg", qrCode: "qr_002.png", pdf: "bon_sortie_002.pdf" },
  ];

  const handleDownload = (pdfFile) => {
    const link = document.createElement("a");
    link.href = `/bons_de_sortie/${pdfFile}`;
    link.download = pdfFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">📦 Bon de Sortie</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">N° Bon</th>
                <th className="border border-gray-300 p-2">Poids Théorique</th>
                <th className="border border-gray-300 p-2">Poids Réel</th>
                <th className="border border-gray-300 p-2">Écart</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bonsDeSortie.map((bon) => (
                <tr key={bon.id} className="text-center">
                  <td className="border border-gray-300 p-2">{bon.date}</td>
                  <td className="border border-gray-300 p-2">{bon.id}</td>
                  <td className="border border-gray-300 p-2">{bon.poidsTheorique}</td>
                  <td className="border border-gray-300 p-2">{bon.poidsReel}</td>
                  <td className={`border border-gray-300 p-2 ${Math.abs(bon.poidsTheorique - bon.poidsReel) > 10 ? "text-red-500" : "text-green-500"}`}>
                    {Math.abs(bon.poidsTheorique - bon.poidsReel)} kg
                  </td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    <Button variant="ghost" onClick={() => setSelectedBon(bon)}>
                      <QrCode size={18} /> Scanner
                    </Button>
                    <Button variant="ghost" onClick={() => handleDownload(bon.pdf)}>
                      <Download size={18} /> Exporter
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Affichage du bon sélectionné */}
          {selectedBon && (
            <div className="mt-6 p-4 border rounded-lg bg-white shadow">
              <h2 className="text-xl font-semibold">🔍 Visualisation de {selectedBon.id}</h2>
              <p><strong>Date :</strong> {selectedBon.date}</p>
              <p><strong>Poids Théorique :</strong> {selectedBon.poidsTheorique}</p>
              <p><strong>Poids Réel :</strong> {selectedBon.poidsReel}</p>
              <img src={`/qr_codes/${selectedBon.qrCode}`} alt="QR Code" className="w-32 h-32 mt-4" />
              <iframe src={`/bons_de_sortie/${selectedBon.pdf}`} className="w-full h-96 border rounded-lg mt-4"></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonDeSortie;
