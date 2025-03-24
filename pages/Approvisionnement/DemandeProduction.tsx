import { useState } from "react";
import { ClipboardList, AlertCircle, CheckCircle, Clock, Send } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

const DemandeProduction = () => {
  const [demande, setDemande] = useState({
    produit: "",
    quantité: "",
    priorité: "Normale",
  });

  const [demandesEnvoyees, setDemandesEnvoyees] = useState([]);

  const envoyerDemande = () => {
    if (demande.produit && demande.quantité) {
      setDemandesEnvoyees([...demandesEnvoyees, { ...demande, statut: "En attente" }]);
      setDemande({ produit: "", quantité: "", priorité: "Normale" });
      alert("Demande envoyée avec succès !");
    }
  };

  const changerStatut = (index, nouveauStatut) => {
    const misesAJour = [...demandesEnvoyees];
    misesAJour[index].statut = nouveauStatut;
    setDemandesEnvoyees(misesAJour);
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
          <div className="w-full max-w-5xl space-y-6">
            
            {/* Formulaire de Demande */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Formulaire de Requête</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={demande.produit}
                    onChange={(e) => setDemande({ ...demande, produit: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Quantité demandée"
                    value={demande.quantité}
                    onChange={(e) => setDemande({ ...demande, quantité: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <select
                    value={demande.priorité}
                    onChange={(e) => setDemande({ ...demande, priorité: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Urgente">🔥 Urgente</option>
                    <option value="Haute">⚡ Haute</option>
                    <option value="Normale">🟢 Normale</option>
                    <option value="Basse">🔵 Basse</option>
                  </select>
                  <Button variant="primary" onClick={envoyerDemande}>Envoyer la Demande</Button>
                </div>
              </CardContent>
            </Card>

            {/* Suivi des Demandes */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Suivi des Demandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demandesEnvoyees.length === 0 ? (
                    <p className="text-gray-500">Aucune demande enregistrée.</p>
                  ) : (
                    <ul className="space-y-2">
                      {demandesEnvoyees.map((d, index) => (
                        <li key={index} className="p-3 border rounded-lg flex justify-between items-center">
                          <div>
                            <strong>{d.produit} - {d.quantité} unités</strong>
                            <p className="text-sm text-gray-500">Priorité : {d.priorité}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {d.statut === "En attente" && <Clock className="w-5 h-5 text-yellow-500" />}
                            {d.statut === "Validée" && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {d.statut === "Refusée" && <AlertCircle className="w-5 h-5 text-red-500" />}
                            <select
                              value={d.statut}
                              onChange={(e) => changerStatut(index, e.target.value)}
                              className="p-1 border border-gray-300 rounded-lg"
                            >
                              <option value="En attente">🟡 En attente</option>
                              <option value="Validée">✅ Validée</option>
                              <option value="Refusée">❌ Refusée</option>
                            </select>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Connexion avec Production & Commercial */}
            <Card>
              <CardHeader>
                <CardTitle>🔗 Connexions avec Production & Commercial</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gestion des priorités et suivi des commandes avec les équipes de production et commerciales.</p>
                <Button variant="primary" className="mt-4">Voir le planning de production</Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeProduction;
