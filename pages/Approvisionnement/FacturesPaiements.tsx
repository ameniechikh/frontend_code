import { useState } from "react";
import { FileText, Download, Send,RefreshCw ,CheckCircle, XCircle, Clock, FileDown } from "lucide-react";
import SidebarApprovisionnement from "../../componentApprovisionnement/Sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";

interface Invoice {
  id: string;
  supplier: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue" | "partial";
  pdfUrl: string;
}

const FacturesPaiements = () => {
  const [filter, setFilter] = useState<"all" | "unpaid" | "paid">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Données de démonstration
  const invoices: Invoice[] = [
    {
      id: "F-2025-001",
      supplier: "Fournisseur A",
      amount: 250000,
      dueDate: "01-04-2025",
      status: "paid",
      pdfUrl: "/factures/facture-001.pdf"
    },
    {
      id: "F-2025-002",
      supplier: "Fournisseur B",
      amount: 150000,
      dueDate: "05-04-2025",
      status: "unpaid",
      pdfUrl: "/factures/facture-002.pdf"
    },
    {
      id: "F-2025-003",
      supplier: "Fournisseur C",
      amount: 320000,
      dueDate: "10-03-2025",
      status: "overdue",
      pdfUrl: "/factures/facture-003.pdf"
    },
    {
      id: "F-2025-004",
      supplier: "Fournisseur D",
      amount: 180000,
      dueDate: "15-04-2025",
      status: "partial",
      pdfUrl: "/factures/facture-004.pdf"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === "unpaid") return invoice.status !== "paid";
    if (filter === "paid") return invoice.status === "paid";
    return true;
  });

  const handleDownload = (pdfUrl: string) => {
    // Simulation de téléchargement
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "facture.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendNotification = () => {
    setShowSuccess(true);
    setShowSendModal(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const exportReport = () => {
    setExporting(true);
    
    // Simulation d'export (remplacer par un appel API réel)
    setTimeout(() => {
      // Créer le contenu CSV
      const headers = ["N° Facture", "Fournisseur", "Montant (DT)", "Date d'échéance", "Statut"];
      const csvContent = [
        headers.join(";"),
        ...filteredInvoices.map(invoice => 
          [invoice.id, invoice.supplier, invoice.amount, invoice.dueDate, 
           invoice.status === "paid" ? "Payée" : 
           invoice.status === "unpaid" ? "Non payée" :
           invoice.status === "overdue" ? "En retard" : "Partielle"].join(";")
        )
      ].join("\n");

      // Créer et télécharger le fichier
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rapport_factures_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setExporting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    const statusConfig = {
      paid: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
      unpaid: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
      overdue: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> },
      partial: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle className="h-4 w-4" /> }
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[status].color}`}>
        {statusConfig[status].icon}
        <span className="ml-2">
          {status === "paid" && "Payée"}
          {status === "unpaid" && "Non payée"}
          {status === "overdue" && "En retard"}
          {status === "partial" && "Partielle"}
        </span>
      </span>
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <SidebarApprovisionnement />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        <div className="sticky top-0 z-10">
          <HeaderApprovisionnement />
        </div>

        <div className="flex justify-center p-6 flex-1">
          <div className="w-full max-w-7xl space-y-6">
            {/* Filtres et actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <select
                      className="p-2 border rounded-lg"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as "all" | "unpaid" | "paid")}
                    >
                      <option value="all">Toutes les factures</option>
                      <option value="unpaid">Non payées</option>
                      <option value="paid">Payées</option>
                    </select>
                  </div>
                  <Button 
                    variant="primary" 
                    onClick={exportReport}
                    disabled={exporting}
                  >
                    {exporting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Export en cours...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> 
                        Exporter le rapport
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Liste des factures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-blue-500" /> Liste des Factures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-3">N° Facture</th>
                        <th className="p-3">Fournisseur</th>
                        <th className="p-3">Montant (DT)</th>
                        <th className="p-3">Date d'échéance</th>
                        <th className="p-3">Statut</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvoices.map(invoice => (
                        <tr key={invoice.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{invoice.id}</td>
                          <td className="p-3">{invoice.supplier}</td>
                          <td className="p-3">{invoice.amount.toLocaleString()}</td>
                          <td className="p-3">{invoice.dueDate}</td>
                          <td className="p-3">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="p-3 flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleDownload(invoice.pdfUrl)}
                            >
                              <Download className="mr-2 h-4 w-4" /> PDF
                            </Button>
                            {invoice.status !== "paid" && (
                              <Button 
                                variant="primary"
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setShowSendModal(true);
                                }}
                              >
                                <Send className="mr-2 h-4 w-4" /> Paiement
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Modal d'envoi de notification */}
            {showSendModal && selectedInvoice && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="text-blue-500" /> 
                      Confirmer le paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p>Vous êtes sur le point d'envoyer une notification de paiement pour :</p>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p><strong>Facture:</strong> {selectedInvoice.id}</p>
                        <p><strong>Fournisseur:</strong> {selectedInvoice.supplier}</p>
                        <p><strong>Montant:</strong> {selectedInvoice.amount.toLocaleString()} DT</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button 
                        variant="ghost" 
                        onClick={() => setShowSendModal(false)}
                      >
                        Annuler
                      </Button>
                      <Button 
                        variant="primary"
                        onClick={handleSendNotification}
                      >
                        Confirmer et envoyer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications */}
            {showSuccess && (
              <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2 shadow-lg">
                <CheckCircle className="h-6 w-6" />
                {exporting ? "Rapport exporté avec succès !" : "Notification envoyée avec succès !"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacturesPaiements;