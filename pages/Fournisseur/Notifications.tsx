import { useState } from "react";
import { Bell, Package, AlertCircle, FileText, Check, X } from "lucide-react";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";

interface Notification {
  id: number;
  type: "order" | "status" | "invoice";
  message: string;
  date: string;
  read: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "order",   message: "Nouvelle commande reçue - #CMD-2456",      date: "2024-03-15 09:30", read: false },
    { id: 2, type: "status",  message: "Statut modifié pour #CMD-2451 : En préparation", date: "2024-03-14 15:45", read: true  },
    { id: 3, type: "invoice", message: "Facture #FAC-0324 en attente de paiement",       date: "2024-03-14 10:15", read: false },
  ]);
  const [filter, setFilter] = useState<"all"|"read"|"unread">("all");

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":   return <Package className="h-5 w-5 text-blue-600" />;
      case "status":  return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "invoice": return <FileText className="h-5 w-5 text-red-600" />;
      default:        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: number) =>
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));

  const deleteNotification = (id: number) =>
    setNotifications(notifications.filter(n => n.id !== id));

  const filteredNotifications = notifications.filter(n => {
    if (filter === "read")   return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar à gauche */}
      <SidebarFournisseur />

      <div className="flex-1 flex flex-col">
        {/* Header fixé en haut */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <HeaderFournisseur />
        </div>

        {/* Contenu centré */}
        <main className="pt-16 flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">📬 Notifications</h1>
              <select
                className="px-4 py-2 border rounded-lg"
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
              >
                <option value="all">Toutes</option>
                <option value="unread">Non lues</option>
                <option value="read">Lues</option>
              </select>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map(n => (
                      <div
                        key={n.id}
                        className={`p-4 border-b last:border-b-0 ${
                          !n.read ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="mt-1">{getNotificationIcon(n.type)}</div>
                            <div>
                              <p className="font-medium">{n.message}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(n.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!n.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(n.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(n.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification trouvée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
