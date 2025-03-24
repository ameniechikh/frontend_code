import { useState } from "react";
import { Barcode, FileCheck, PackageCheck, Truck } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

const ReceptionMatieres = () => {
  const [codeLivraison, setCodeLivraison] = useState("");
  const [factureVerifiee, setFactureVerifiee] = useState(false);
  const [stockEntrant, setStockEntrant] = useState(0);
  const [stockTotal, setStockTotal] = useState(1000);

  const handleScan = () => {
    if (codeLivraison) {
      alert(`Livraison ${codeLivraison} scannée avec succès !`);
    }
  };

  const verifierFacture = () => {
    setFactureVerifiee(true);
  };

  const ajusterStock = () => {
    setStockTotal(stockTotal + stockEntrant);
    setStockEntrant(0);
    alert("Stock mis à jour !");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <SidebarApprovisionnement />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <HeaderApprovisionnement />
        </div>

        {/* Contenu Principal */}
        <div className="flex justify-center p-6 flex-1">
          <div className="w-full max-w-7xl space-y-6">
            
            {/* Scan Livraison */}
            <Card>
              <CardHeader>
                <CardTitle>📦 Scan Livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Barcode className="w-6 h-6 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Scanner le code de livraison..."
                    value={codeLivraison}
                    onChange={(e) => setCodeLivraison(e.target.value)}
                    className="p-2 border rounded-lg"
                  />
                  <Button variant="primary" onClick={handleScan}>Scanner</Button>
                </div>
              </CardContent>
            </Card>

            {/* Vérification Factures */}
            <Card>
              <CardHeader>
                <CardTitle>📑 Vérification Factures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <FileCheck className="w-6 h-6 text-green-500" />
                  <p>{factureVerifiee ? "Facture Vérifiée ✅" : "Facture en attente de vérification"}</p>
                </div>
                {!factureVerifiee && (
                  <Button variant="primary" className="mt-4" onClick={verifierFacture}>Vérifier</Button>
                )}
              </CardContent>
            </Card>

            {/* Ajustement Stock Entrant */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Ajustement Stock Entrant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="text-lg">
                    <strong>Stock Actuel :</strong> {stockTotal} T
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Stock entrant"
                      value={stockEntrant}
                      onChange={(e) => setStockEntrant(Number(e.target.value))}
                      className="p-2 border rounded-lg"
                    />
                    <Button variant="primary" onClick={ajusterStock}>Ajuster</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connexions Fournisseurs & Magasinier */}
            <Card>
              <CardHeader>
                <CardTitle>🔗 Connexions Fournisseurs & Magasinier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-yellow-500" />
                  <p>Suivi des livraisons et mise à jour avec le magasinier.</p>
                </div>
                <Button variant="primary" className="mt-4">Consulter les livraisons</Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionMatieres;
