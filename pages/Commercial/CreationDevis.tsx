import { useState } from "react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const gradesAcier = ["A36", "S235", "S355", "304L", "316L"];
const traitements = ["Galvanisation", "Peinture", "Aucun"];

const CreationDevis = () => {
  const [gradeAcier, setGradeAcier] = useState(gradesAcier[0]);
  const [dimensio, setDimensions] = useState({ largeur: "", longueur: "", epaisseur: "" });
  const [traitement, setTraitement] = useState(traitements[0]);
  const [quantite, setQuantite] = useState(1);
  const [prixTotal, setPrixTotal] = useState(0);
  const [delaiLivraison, setDelaiLivraison] = useState("Standard");

  const calculerPrix = () => {
    // Logique pour calculer le prix basé sur grade, quantité et traitement
    const basePrice = 100; // Exemple, à remplacer par une logique réelle
    const treatmentPrice = traitement === "Galvanisation" ? 20 : traitement === "Peinture" ? 15 : 0;
    const volumeDiscount = quantite > 10 ? 0.9 : 1; // Exemple de réduction volume
    const logistique = 10; // Frais logistique

    setPrixTotal(basePrice * quantite * volumeDiscount + treatmentPrice + logistique);
  };

  const calculerDelai = () => {
    // Simulation du délai basé sur la disponibilité en stock et la charge de production
    setDelaiLivraison("4-5 jours ouvrés"); // À remplacer par une logique réelle
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Fixée à gauche */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      {/* Contenu principal centré */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header en haut */}
        <HeaderAgentCommercial />

        <div className="flex justify-center items-center p-6">
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>💼 Création Devis</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Formulaire de création de devis */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Sélection Grade Acier</h3>
                  <select
                    value={gradeAcier}
                    onChange={(e) => setGradeAcier(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {gradesAcier.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Dimensions Personnalisées</h3>
                  <div className="flex space-x-3">
                    <input
                      type="number"
                      value={dimensio.largeur}
                      onChange={(e) => setDimensions({ ...dimensio, largeur: e.target.value })}
                      placeholder="Largeur (mm)"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={dimensio.longueur}
                      onChange={(e) => setDimensions({ ...dimensio, longueur: e.target.value })}
                      placeholder="Longueur (mm)"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={dimensio.epaisseur}
                      onChange={(e) => setDimensions({ ...dimensio, epaisseur: e.target.value })}
                      placeholder="Epaisseur (mm)"
                      className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Options de Traitement</h3>
                  <select
                    value={traitement}
                    onChange={(e) => setTraitement(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {traitements.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Quantité</h3>
                  <input
                    type="number"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Simulation Prix et Délais */}
                <div className="space-y-3">
                  <Button onClick={calculerPrix} variant="primary">Calculer Prix</Button>
                  <p className="font-semibold">Prix Total: {prixTotal}€</p>

                  <Button onClick={calculerDelai} variant="primary">Calculer Délai</Button>
                  <p className="font-semibold">Délai de Livraison: {delaiLivraison}</p>
                </div>

                {/* Connexions */}
                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold">Connexions</h3>
                  <p>🏭 <strong>Production:</strong> API temps réel pour statut usine</p>
                  <p>📦 <strong>Magasinier:</strong> Synchronisation des réservations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreationDevis;
