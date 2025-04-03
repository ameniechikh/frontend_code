import { useState } from "react";
import { FileText, Download, AlertCircle, Send, CheckCircle, XCircle } from "lucide-react";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  pdf: string;
  dueDate: string;
  transactions: Transaction[];
}

interface Transaction {
  date: string;
  type: "payment" | "reminder" | "adjustment";
  amount: number;
  description: string;
}

const ComptesFactures = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [notifications, setNotifications] = useState<string[]>([]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "F-2024-001",
      date: "01/03/2024",
      amount: 12500,
      status: "pending",
      pdf: "facture_001.pdf",
      dueDate: "30/03/2024",
      transactions: [
        {
          date: "01/03/2024",
          type: "reminder",
          amount: 0,
          description: "Facture émise"
        }
      ]
    },
    {
      id: "F-2024-002",
      date: "15/02/2024",
      amount: 8200,
      status: "paid",
      pdf: "facture_002.pdf",
      dueDate: "01/03/2024",
      transactions: [
        {
          date: "01/03/2024",
          type: "payment",
          amount: 8200,
          description: "Paiement reçu"
        }
      ]
    },
    {
      id: "F-2024-003",
      date: "28/01/2024",
      amount: 14000,
      status: "overdue",
      pdf: "facture_003.pdf",
      dueDate: "15/02/2024",
      transactions: [
        {
          date: "28/01/2024",
          type: "reminder",
          amount: 0,
          description: "Premier rappel envoyé"
        },
        {
          date: "15/02/2024",
          type: "reminder",
          amount: 0,
          description: "Deuxième rappel envoyé"
        }
      ]
    }
  ]);

  const getStatusBadge = (status: Invoice["status"]) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="h-4 w-4" /> },
      paid: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
      overdue: { color: "bg-red-100 text-red-800", icon: <XCircle className="h-4 w-4" /> }
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[status].color}`}>
        {statusConfig[status].icon}
        <span className="ml-2 capitalize">{status}</span>
      </span>
    );
  };

  const handleSendReminder = (invoiceId: string) => {
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      type: "reminder" as const,
      amount: 0,
      description: "Rappel de paiement envoyé"
    };

    setInvoices(invoices.map(inv => 
      inv.id === invoiceId ? { 
        ...inv, 
        transactions: [...inv.transactions, newTransaction] 
      } : inv
    ));

    addNotification(`Rappel envoyé pour la facture ${invoiceId}`);
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 5000);
  };

  const filteredInvoices = invoices.filter(invoice => 
    filterStatus === "all" || invoice.status === filterStatus
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixe */}
      <div className="fixed left-0 top-0 h-screen w-64 border-r">
        <SidebarFournisseur />
      </div>

      {/* Contenu principal avec marge à gauche */}
      <div className="flex-1 flex flex-col ml-64">
        <HeaderFournisseur />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gestion des Factures et Paiements</h1>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border rounded-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="paid">Payées</option>
                <option value="overdue">En retard</option>
              </select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">N° Facture</th>
                      <th className="p-4 text-left">Montant</th>
                      <th className="p-4 text-left">Échéance</th>
                      <th className="p-4 text-left">Statut</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map(invoice => (
                      <tr key={invoice.id} className="border-t hover:bg-gray-50">
                        <td className="p-4">{invoice.date}</td>
                        <td className="p-4 font-medium">{invoice.id}</td>
                        <td className="p-4">{invoice.amount.toLocaleString()} €</td>
                        <td className="p-4">{invoice.dueDate}</td>
                        <td className="p-4">{getStatusBadge(invoice.status)}</td>
                        <td className="p-4 flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <FileText className="h-4 w-4 mr-2" /> Détails
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => window.open(`/factures/${invoice.pdf}`, "_blank")}
                          >
                            <Download className="h-4 w-4 mr-2" /> PDF
                          </Button>
                          {invoice.status === "overdue" && (
                            <Button
                              variant="destructive"
                              onClick={() => handleSendReminder(invoice.id)}
                            >
                              <Send className="h-4 w-4 mr-2" /> Rappel
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

          {selectedInvoice && (
            <Card className="mt-6">
              <CardHeader className="relative">
                <CardTitle>Détails de la facture {selectedInvoice.id}</CardTitle>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">Historique des transactions</h3>
                    <div className="space-y-4">
                      {selectedInvoice.transactions.map((transaction, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <div className="flex justify-between">
                            <span className="font-medium">{transaction.description}</span>
                            <span className="text-sm text-gray-500">{transaction.date}</span>
                          </div>
                          {transaction.type === "payment" && (
                            <div className="text-green-600">
                              +{transaction.amount.toLocaleString()} €
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Aperçu de la facture</h3>
                    <iframe
                      src='/facture_001.pdf'
                      className="w-full h-96 border rounded-lg"
                      onError={(e) => {
                        const iframe = e.target as HTMLIFrameElement;
                        iframe.style.display = "none";
                        iframe.insertAdjacentHTML(
                          "afterend",
                          `<div class="text-red-500 p-4">Erreur de chargement du PDF</div>`
                        );
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="fixed bottom-4 right-4 space-y-2">
            {notifications.map((message, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
                <CheckCircle className="text-green-500 h-5 w-5" />
                <span>{message}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComptesFactures;