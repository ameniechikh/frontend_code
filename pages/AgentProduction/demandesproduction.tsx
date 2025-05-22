"use client";

import React, { useState } from "react";
import {
  Package, ClipboardList, PlusCircle, Calendar, 
  Flag, FileText, Paperclip, Send, Trash2, 
  CheckCircle, Clock, Zap, Settings, Factory, X,
  ChevronDown, Search, Filter, Download, Eye,AlertTriangle
} from "lucide-react";
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";

interface ProductionRequest {
  id: string;
  product: string;
  quantity: number;
  desiredDate: Date;
  priority: "Haute" | "Normale" | "Basse";
  notes: string;
  attachments: string[];
  status: "Envoyée" | "Acceptée" | "En cours" | "Terminée" | "Annulée";
  requestDate: Date;
  rawMaterials: string[];
}

const initialProductionRequest: ProductionRequest = {
  id: "",
  product: "",
  quantity: 1,
  desiredDate: new Date(),
  priority: "Normale",
  notes: "",
  attachments: [],
  status: "Envoyée",
  requestDate: new Date(),
  rawMaterials: [],
};

const DUMMY_PRODUCTS = [
  "Boîtier électronique AX-200", 
  "Module sans fil BX-450", 
  "Capteur de température CT-100", 
  "Alimentation 12V 5A"
];

const PRODUCT_MATERIALS: { [key: string]: string[] } = {
  "Boîtier électronique AX-200": [
    "Plastique ABS",
    "Circuit imprimé",
    "Vis M3",
    "Écrou M3"
  ],
  "Module sans fil BX-450": [
    "Circuit imprimé",
    "Microcontrôleur",
    "Résistance 1kΩ",
    "Condensateur 10μF"
  ],
  "Capteur de température CT-100": [
    "Circuit imprimé",
    "Microcontrôleur",
    "LED",
    "Batterie"
  ],
  "Alimentation 12V 5A": [
    "Circuit imprimé",
    "Câble USB",
    "Condensateur 10μF",
    "Résistance 1kΩ"
  ]
};

const AVAILABLE_RAW_MATERIALS = [
  "Plastique ABS",
  "Circuit imprimé",
  "Résistance 1kΩ",
  "Condensateur 10μF",
  "Microcontrôleur",
  "LED",
  "Batterie",
  "Câble USB",
  "Vis M3",
  "Écrou M3",
];

const statusOptions = ["Envoyée", "Acceptée", "En cours", "Terminée", "Annulée"];
const priorityOptions = ["Haute", "Normale", "Basse"];

const statusColors = {
  "Envoyée": "bg-blue-100 text-blue-800",
  "Acceptée": "bg-purple-100 text-purple-800",
  "En cours": "bg-yellow-100 text-yellow-800",
  "Terminée": "bg-green-100 text-green-800",
  "Annulée": "bg-red-100 text-red-800"
};

const priorityColors = {
  "Haute": "bg-red-100 text-red-800",
  "Normale": "bg-blue-100 text-blue-800",
  "Basse": "bg-gray-100 text-gray-800"
};

const statusIcons = {
  "Envoyée": <Send className="h-4 w-4 mr-1" />,
  "Acceptée": <CheckCircle className="h-4 w-4 mr-1" />,
  "En cours": <Clock className="h-4 w-4 mr-1" />,
  "Terminée": <Factory className="h-4 w-4 mr-1" />,
  "Annulée": <Trash2 className="h-4 w-4 mr-1" />
};

const priorityIcons = {
  "Haute": <Zap className="h-4 w-4 mr-1" />,
  "Normale": <Settings className="h-4 w-4 mr-1" />,
  "Basse": <Clock className="h-4 w-4 mr-1" />
};

const ProductionRequestPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [productionRequest, setProductionRequest] = useState<ProductionRequest>(initialProductionRequest);
  const [requests, setRequests] = useState<ProductionRequest[]>([]);
  const [attachmentName, setAttachmentName] = useState("");
  const [activeTab, setActiveTab] = useState<"new" | "history">("new");
  const [selectedRequest, setSelectedRequest] = useState<ProductionRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [unavailableMaterials, setUnavailableMaterials] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductionRequest({ ...productionRequest, [name]: value });
    setSelectedMaterial("");
  };

  const handleDateChange = (date: Date) => {
    setProductionRequest({ ...productionRequest, desiredDate: date });
  };

  const addAttachment = () => {
    if (attachmentName.trim()) {
      setProductionRequest({
        ...productionRequest,
        attachments: [...productionRequest.attachments, attachmentName.trim()]
      });
      setAttachmentName("");
    }
  };

  const removeAttachment = (index: number) => {
    const updatedAttachments = [...productionRequest.attachments];
    updatedAttachments.splice(index, 1);
    setProductionRequest({ ...productionRequest, attachments: updatedAttachments });
  };

  const addSelectedMaterial = () => {
    if (!selectedMaterial) {
      alert("Veuillez sélectionner une matière première.");
      return;
    }

    if (!AVAILABLE_RAW_MATERIALS.includes(selectedMaterial)) {
      setUnavailableMaterials([selectedMaterial]);
      notifyProcurementAgent([selectedMaterial]);
    } else {
      setProductionRequest({
        ...productionRequest,
        rawMaterials: [...productionRequest.rawMaterials, selectedMaterial]
      });
      setUnavailableMaterials([]);
    }
    setSelectedMaterial("");
  };

  const notifyProcurementAgent = (materials: string[]) => {
    console.log(`Notification envoyée à l'agent d'approvisionnement : Commander les matières suivantes : ${materials.join(', ')}`);
    alert(`Notification envoyée à l'agent d'approvisionnement pour commander : ${materials.join(', ')}`);
  };

  const submitRequest = () => {
    if (!productionRequest.product || productionRequest.quantity <= 0 || !productionRequest.desiredDate) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newRequest: ProductionRequest = {
      ...productionRequest,
      id: `PR-${Date.now().toString().slice(-6)}`,
      requestDate: new Date(),
      status: "Envoyée"
    };

    setRequests([newRequest, ...requests]);
    setProductionRequest(initialProductionRequest);
    setActiveTab("history");
    setSelectedMaterial("");
  };

  const viewRequestDetails = (request: ProductionRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const cancelRequest = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id && request.status === "Envoyée" 
        ? { ...request, status: "Annulée" } 
        : request
    ));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? request.status === statusFilter : true;
    const matchesPriority = priorityFilter ? request.priority === priorityFilter : true;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="p-6 mt-16">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("new")}
              className={`py-3 px-4 font-medium text-sm flex items-center ${activeTab === "new" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Nouvelle Demande
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-3 px-4 font-medium text-sm flex items-center ${activeTab === "history" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Historique ({requests.length})
            </button>
          </div>

          {activeTab === "new" ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Package className="h-5 w-5 text-blue-500 mr-2" />
                Nouvelle Demande de Production
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    Produit fini à fabriquer *
                  </label>
                  <select
                    name="product"
                    value={productionRequest.product}
                    onChange={handleInputChange}
                    className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Sélectionnez un produit</option>
                    {DUMMY_PRODUCTS.map(product => (
                      <option key={product} value={product}>{product}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <ClipboardList className="h-4 w-4 mr-2 text-gray-500" />
                    Quantité à produire *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={productionRequest.quantity}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    Date souhaitée de fin *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={productionRequest.desiredDate.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(new Date(e.target.value))}
                      className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Flag className="h-4 w-4 mr-2 text-gray-500" />
                    Priorité
                  </label>
                  <div className="relative">
                    <select
                      name="priority"
                      value={productionRequest.priority}
                      onChange={handleInputChange}
                      className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {priorityOptions.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  Sélectionner une matière première
                </label>
                {productionRequest.product ? (
                  <div className="flex gap-2">
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="flex-1 block pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Choisir une matière</option>
                      {PRODUCT_MATERIALS[productionRequest.product].map((material) => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={addSelectedMaterial}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Ajouter
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Veuillez sélectionner un produit pour voir les matières nécessaires.</p>
                )}
                {unavailableMaterials.length > 0 && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <p className="text-sm">
                      Matière non disponible : {unavailableMaterials.join(', ')}. Une notification a été envoyée à l'agent d'approvisionnement.
                    </p>
                  </div>
                )}
                {productionRequest.rawMaterials.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Matières ajoutées :</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {productionRequest.rawMaterials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  Notes / Spécifications techniques
                </label>
                <textarea
                  name="notes"
                  value={productionRequest.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                  placeholder="Ajoutez des notes ou spécifications techniques ici..."
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                  Pièces jointes
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    className="flex-1 block rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
                    placeholder="Nom du fichier"
                  />
                  <button
                    type="button"
                    onClick={addAttachment}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Ajouter
                  </button>
                </div>
                {productionRequest.attachments.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-md p-2">
                    <ul className="divide-y divide-gray-200">
                      {productionRequest.attachments.map((file, index) => (
                        <li key={index} className="py-2 px-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700 truncate">{file}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={submitRequest}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer la demande
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <ClipboardList className="h-5 w-5 text-blue-500 mr-2" />
                  Historique des Demandes
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none block pl-3 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Tous statuts</option>
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="appearance-none block pl-3 pr-8 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Toutes priorités</option>
                        {priorityOptions.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Référence
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantité
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date demande
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priorité
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        État
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.product}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.requestDate.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[request.priority]}`}>
                              {priorityIcons[request.priority]}
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                              {statusIcons[request.status]}
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              onClick={() => viewRequestDetails(request)}
                              className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </button>
                            {request.status === "Envoyée" && (
                              <button 
                                onClick={() => cancelRequest(request.id)}
                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Annuler
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune demande trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isModalOpen && selectedRequest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    Détails de la demande {selectedRequest.id}
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Produit</h4>
                      <p className="text-sm text-gray-900">{selectedRequest.product}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Quantité</h4>
                      <p className="text-sm text-gray-900">{selectedRequest.quantity}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Date de demande</h4>
                      <p className="text-sm text-gray-900">
                        {selectedRequest.requestDate.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Date souhaitée</h4>
                      <p className="text-sm text-gray-900">
                        {selectedRequest.desiredDate.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Priorité</h4>
                      <p className="text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[selectedRequest.priority]}`}>
                          {priorityIcons[selectedRequest.priority]}
                          {selectedRequest.priority}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Statut</h4>
                      <p className="text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedRequest.status]}`}>
                          {statusIcons[selectedRequest.status]}
                          {selectedRequest.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Matières premières</h4>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        {selectedRequest.rawMaterials.length > 0 ? selectedRequest.rawMaterials.join(', ') : "Aucune matière première"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {selectedRequest.notes || "Aucune note fournie"}
                      </p>
                    </div>
                  </div>
                  
                  {selectedRequest.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Pièces jointes</h4>
                      <div className="mt-1 space-y-2">
                        {selectedRequest.attachments.map((file, index) => (
                          <div key={index} className="flex items-center p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                            <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700 flex-1 truncate">{file}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Télécharger
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductionRequestPage;