import { useState, useEffect } from "react";
import Sidebar from "../../componentApprovisionnement/Sidebar";
import Header from "../../componentApprovisionnement/Header";
import { Save, X, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Données initiales
const rawMaterials = [
  { value: 'acier_brut', label: 'Acier brut', suppliers: ['metal_nord', 'steelcorp'], stock: 1500 },
  { value: 'fer_barres', label: 'Fer en barres', suppliers: ['global_fer'], stock: 800 },
  { value: 'carbone', label: 'Carbone', suppliers: ['steelcorp'], stock: 300 },
  { value: 'zinc', label: 'Zinc', suppliers: ['metal_nord'], stock: 450 },
  { value: 'aluminium', label: 'Aluminium', suppliers: ['global_fer'], stock: 1200 },
];

const suppliers = [
  { value: 'metal_nord', label: 'Société MétalNord', materials: ['acier_brut', 'zinc'] },
  { value: 'steelcorp', label: 'SteelCorp Tunisia', materials: ['acier_brut', 'carbone'] },
  { value: 'global_fer', label: 'Global Fer Distribution', materials: ['fer_barres', 'aluminium'] },
];

const CommandeFournisseur = () => {
  // États pour le formulaire
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    deliveryDate: null,
    priority: 'medium',
    notes: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  
  // États pour la liste des commandes
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const [orderIdCounter, setOrderIdCounter] = useState(1);

  // Vérification des incompatibilités
  useEffect(() => {
    const incompatibleMaterials = selectedMaterials.filter(material => 
      !selectedSupplier?.materials.includes(material.value)
    );
    setShowAlert(incompatibleMaterials.length > 0);
  }, [selectedMaterials, selectedSupplier]);

  // Gestion des matières sélectionnées
  const handleMaterialChange = (selectedOptions) => {
    setSelectedMaterials(selectedOptions.map(option => ({
      ...option,
      quantity: '',
      unit: 'kg'
    })));
  };

  // Gestion du fournisseur sélectionné
  const handleSupplierChange = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    setSelectedMaterials(prev => prev.filter(m => 
      selectedOption.materials.includes(m.value)
    ));
  };

  // Mise à jour des champs matière
  const updateMaterialField = (index, field, value) => {
    const updatedMaterials = [...selectedMaterials];
    updatedMaterials[index][field] = value;
    setSelectedMaterials(updatedMaterials);
  };

  // Soumission de la commande
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOrder = {
      id: `CMD-${new Date().getFullYear()}-${orderIdCounter.toString().padStart(4, '0')}`,
      supplier: selectedSupplier,
      materials: selectedMaterials,
      date: new Date().toISOString().split('T')[0],
      deliveryDate: orderDetails.deliveryDate,
      priority: orderDetails.priority,
      notes: orderDetails.notes,
      status: 'En attente de confirmation'
    };

    setOrders([...orders, newOrder]);
    setOrderIdCounter(orderIdCounter + 1);
    
    // Réinitialisation du formulaire
    setSelectedMaterials([]);
    setSelectedSupplier(null);
    setOrderDetails({
      deliveryDate: null,
      priority: 'medium',
      notes: ''
    });
    
    setActiveTab('list');
  };

  // Changement de statut de la commande
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <Header />

        <div className="p-6 max-w-6xl mx-auto">
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'new' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('new')}
            >
              Nouvelle commande
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'list' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('list')}
            >
              Liste des commandes ({orders.length})
            </button>
          </div>

          {activeTab === 'new' ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📦 Nouvelle commande fournisseur
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {showAlert && (
                    <div className="bg-yellow-100 p-4 rounded-lg flex items-center gap-3">
                      <AlertTriangle className="text-yellow-600" />
                      <span className="text-yellow-800">
                        Certaines matières sélectionnées ne sont pas fournies par ce fournisseur
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Informations fournisseur</h3>
                      
                      <label className="block">
                        <span className="text-gray-700 mb-2 block">Fournisseur *</span>
                        <Select
                          options={suppliers}
                          value={selectedSupplier}
                          onChange={handleSupplierChange}
                          placeholder="Choisir un fournisseur..."
                          isSearchable
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-gray-700 mb-2 block">Délai de livraison *</span>
                        <DatePicker
                          selected={orderDetails.deliveryDate}
                          onChange={(date) => setOrderDetails({...orderDetails, deliveryDate: date})}
                          minDate={new Date()}
                          className="w-full p-2 border rounded"
                          placeholderText="Sélectionner une date"
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="text-gray-700 mb-2 block">Priorité</span>
                        <select
                          className="w-full p-2 border rounded"
                          value={orderDetails.priority}
                          onChange={(e) => setOrderDetails({...orderDetails, priority: e.target.value})}
                        >
                          <option value="high">Haute</option>
                          <option value="medium">Moyenne</option>
                          <option value="low">Basse</option>
                        </select>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Détails des matières</h3>
                      
                      <label className="block">
                        <span className="text-gray-700 mb-2 block">Matières premières *</span>
                        <Select
                          options={rawMaterials}
                          value={selectedMaterials}
                          onChange={handleMaterialChange}
                          isMulti
                          isSearchable
                          placeholder="Sélectionner les matières..."
                          required
                        />
                      </label>

                      {selectedMaterials.length > 0 && (
                        <div className="space-y-3">
                          {selectedMaterials.map((material, index) => (
                            <div key={material.value} className="grid grid-cols-2 gap-3 items-center">
                              <div>
                                <span className="font-medium">{material.label}</span>
                                <span className="ml-2 text-sm text-gray-500">
                                  (Stock: {material.stock} kg)
                                </span>
                              </div>
                              
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  placeholder="Qté"
                                  className="w-20 p-2 border rounded"
                                  value={material.quantity}
                                  onChange={(e) => updateMaterialField(index, 'quantity', e.target.value)}
                                  required
                                  min="1"
                                />
                                
                                <select
                                  className="p-2 border rounded"
                                  value={material.unit}
                                  onChange={(e) => updateMaterialField(index, 'unit', e.target.value)}
                                >
                                  <option value="kg">kg</option>
                                  <option value="tonne">tonne</option>
                                  <option value="unité">unité</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-gray-700 mb-2 block">Notes supplémentaires</span>
                    <textarea
                      className="w-full p-2 border rounded h-24"
                      value={orderDetails.notes}
                      onChange={(e) => setOrderDetails({...orderDetails, notes: e.target.value})}
                      placeholder="Informations complémentaires..."
                    />
                  </label>

                  <div className="flex justify-end gap-3 pt-6 border-t">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <X size={18} /> Annuler
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex items-center gap-2"
                      disabled={!selectedSupplier || selectedMaterials.length === 0}
                    >
                      <Save size={18} /> Envoyer la commande
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Liste des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune commande enregistrée
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-left">N° Commande</th>
                          <th className="p-3 text-left">Fournisseur</th>
                          <th className="p-3 text-left">Matières</th>
                          <th className="p-3 text-left">Livraison</th>
                          <th className="p-3">Statut</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium">{order.id}</div>
                              <div className="text-sm text-gray-500">{order.date}</div>
                            </td>
                            
                            <td className="p-3">{order.supplier.label}</td>
                            
                            <td className="p-3">
                              {order.materials.map((material, index) => (
                                <div key={index} className="text-sm">
                                  {material.quantity} {material.unit} de {material.label}
                                </div>
                              ))}
                            </td>
                            
                            <td className="p-3">
                              {order.deliveryDate?.toLocaleDateString() || 'Non spécifié'}
                            </td>
                            
                            <td className="p-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-sm ${
                                order.status === 'Confirmée' ? 'bg-green-100 text-green-800' :
                                order.status === 'Annulée' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status === 'En attente de confirmation' && (
                                  <Clock className="inline mr-1" size={14} />
                                )}
                                {order.status === 'Confirmée' && (
                                  <CheckCircle className="inline mr-1" size={14} />
                                )}
                                {order.status}
                              </span>
                            </td>
                            
                            <td className="p-3 space-x-2">
                              {order.status === 'En attente de confirmation' && (
                                <>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => updateOrderStatus(order.id, 'Confirmée')}
                                  >
                                    Confirmer
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => updateOrderStatus(order.id, 'Annulée')}
                                  >
                                    Annuler
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="primary"
                                size="sm"
                              >
                                <FileText size={16} className="mr-1" /> PDF
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandeFournisseur;