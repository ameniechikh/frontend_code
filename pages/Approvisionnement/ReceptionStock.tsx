import { useState } from "react";
import { Package, ClipboardCheck, Truck, CheckCircle2, AlertCircle, Calendar, BarChart, FileText } from "lucide-react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import SidebarApprovisionnement from "../../componentApprovisionnement/sidebar";
import HeaderApprovisionnement from "../../componentApprovisionnement/header";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";
import Button from "../../componentFournisseur/Button";
import { Badge } from "../../componentFournisseur/Badge";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  section: { marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontWeight: 'bold', width: '40%' },
  value: { width: '60%' }
});

const BordereauPDF = ({ order }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Bordereau de Réception</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Fournisseur:</Text>
          <Text style={styles.value}>{order.supplier}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Référence commande:</Text>
          <Text style={styles.value}>{order.reference}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Date de réception:</Text>
          <Text style={styles.value}>{new Date(order.receptionDate).toLocaleDateString('fr-FR')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ ...styles.label, marginBottom: 10 }}>Détails des matières:</Text>
        {order.materials.map((material, index) => (
          <View key={index} style={{ marginBottom: 10, paddingLeft: 10 }}>
            <Text>• {material.name}</Text>
            <Text>Quantité: {material.receivedQuantity}/{material.orderedQuantity}</Text>
            <Text>État: {material.condition.charAt(0).toUpperCase() + material.condition.slice(1)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

interface OrderMaterial {
  name: string;
  orderedQuantity: number;
  receivedQuantity?: number;
  condition?: "conforme" | "endommagée" | "manquante";
}

interface Order {
  id: string;
  reference: string;
  supplier: string;
  materials: OrderMaterial[];
  orderDate: Date;
  status: "Reçue" | "Partielle" | "En attente";
  receptionDate?: Date;
  proof?: string;
}

const ReceptionStock = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [receptionForm, setReceptionForm] = useState({
    materials: {} as Record<string, { received: number; condition: "conforme" | "endommagée" | "manquante" }>,
    receptionDate: new Date().toISOString().split('T')[0],
    proof: ""
  });
  const [verificationSteps, setVerificationSteps] = useState({
    checkQuantity: false,
    checkQuality: false,
    checkDocuments: false
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      reference: "CMD-2023-001",
      supplier: "Acier France",
      materials: [
        { name: "Tôle d'acier", orderedQuantity: 100 },
        { name: "Profilés aluminium", orderedQuantity: 50 }
      ],
      orderDate: new Date("2024-03-01"),
      status: "En attente"
    },
    {
      id: "2",
      reference: "CMD-2023-002",
      supplier: "MétalPro",
      materials: [
        { name: "Poutres en acier", orderedQuantity: 200 },
        { name: "Rivets inox", orderedQuantity: 1000 }
      ],
      orderDate: new Date("2024-03-05"),
      status: "Partielle",
      receptionDate: new Date("2024-03-10"),
      materials: [
        { name: "Poutres en acier", orderedQuantity: 200, receivedQuantity: 150, condition: "conforme" },
        { name: "Rivets inox", orderedQuantity: 1000, receivedQuantity: 1000, condition: "conforme" }
      ]
    }
  ]);

  const handleReceptionSubmit = () => {
    if (!selectedOrder) return;

    const updatedMaterials = selectedOrder.materials.map(material => ({
      ...material,
      receivedQuantity: receptionForm.materials[material.name]?.received || 0,
      condition: receptionForm.materials[material.name]?.condition || "conforme"
    }));

    const allReceived = updatedMaterials.every(m => m.receivedQuantity === m.orderedQuantity);
    const partialReceived = updatedMaterials.some(m => (m.receivedQuantity || 0) > 0 && m.receivedQuantity !== m.orderedQuantity);

    const updatedOrder: Order = {
      ...selectedOrder,
      materials: updatedMaterials,
      status: allReceived ? "Reçue" : partialReceived ? "Partielle" : "En attente",
      receptionDate: new Date(receptionForm.receptionDate),
      proof: receptionForm.proof
    };

    setOrders(orders.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);
    setVerificationSteps({ checkQuantity: false, checkQuality: false, checkDocuments: false });
  };

  const handleGenerateBordereau = (order: Order) => (
    <PDFDownloadLink
      document={<BordereauPDF order={order} />}
      fileName={`bordereau_${order.reference}.pdf`}
    >
      {({ loading }) => (
        <Button variant="primary" size="sm" disabled={loading}>
          <FileText className="mr-2 h-4 w-4" />
          {loading ? 'Génération...' : 'Télécharger PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );

  const VerificationSteps = () => (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <CheckCircle2 className={`h-5 w-5 ${verificationSteps.checkQuantity ? 'text-green-600' : 'text-gray-400'}`} />
        <div>
          <h4 className="font-medium">1. Vérification quantitative</h4>
          <p className="text-sm text-gray-500">Comparaison avec le bon de commande</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <CheckCircle2 className={`h-5 w-5 ${verificationSteps.checkQuality ? 'text-green-600' : 'text-gray-400'}`} />
        <div>
          <h4 className="font-medium">2. Contrôle qualité</h4>
          <p className="text-sm text-gray-500">Vérification état des matières</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CheckCircle2 className={`h-5 w-5 ${verificationSteps.checkDocuments ? 'text-green-600' : 'text-gray-400'}`} />
        <div>
          <h4 className="font-medium">3. Validation documents</h4>
          <p className="text-sm text-gray-500">Conformité des documents d'accompagnement</p>
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => (
    <Badge
      variant={
        status === "Reçue" ? "success" :
        status === "Partielle" ? "warning" : "neutral"
      }
    >
      {status}
    </Badge>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarApprovisionnement />

      <div className="flex-1 ml-64">
        <HeaderApprovisionnement />

        <main className="p-8 space-y-8">
          {/* Section Statistiques */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="bg-blue-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-900">Réceptions ce mois</CardTitle>
                <BarChart className="h-4 w-4 text-blue-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800">248</div>
                <p className="text-xs text-blue-700 mt-1">+12.5% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-yellow-900">Commandes en attente</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-800">15</div>
                <p className="text-xs text-yellow-700 mt-1">Dont 3 en retard</p>
              </CardContent>
            </Card>

            <Card className="bg-green-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-900">Top Matière</CardTitle>
                <Package className="h-4 w-4 text-green-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">Acier INOX</div>
                <p className="text-xs text-green-700 mt-1">1200 tonnes reçues</p>
              </CardContent>
            </Card>

            <Card className="bg-red-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-red-900">Prochaine livraison</CardTitle>
                <Calendar className="h-4 w-4 text-red-900" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-800">24/03</div>
                <p className="text-xs text-red-700 mt-1">Fournisseur MétalPro</p>
              </CardContent>
            </Card>
          </div>

          {/* Section Principale */}
          <div className="grid grid-cols-3 gap-8">
            {/* Liste des Commandes */}
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-blue-600" />
                      Réceptions de stock
                    </CardTitle>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="input-sm"
                        onChange={e => console.log('Date filter:', e.target.value)}
                      />
                      <select className="select-sm">
                        <option>Tous statuts</option>
                        <option>Reçue</option>
                        <option>Partielle</option>
                        <option>En attente</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm font-medium text-gray-500 border-b">
                        <th className="p-3 text-left">Référence</th>
                        <th className="p-3 text-left">Fournisseur</th>
                        <th className="p-3 text-left">Matières</th>
                        <th className="p-3 text-left">Quantité</th>
                        <th className="p-3 text-left">Statut</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 border-b">
                          <td className="p-3 font-medium">{order.reference}</td>
                          <td className="p-3">{order.supplier}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-2">
                              {order.materials.map(m => (
                                <Badge key={m.name} variant="outline">
                                  {m.name}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            {order.materials.map(m => (
                              <div key={m.name} className="text-sm">
                                {m.receivedQuantity || 0}/{m.orderedQuantity}
                              </div>
                            ))}
                          </td>
                          <td className="p-3">{getStatusBadge(order.status)}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                {order.status === 'En attente' ? 'Commencer réception' : 'Voir détails'}
                              </Button>
                              {order.status !== 'En attente' && handleGenerateBordereau(order)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de Réception */}
            {selectedOrder && (
              <div className="col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardCheck className="h-5 w-5 text-green-600" />
                      {selectedOrder.status === 'En attente' ? 'Processus de réception' : 'Réception validée'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedOrder.status === 'En attente' ? (
                      <>
                        <VerificationSteps />

                        <div className="space-y-4">
                          {selectedOrder.materials.map(material => (
                            <div key={material.name} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{material.name}</span>
                                <span>Commandé: {material.orderedQuantity}</span>
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  className="input flex-1"
                                  min="0"
                                  max={material.orderedQuantity}
                                  onChange={e => setReceptionForm({
                                    ...receptionForm,
                                    materials: {
                                      ...receptionForm.materials,
                                      [material.name]: {
                                        received: Number(e.target.value),
                                        condition: receptionForm.materials[material.name]?.condition || "conforme"
                                      }
                                    }
                                  })}
                                />
                                <select
                                  className="select"
                                  value={receptionForm.materials[material.name]?.condition || "conforme"}
                                  onChange={e => setReceptionForm({
                                    ...receptionForm,
                                    materials: {
                                      ...receptionForm.materials,
                                      [material.name]: {
                                        received: receptionForm.materials[material.name]?.received || 0,
                                        condition: e.target.value as "conforme" | "endommagée" | "manquante"
                                      }
                                    }
                                  })}
                                >
                                  <option value="conforme">Conforme</option>
                                  <option value="endommagée">Endommagé</option>
                                  <option value="manquante">Manquant</option>
                                </select>
                              </div>
                            </div>
                          ))}

                          <div className="pt-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="primary" 
                                className="flex-1"
                                onClick={handleReceptionSubmit}
                                disabled={!Object.values(verificationSteps).every(Boolean)}
                              >
                                Finaliser la réception
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => setSelectedOrder(null)}
                              >
                                Annuler
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="h-5 w-5" />
                            <h3 className="font-medium">
                              Réception validée le {selectedOrder.receptionDate?.toLocaleDateString('fr-FR')}
                            </h3>
                          </div>
                        </div>

                        {selectedOrder.materials.map(material => (
                          <div key={material.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{material.name}</span>
                              <span className="font-medium">
                                {material.receivedQuantity}/{material.orderedQuantity} ({material.condition})
                              </span>
                            </div>
                          </div>
                        ))}

                        <div className="pt-4">
                          {handleGenerateBordereau(selectedOrder)}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReceptionStock;