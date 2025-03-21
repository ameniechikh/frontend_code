import { useState } from "react";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import { FileText, Download, AlertCircle } from "lucide-react";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const factures = [
  { id: "F-2024-001", date: "01/03/2024", montant: "12 500€", statut: "🟡 En attente", pdf: "facture_001.pdf" },
  { id: "F-2024-002", date: "15/02/2024", montant: "8 200€", statut: "🟢 Payée", pdf: "facture_002.pdf" },
  { id: "F-2024-003", date: "28/01/2024", montant: "14 000€", statut: "🔴 En retard", pdf: "facture_003.pdf" },
];

const ComptesFactures = () => {
  const [selectedFacturePDF, setSelectedFacturePDF] = useState<string | null>(null);

  // Fonction pour télécharger la facture
  const handleDownload = (pdfFile: string) => {
    const link = document.createElement("a");
    link.href = `/factures/${pdfFile}`;
    link.download = pdfFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarFournisseur />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderFournisseur />

        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>📜 Historique des Factures</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">N° Facture</th>
                    <th className="border border-gray-300 p-2">Montant</th>
                    <th className="border border-gray-300 p-2">Statut</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {factures.map((facture) => (
                    <tr key={facture.id} className="text-center">
                      <td className="border border-gray-300 p-2">{facture.date}</td>
                      <td className="border border-gray-300 p-2">{facture.id}</td>
                      <td className="border border-gray-300 p-2">{facture.montant}</td>
                      <td className="border border-gray-300 p-2">{facture.statut}</td>
                      <td className="border border-gray-300 p-2 space-x-2">
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedFacturePDF(facture.pdf)}
                        >
                          <FileText size={18} /> Voir
                        </Button>
                        <Button variant="ghost" onClick={() => handleDownload(facture.pdf)}>
                          <Download size={18} /> Exporter
                        </Button>
                        {facture.statut.includes("🔴") && (
                          <Button variant="destructive">
                            <AlertCircle size={18} /> Contester
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Affichage de la facture PDF uniquement */}
          {selectedFacturePDF && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>🔍 Facture</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src="/facture_001.pdf"
                  className="w-full h-96 border rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                    alert("Erreur : Le fichier PDF est introuvable !");
                  }}
                />
                <div className="mt-4">
                  <Button variant="ghost" onClick={() => setSelectedFacturePDF(null)}>
                    Fermer
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">💡 Cette facture est protégée par un filigrane "Confidentiel".</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComptesFactures;
