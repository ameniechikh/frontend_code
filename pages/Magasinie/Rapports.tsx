import { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Download, FileText, PieChart, Filter, X } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ReportData {
  entrees: Array<{
    id: string;
    date: string;
    produit: string;
    quantite: number;
    fournisseur: string;
  }>;
  sorties: Array<{
    id: string;
    date: string;
    produit: string;
    quantite: number;
    client: string;
  }>;
  stock: Array<{
    produit: string;
    quantite: number;
    emplacement: string;
  }>;
  inventaire: Array<{
    produit: string;
    systeme: number;
    physique: number;
    ecart: number;
  }>;
}

const Rapports = () => {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [typeRapport, setTypeRapport] = useState<keyof ReportData>("entrees");

  // Données de démonstration
  const reportData: ReportData = {
    entrees: [
      { id: "E-001", date: "2024-03-01", produit: "Acier S355", quantite: 150, fournisseur: "Fournisseur A" },
      { id: "E-002", date: "2024-03-05", produit: "Aluminium 6061", quantite: 80, fournisseur: "Fournisseur B" },
      { id: "E-003", date: "2024-03-10", produit: "Cuivre C1020", quantite: 200, fournisseur: "Fournisseur C" },
    ],
    sorties: [
      { id: "S-001", date: "2024-03-02", produit: "Acier S355", quantite: 50, client: "Client X" },
      { id: "S-002", date: "2024-03-07", produit: "Aluminium 6061", quantite: 30, client: "Client Y" },
      { id: "S-003", date: "2024-03-12", produit: "Cuivre C1020", quantite: 80, client: "Client Z" },
    ],
    stock: [
      { produit: "Acier S355", quantite: 100, emplacement: "Zone A" },
      { produit: "Aluminium 6061", quantite: 50, emplacement: "Zone B" },
      { produit: "Cuivre C1020", quantite: 120, emplacement: "Zone C" },
    ],
    inventaire: [
      { produit: "Acier S355", systeme: 100, physique: 98, ecart: -2 },
      { produit: "Aluminium 6061", systeme: 50, physique: 50, ecart: 0 },
      { produit: "Cuivre C1020", systeme: 120, physique: 115, ecart: -5 },
    ],
  };

  // Options des graphiques
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Visualisation des données" },
    },
  };

  // Générer les données pour les graphiques
  const generateChartData = () => {
    const data = filteredData();

    switch (typeRapport) {
      case "entrees":
        return {
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Quantité Entrée",
              data: data.map((d) => d.quantite),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        };

      case "sorties":
        return {
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Quantité Sortie",
              data: data.map((d) => d.quantite),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };

      case "stock":
        return {
          labels: data.map((d) => d.produit),
          datasets: [
            {
              label: "Quantité en Stock",
              data: data.map((d) => d.quantite),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
              ],
            },
          ],
        };

      case "inventaire":
        return {
          labels: data.map((d) => d.produit),
          datasets: [
            {
              label: "Écart Inventaire",
              data: data.map((d) => d.ecart),
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        };
    }
  };

  // Filtrer les données selon les dates
  const filteredData = () => {
    const data = reportData[typeRapport];
    return data.filter((item: any) => {
      if (!dateDebut || !dateFin) return true;
      return item.date >= dateDebut && item.date <= dateFin;
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Contrôles */}
            <div className="p-4 border-b flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <PieChart size={24} />
                  Rapports de Stock
                </h2>
                <div className="flex gap-3">
                  <select
                    value={typeRapport}
                    onChange={(e) => setTypeRapport(e.target.value as keyof ReportData)}
                    className="border rounded-md px-4 py-2"
                  >
                    <option value="entrees">Entrées</option>
                    <option value="sorties">Sorties</option>
                    <option value="stock">Stock</option>
                    <option value="inventaire">Inventaire</option>
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                    <Download size={18} className="mr-2" />
                    Exporter
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  />
                  <span>à</span>
                  <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col lg:flex-row gap-6 p-4">
              {/* Liste des données */}
              <div className="lg:w-1/2 h-[500px] overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {typeRapport === "entrees" && (
                        <>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Produit</th>
                          <th className="px-4 py-3 text-left">Quantité</th>
                          <th className="px-4 py-3 text-left">Fournisseur</th>
                        </>
                      )}
                      {typeRapport === "sorties" && (
                        <>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Produit</th>
                          <th className="px-4 py-3 text-left">Quantité</th>
                          <th className="px-4 py-3 text-left">Client</th>
                        </>
                      )}
                      {typeRapport === "stock" && (
                        <>
                          <th className="px-4 py-3 text-left">Produit</th>
                          <th className="px-4 py-3 text-left">Quantité</th>
                          <th className="px-4 py-3 text-left">Emplacement</th>
                        </>
                      )}
                      {typeRapport === "inventaire" && (
                        <>
                          <th className="px-4 py-3 text-left">Produit</th>
                          <th className="px-4 py-3 text-left">Système</th>
                          <th className="px-4 py-3 text-left">Physique</th>
                          <th className="px-4 py-3 text-left">Écart</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData().map((item: any, index: number) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        {typeRapport === "entrees" && (
                          <>
                            <td className="px-4 py-3">{item.date}</td>
                            <td className="px-4 py-3">{item.produit}</td>
                            <td className="px-4 py-3">{item.quantite}</td>
                            <td className="px-4 py-3">{item.fournisseur}</td>
                          </>
                        )}
                        {typeRapport === "sorties" && (
                          <>
                            <td className="px-4 py-3">{item.date}</td>
                            <td className="px-4 py-3">{item.produit}</td>
                            <td className="px-4 py-3">{item.quantite}</td>
                            <td className="px-4 py-3">{item.client}</td>
                          </>
                        )}
                        {typeRapport === "stock" && (
                          <>
                            <td className="px-4 py-3">{item.produit}</td>
                            <td className="px-4 py-3">{item.quantite}</td>
                            <td className="px-4 py-3">{item.emplacement}</td>
                          </>
                        )}
                        {typeRapport === "inventaire" && (
                          <>
                            <td className="px-4 py-3">{item.produit}</td>
                            <td className="px-4 py-3">{item.systeme}</td>
                            <td className="px-4 py-3">{item.physique}</td>
                            <td className={`px-4 py-3 ${
                              item.ecart < 0 ? "text-red-600" : "text-green-600"
                            }`}>
                              {item.ecart}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Graphique */}
              <div className="lg:w-1/2 h-[500px]">
                {typeRapport === "stock" ? (
                  <Pie data={generateChartData()} options={chartOptions} />
                ) : typeRapport === "inventaire" ? (
                  <Line data={generateChartData()} options={chartOptions} />
                ) : (
                  <Bar data={generateChartData()} options={chartOptions} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapports;