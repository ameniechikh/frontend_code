import { useState } from "react";
import { utils, writeFile } from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Mail, Edit, FileText, Calendar, Download, CheckCircle, Plus, Save, X } from "lucide-react";
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FacturesRapports = () => {
  const [factures, setFactures] = useState([
    { 
      id: "F-2025-001", 
      type: "Client", 
      nom: "Hedi Saïd", 
      date: "2025-04-01", 
      montant: 12000, 
      statut: "Payée", 
      email: "hedi@example.com",
      produits: [
        { nom: "Produit A", quantité: 2, prix: 3000 },
        { nom: "Produit B", quantité: 1, prix: 6000 }
      ]
    }
  ]);

  const [filtresFactures, setFiltresFactures] = useState({
    dateDebut: "",
    dateFin: "",
    statut: "Tous",
    type: "Tous"
  });

  const [rapportConfig, setRapportConfig] = useState({
    type: "ventes",
    periode: "mensuel",
    format: "graphique"
  });

  const [editionFacture, setEditionFacture] = useState(null);
  const [nouvelleFacture, setNouvelleFacture] = useState(null);

  // Génération nouvelle facture
  const demarrerNouvelleFacture = () => {
    const newId = `F-2025-${String(factures.length + 1).padStart(3, '0')}`;
    setNouvelleFacture({
      id: newId,
      type: "Client",
      nom: "",
      date: new Date().toISOString().split('T')[0],
      montant: 0,
      statut: "Brouillon",
      email: "",
      produits: []
    });
  };

  const sauvegarderNouvelleFacture = () => {
    if (nouvelleFacture.nom && nouvelleFacture.email) {
      setFactures(prev => [...prev, nouvelleFacture]);
      setNouvelleFacture(null);
    }
  };

  // Modification facture
  const modifierFacture = (facture) => {
    setEditionFacture({...facture});
  };

  const sauvegarderModification = () => {
    if (editionFacture.nom && editionFacture.email) {
      setFactures(prev => 
        prev.map(f => f.id === editionFacture.id ? editionFacture : f)
      );
      setEditionFacture(null);
    }
  };

  // Génération PDF
  const genererPDF = (facture) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Facture ${facture.id}`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Client: ${facture.nom}`, 14, 32);
    doc.text(`Date: ${facture.date}`, 14, 38);
    doc.text(`Statut: ${facture.statut}`, 14, 44);

    autoTable(doc, {
      startY: 50,
      head: [['Produit', 'Quantité', 'Prix unitaire', 'Total']],
      body: facture.produits.map(p => [
        p.nom,
        p.quantité,
        `${p.prix.toLocaleString()} TND`,
        `${(p.quantité * p.prix).toLocaleString()} TND`
      ]),
      foot: [[
        'Total', 
        '', 
        '', 
        `${facture.montant.toLocaleString()} TND`
      ]],
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`facture-${facture.id}.pdf`);
  };

  const exporterExcel = () => {
    const worksheet = utils.json_to_sheet(factures.map(f => ({
      'N° Facture': f.id,
      Type: f.type,
      Nom: f.nom,
      Date: f.date,
      Montant: f.montant,
      Statut: f.statut
    })));
    
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Factures");
    writeFile(workbook, "factures.xlsx");
  };

  const envoyerEmail = async (facture) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: facture.email,
          subject: `Facture ${facture.id}`,
          text: `Cher ${facture.nom},\nVeuillez trouver ci-joint votre facture.`
        })
      });
      
      if (!response.ok) throw new Error('Échec envoi');
      alert(`Facture envoyée à ${facture.email}`);
    } catch (error) {
      alert("Erreur d'envoi : " + error.message);
    }
  };

  const validerFacture = (id) => {
    setFactures(factures.map(f => 
      f.id === id ? { ...f, statut: "Validée" } : f
    ));
    alert("Facture validée avec succès !");
  };

  const filtrerFactures = () => {
    return factures.filter(f => {
      const matchDate = (!filtresFactures.dateDebut || f.date >= filtresFactures.dateDebut) &&
                       (!filtresFactures.dateFin || f.date <= filtresFactures.dateFin);
      const matchStatut = filtresFactures.statut === "Tous" || f.statut === filtresFactures.statut;
      const matchType = filtresFactures.type === "Tous" || f.type === filtresFactures.type;
      return matchDate && matchStatut && matchType;
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <HeaderAgentCommercial />

        <div className="p-6 space-y-8">
          {/* Modal Édition */}
          {(editionFacture || nouvelleFacture) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {nouvelleFacture ? "Nouvelle Facture" : "Modifier Facture"}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setEditionFacture(null);
                      setNouvelleFacture(null);
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={nouvelleFacture?.nom || editionFacture?.nom || ""}
                      onChange={e => {
                        const target = nouvelleFacture || editionFacture;
                        const updated = {...target, nom: e.target.value};
                        nouvelleFacture ? setNouvelleFacture(updated) : setEditionFacture(updated);
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      value={nouvelleFacture?.email || editionFacture?.email || ""}
                      onChange={e => {
                        const target = nouvelleFacture || editionFacture;
                        const updated = {...target, email: e.target.value};
                        nouvelleFacture ? setNouvelleFacture(updated) : setEditionFacture(updated);
                      }}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditionFacture(null);
                        setNouvelleFacture(null);
                      }}
                    >
                      Annuler
                    </Button>
                    <Button 
                      onClick={nouvelleFacture ? sauvegarderNouvelleFacture : sauvegarderModification}
                      disabled={!nouvelleFacture?.nom || !nouvelleFacture?.email}
                    >
                      <Save className="mr-2 h-4 w-4" /> Sauvegarder
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Factures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Gestion des Factures
                <Button className="ml-auto" onClick={demarrerNouvelleFacture}>
                  <Plus className="h-4 w-4 mr-2" /> Nouvelle Facture
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                  type="date"
                  className="p-2 border rounded-lg"
                  onChange={e => setFiltresFactures({...filtresFactures, dateDebut: e.target.value})}
                />
                <input
                  type="date"
                  className="p-2 border rounded-lg"
                  onChange={e => setFiltresFactures({...filtresFactures, dateFin: e.target.value})}
                />
                <select
                  className="p-2 border rounded-lg"
                  value={filtresFactures.statut}
                  onChange={e => setFiltresFactures({...filtresFactures, statut: e.target.value})}
                >
                  <option value="Tous">Tous statuts</option>
                  <option value="Payée">Payée</option>
                  <option value="En attente">En attente</option>
                  <option value="Brouillon">Brouillon</option>
                </select>
                <select
                  className="p-2 border rounded-lg"
                  value={filtresFactures.type}
                  onChange={e => setFiltresFactures({...filtresFactures, type: e.target.value})}
                >
                  <option value="Tous">Tous types</option>
                  <option value="Client">Client</option>
                  <option value="Fournisseur">Fournisseur</option>
                </select>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">N° Facture</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Nom</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Montant</th>
                      <th className="p-3 text-left">Statut</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrerFactures().map(facture => (
                      <tr key={facture.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{facture.id}</td>
                        <td className="p-3">{facture.type}</td>
                        <td className="p-3">{facture.nom}</td>
                        <td className="p-3">{facture.date}</td>
                        <td className="p-3">{facture.montant.toLocaleString()} TND</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            facture.statut === "Payée" ? "bg-green-100 text-green-800" :
                            facture.statut === "En attente" ? "bg-orange-100 text-orange-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {facture.statut}
                          </span>
                        </td>
                        <td className="p-3 space-x-2">
                          {facture.type === "Client" ? (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => genererPDF(facture)}
                                disabled={facture.statut === "Brouillon"}
                              >
                                <Download className="h-4 w-4 mr-1" /> PDF
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => envoyerEmail(facture)}
                                disabled={!facture.email}
                              >
                                <Mail className="h-4 w-4 mr-1" />
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => validerFacture(facture.id)}
                              disabled={facture.statut === "Validée"}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> 
                              {facture.statut === "Validée" ? "Validée" : "Valider"}
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => modifierFacture(facture)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Section Rapports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Tableau de Bord Analytique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select
                  className="p-2 border rounded-lg"
                  value={rapportConfig.type}
                  onChange={e => setRapportConfig({...rapportConfig, type: e.target.value})}
                >
                  <option value="ventes">Ventes clients</option>
                  <option value="achats">Achats fournisseurs</option>
                </select>
                
                <select
                  className="p-2 border rounded-lg"
                  value={rapportConfig.periode}
                  onChange={e => setRapportConfig({...rapportConfig, periode: e.target.value})}
                >
                  <option value="mensuel">Mensuel</option>
                  <option value="trimestriel">Trimestriel</option>
                  <option value="annuel">Annuel</option>
                </select>

                <div className="flex gap-2">
                  <Button onClick={exporterExcel} variant="outline">
                    <FileText className="h-4 w-4 mr-2" /> Excel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    {rapportConfig.type === "ventes" ? "Évolution des Ventes" : "Évolution des Achats"}
                  </h3>
                  <LineChart width={500} height={300} data={rapportConfig.type === "ventes" ? [
                    { mois: "Jan", ventes: 40000 },
                    { mois: "Fév", ventes: 68000 },
                    { mois: "Mar", ventes: 79000 },
                  ] : [
                    { mois: "Jan", achats: 22000 },
                    { mois: "Fév", achats: 35000 },
                    { mois: "Mar", achats: 41000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey={rapportConfig.type === "ventes" ? "ventes" : "achats"} 
                      stroke="#3b82f6" 
                    />
                  </LineChart>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Répartition par {rapportConfig.type === "ventes" ? "Client" : "Fournisseur"}
                  </h3>
                  <PieChart width={500} height={300}>
                    <Pie
                      data={[
                        { nom: "Client A", value: 40000 },
                        { nom: "Client B", value: 30000 },
                        { nom: "Client C", value: 20000 },
                      ]}
                      dataKey="value"
                      nameKey="nom"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {[...Array(3)].map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacturesRapports;