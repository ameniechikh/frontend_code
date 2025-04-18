"use client";

import React, { useState } from "react";
import {
  ClipboardList, Play, Pause, Check, Eye, AlertTriangle, 
  Wrench, PlusCircle, FileText, Clock, TrendingUp, 
  Package, Calendar, User, ChevronDown, Search, Filter,X
} from "lucide-react";
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";

interface ProductionStep {
  id: string;
  name: string;
  status: "Préparation" | "Lancement" | "Contrôle Qualité" | "Finalisation";
  progress: number;
  quantityPlanned: number;
  quantityCompleted: number;
  startTime?: Date;
  endTime?: Date;
  operator?: string;
  issues?: string[];
  notes?: string;
}

interface ProductionOrder {
  id: string;
  product: string;
  status: "En attente" | "En cours" | "Terminée" | "Problème";
  steps: ProductionStep[];
  startDate: Date;
  lineManager?: string;
  dailyReports?: {
    date: Date;
    quantityProduced: number;
    issues: string[];
    machineDowntime: number; // en minutes
    observations: string;
  }[];
}

const initialProductionOrders: ProductionOrder[] = [
  {
    id: "OF-2023-001",
    product: "Pièce A",
    status: "En cours",
    startDate: new Date(Date.now() - 86400000), // Hier
    lineManager: "Jean Dupont",
    steps: [
      {
        id: "1",
        name: "Préparation",
        status: "Préparation",
        progress: 100,
        quantityPlanned: 1000,
        quantityCompleted: 1000,
        startTime: new Date(Date.now() - 86400000),
        endTime: new Date(Date.now() - 82800000),
        operator: "Sophie Martin"
      },
      {
        id: "2",
        name: "Lancement",
        status: "Lancement",
        progress: 75,
        quantityPlanned: 1000,
        quantityCompleted: 750,
        startTime: new Date(Date.now() - 82800000),
        operator: "Pierre Lambert",
        issues: ["Panne mineure ligne 2"]
      },
      {
        id: "3",
        name: "Contrôle Qualité",
        status: "Contrôle Qualité",
        progress: 0,
        quantityPlanned: 1000,
        quantityCompleted: 0
      },
      {
        id: "4",
        name: "Finalisation",
        status: "Finalisation",
        progress: 0,
        quantityPlanned: 1000,
        quantityCompleted: 0
      }
    ],
    dailyReports: [
      {
        date: new Date(Date.now() - 86400000),
        quantityProduced: 500,
        issues: ["Réglage initial plus long que prévu"],
        machineDowntime: 45,
        observations: "Démarrage lent mais production stable en fin de journée"
      }
    ]
  },
  {
    id: "OF-2023-002",
    product: "Assemblage X",
    status: "En attente",
    startDate: new Date(),
    steps: [
      {
        id: "1",
        name: "Préparation",
        status: "Préparation",
        progress: 0,
        quantityPlanned: 500,
        quantityCompleted: 0
      },
      {
        id: "2",
        name: "Lancement",
        status: "Lancement",
        progress: 0,
        quantityPlanned: 500,
        quantityCompleted: 0
      },
      {
        id: "3",
        name: "Contrôle Qualité",
        status: "Contrôle Qualité",
        progress: 0,
        quantityPlanned: 500,
        quantityCompleted: 0
      },
      {
        id: "4",
        name: "Finalisation",
        status: "Finalisation",
        progress: 0,
        quantityPlanned: 500,
        quantityCompleted: 0
      }
    ]
  },
  {
    id: "OF-2023-003",
    product: "Composant Y",
    status: "Problème",
    startDate: new Date(Date.now() - 172800000), // Avant-hier
    lineManager: "Marie Curie",
    steps: [
      {
        id: "1",
        name: "Préparation",
        status: "Préparation",
        progress: 100,
        quantityPlanned: 800,
        quantityCompleted: 800,
        startTime: new Date(Date.now() - 172800000),
        endTime: new Date(Date.now() - 169200000),
        operator: "Luc Bernard"
      },
      {
        id: "2",
        name: "Lancement",
        status: "Lancement",
        progress: 30,
        quantityPlanned: 800,
        quantityCompleted: 240,
        startTime: new Date(Date.now() - 169200000),
        operator: "Luc Bernard",
        issues: ["Problème d'alimentation", "Panne machine principale"]
      },
      {
        id: "3",
        name: "Contrôle Qualité",
        status: "Contrôle Qualité",
        progress: 0,
        quantityPlanned: 800,
        quantityCompleted: 0
      },
      {
        id: "4",
        name: "Finalisation",
        status: "Finalisation",
        progress: 0,
        quantityPlanned: 800,
        quantityCompleted: 0
      }
    ],
    dailyReports: [
      {
        date: new Date(Date.now() - 172800000),
        quantityProduced: 800,
        issues: [],
        machineDowntime: 15,
        observations: "Préparation terminée sans problème"
      },
      {
        date: new Date(Date.now() - 86400000),
        quantityProduced: 240,
        issues: ["Problème d'alimentation", "Panne machine principale"],
        machineDowntime: 210,
        observations: "Production fortement ralentie par problèmes techniques"
      }
    ]
  }
];

const ProductionManagementPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<ProductionOrder[]>(initialProductionOrders);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProductionStep | null>(null);
  const [newReport, setNewReport] = useState({
    quantityProduced: 0,
    issues: "",
    machineDowntime: 0,
    observations: ""
  });
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const updateOrderStatus = (orderId: string, newStatus: ProductionOrder["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const startProduction = (orderId: string) => {
    const now = new Date();
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: "En cours",
          steps: order.steps.map((step, i) => 
            i === 0 ? { 
              ...step, 
              status: "Préparation",
              startTime: now,
              progress: 0 
            } : step
          )
        };
      }
      return order;
    }));
  };

  const completeStep = (orderId: string, stepId: string) => {
    const now = new Date();
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const steps = [...order.steps];
        const stepIndex = steps.findIndex(s => s.id === stepId);
        
        if (stepIndex >= 0) {
          // Marquer l'étape actuelle comme terminée
          steps[stepIndex] = {
            ...steps[stepIndex],
            progress: 100,
            endTime: now
          };
          
          // Démarrer l'étape suivante si elle existe
          if (stepIndex < steps.length - 1) {
            steps[stepIndex + 1] = {
              ...steps[stepIndex + 1],
              status: steps[stepIndex + 1].name as any,
              startTime: now,
              progress: 0
            };
          } else {
            // Toutes les étapes sont terminées
            return { ...order, steps, status: "Terminée" };
          }
        }
        
        return { ...order, steps };
      }
      return order;
    }));
  };

  const addDailyReport = (orderId: string) => {
    const report = {
      date: new Date(),
      quantityProduced: newReport.quantityProduced,
      issues: newReport.issues.split('\n').filter(i => i.trim()),
      machineDowntime: newReport.machineDowntime,
      observations: newReport.observations
    };

    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          dailyReports: [...(order.dailyReports || []), report]
        };
      }
      return order;
    }));

    setNewReport({
      quantityProduced: 0,
      issues: "",
      machineDowntime: 0,
      observations: ""
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours": return "bg-blue-100 text-blue-800";
      case "En attente": return "bg-yellow-100 text-yellow-800";
      case "Terminée": return "bg-green-100 text-green-800";
      case "Problème": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProductionStats = (order: ProductionOrder) => {
    if (!order.dailyReports || order.dailyReports.length === 0) return null;
    
    const totalProduced = order.dailyReports.reduce((sum, report) => sum + report.quantityProduced, 0);
    const totalDowntime = order.dailyReports.reduce((sum, report) => sum + report.machineDowntime, 0);
    const totalIssues = order.dailyReports.reduce((sum, report) => sum + report.issues.length, 0);
    
    const activeStep = order.steps.find(step => step.progress > 0 && step.progress < 100);
    const completionRate = activeStep ? 
      (activeStep.quantityCompleted / activeStep.quantityPlanned) * 100 : 0;
    
    return {
      totalProduced,
      totalDowntime,
      totalIssues,
      completionRate
    };
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <Header onToggleSidebar={toggleSidebar} />
        
        <main className="p-6 mt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <ClipboardList className="h-6 w-6 mr-2 text-blue-500" />
              Gestion de la Production
            </h1>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              >
                Liste
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-4 py-2 rounded-md ${viewMode === "kanban" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
              >
                Kanban
              </button>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher par OF ou produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Tous les statuts</option>
                  <option value="En attente">En attente</option>
                  <option value="En cours">En cours</option>
                  <option value="Terminée">Terminée</option>
                  <option value="Problème">Problème</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouveau rapport
              </button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Référence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date début
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      État
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const activeStep = order.steps.find(step => step.progress > 0 && step.progress < 100) || 
                                      order.steps[order.steps.length - 1];
                    const stats = calculateProductionStats(order);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {activeStep.quantityCompleted} / {activeStep.quantityPlanned}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.startDate.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.lineManager || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye className="h-4 w-4 inline-block" />
                          </button>
                          {order.status === "En attente" && (
                            <button
                              onClick={() => startProduction(order.id)}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              <Play className="h-4 w-4 inline-block" />
                            </button>
                          )}
                          {order.status === "En cours" && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, "Problème")}
                                className="text-yellow-600 hover:text-yellow-900 mr-3"
                              >
                                <Pause className="h-4 w-4 inline-block" />
                              </button>
                              <button
                                onClick={() => {
                                  const currentStep = order.steps.find(step => step.progress > 0 && step.progress < 100);
                                  if (currentStep) completeStep(order.id, currentStep.id);
                                }}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Check className="h-4 w-4 inline-block" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["En attente", "En cours", "Problème", "Terminée"].map((status) => (
                <div key={status} className="bg-gray-50 rounded-lg shadow-sm p-4">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      status === "En attente" ? "bg-yellow-500" :
                      status === "En cours" ? "bg-blue-500" :
                      status === "Problème" ? "bg-red-500" : "bg-green-500"
                    }`}></span>
                    {status}
                  </h3>
                  
                  <div className="space-y-3">
                    {filteredOrders
                      .filter(order => order.status === status)
                      .map(order => (
                        <div 
                          key={order.id} 
                          className="bg-white p-3 rounded-md shadow-xs border border-gray-200 cursor-pointer hover:border-blue-300"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <span className="text-xs text-gray-500">
                              {order.startDate.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{order.product}</p>
                          
                          <div className="mt-2">
                            {order.steps.map(step => (
                              <div key={step.id} className="mb-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>{step.name}</span>
                                  <span>{step.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-blue-600 h-1.5 rounded-full" 
                                    style={{ width: `${step.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de détails */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedOrder.product} - {selectedOrder.id}
                      </h2>
                      <div className="flex items-center mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full mr-3 ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          <Calendar className="h-4 w-4 inline-block mr-1" />
                          {selectedOrder.startDate.toLocaleDateString()}
                        </span>
                        {selectedOrder.lineManager && (
                          <span className="text-sm text-gray-500 ml-3">
                            <User className="h-4 w-4 inline-block mr-1" />
                            {selectedOrder.lineManager}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Étapes de production */}
                    <div className="lg:col-span-2">
                      <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                        <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                        Étapes de production
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedOrder.steps.map((step) => (
                          <div 
                            key={step.id} 
                            className={`border rounded-md p-4 ${step.progress < 100 ? "border-blue-200 bg-blue-50" : "border-green-200 bg-green-50"}`}
                            onClick={() => setSelectedStep(step)}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900">{step.name}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                step.progress === 100 ? "bg-green-100 text-green-800" :
                                step.progress > 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                              }`}>
                                {step.progress}%
                              </span>
                            </div>
                            
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Quantité:</span>{' '}
                                <span className="font-medium">{step.quantityCompleted} / {step.quantityPlanned}</span>
                              </div>
                              {step.operator && (
                                <div>
                                  <span className="text-gray-500">Opérateur:</span>{' '}
                                  <span className="font-medium">{step.operator}</span>
                                </div>
                              )}
                            </div>
                            
                            {step.issues && step.issues.length > 0 && (
                              <div className="mt-2 text-sm">
                                <span className="text-red-500 font-medium">Problèmes:</span>
                                <ul className="list-disc list-inside text-red-600">
                                  {step.issues.map((issue, i) => (
                                    <li key={i}>{issue}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {step.notes && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500">Notes:</span>{' '}
                                <span>{step.notes}</span>
                              </div>
                            )}
                            
                            {step.progress > 0 && step.progress < 100 && (
                              <div className="mt-3 flex justify-end space-x-2">
                                <button
                                  onClick={() => completeStep(selectedOrder.id, step.id)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Terminer étape
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rapports et statistiques */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Rapports journaliers
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedOrder.dailyReports && selectedOrder.dailyReports.length > 0 ? (
                          selectedOrder.dailyReports.map((report, index) => (
                            <div key={index} className="border rounded-md p-3 bg-white">
                              <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {report.date.toLocaleDateString()}
                                </h4>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {report.quantityProduced} unités
                                </span>
                              </div>
                              
                              {report.machineDowntime > 0 && (
                                <div className="mt-1 text-xs text-red-600">
                                  <Clock className="h-3 w-3 inline-block mr-1" />
                                  Arrêt machine: {report.machineDowntime} minutes
                                </div>
                              )}
                              
                              {report.issues.length > 0 && (
                                <div className="mt-1">
                                  <h5 className="text-xs font-medium text-gray-500">Problèmes:</h5>
                                  <ul className="text-xs text-gray-700 list-disc list-inside">
                                    {report.issues.map((issue, i) => (
                                      <li key={i}>{issue}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {report.observations && (
                                <div className="mt-1 text-xs text-gray-700">
                                  <p className="font-medium text-gray-500">Observations:</p>
                                  <p>{report.observations}</p>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">Aucun rapport disponible</p>
                        )}
                        
                        {/* Formulaire de nouveau rapport */}
                        <div className="border rounded-md p-4 bg-gray-50 mt-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">
                            Ajouter un rapport journalier
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700">
                                Quantité produite
                              </label>
                              <input
                                type="number"
                                value={newReport.quantityProduced}
                                onChange={(e) => setNewReport({...newReport, quantityProduced: parseInt(e.target.value) || 0})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700">
                                Temps d'arrêt machine (minutes)
                              </label>
                              <input
                                type="number"
                                value={newReport.machineDowntime}
                                onChange={(e) => setNewReport({...newReport, machineDowntime: parseInt(e.target.value) || 0})}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700">
                                Problèmes rencontrés (un par ligne)
                              </label>
                              <textarea
                                value={newReport.issues}
                                onChange={(e) => setNewReport({...newReport, issues: e.target.value})}
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs font-medium text-gray-700">
                                Observations
                              </label>
                              <textarea
                                value={newReport.observations}
                                onChange={(e) => setNewReport({...newReport, observations: e.target.value})}
                                rows={2}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                            
                            <button
                              onClick={() => addDailyReport(selectedOrder.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                              <PlusCircle className="h-3 w-3 mr-1" />
                              Ajouter rapport
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Statistiques */}
                      {selectedOrder.dailyReports && selectedOrder.dailyReports.length > 0 && (
                        <div className="mt-6 border rounded-md p-4 bg-white">
                          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                            Statistiques de production
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="border rounded-md p-2">
                              <div className="text-gray-500">Total produit</div>
                              <div className="font-medium text-xl">
                                {calculateProductionStats(selectedOrder)?.totalProduced}
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-2">
                              <div className="text-gray-500">Taux de rendement</div>
                              <div className="font-medium text-xl">
                                {calculateProductionStats(selectedOrder)?.completionRate.toFixed(1)}%
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-2">
                              <div className="text-gray-500">Temps d'arrêt total</div>
                              <div className="font-medium text-xl">
                                {calculateProductionStats(selectedOrder)?.totalDowntime} min
                              </div>
                            </div>
                            
                            <div className="border rounded-md p-2">
                              <div className="text-gray-500">Problèmes signalés</div>
                              <div className="font-medium text-xl">
                                {calculateProductionStats(selectedOrder)?.totalIssues}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductionManagementPage;