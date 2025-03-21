import { useState } from "react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../../componentFournisseur/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../componentFournisseur/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import { Download, Filter } from "lucide-react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const livraisons = [
  { date: "12/09/2023", commande: "#4567", matiere: "Minerai de fer", quantite: "50T", statut: "Complète", client: "Client A" },
  { date: "05/09/2023", commande: "#4452", matiere: "Coke métallurgique", quantite: "30T", statut: "Partielle", client: "Client B" },
  { date: "22/08/2023", commande: "#4321", matiere: "Ferraille", quantite: "20T", statut: "Complète", client: "Client A" },
];

const couleurs = ["#4CAF50", "#FF9800", "#F44336"];

const livraisonsParClient = livraisons.reduce((acc, liv) => {
  acc[liv.client] = (acc[liv.client] || 0) + parseInt(liv.quantite);
  return acc;
}, {} as Record<string, number>);

const dataGraphique = Object.entries(livraisonsParClient).map(([client, quantite], index) => ({
  name: client,
  value: quantite,
  color: couleurs[index % couleurs.length],
}));

const HistoriqueLivraisons = () => {
  const [filtre, setFiltre] = useState("date");

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarFournisseur />

      <div className="flex-1">
        {/* Header */}
        <HeaderFournisseur />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">🚛 Historique des Livraisons</h1>

          {/* Filtres */}
          <div className="flex gap-4 mb-6">
            <Select onValueChange={setFiltre}>
              <SelectTrigger className="w-60">
                <Filter size={18} className="mr-2" />
                <SelectValue placeholder="Filtrer par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">📅 Date</SelectItem>
                <SelectItem value="matiere">🔍 Type de matière</SelectItem>
                <SelectItem value="client">🏭 Usine de destination</SelectItem>
              </SelectContent>
            </Select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <Download size={18} /> Exporter (CSV/PDF)
            </button>
          </div>

          {/* Tableau des livraisons */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Historique des Livraisons</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>N° Commande</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livraisons.map((liv, index) => (
                    <TableRow key={index}>
                      <TableCell>{liv.date}</TableCell>
                      <TableCell>{liv.commande}</TableCell>
                      <TableCell>{liv.matiere}</TableCell>
                      <TableCell>{liv.quantite}</TableCell>
                      <TableCell className={liv.statut === "Complète" ? "text-green-600" : "text-orange-600"}>
                        {liv.statut}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Graphique des livraisons */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>📊 Répartition des livraisons par client</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dataGraphique} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {dataGraphique.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueLivraisons;
