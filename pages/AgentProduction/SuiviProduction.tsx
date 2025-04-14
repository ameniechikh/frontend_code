"use client";

import React, { useState, useEffect } from "react";
import {
  Layout, Package, ClipboardList, Truck, FileText, AlertCircle,
  PlusCircle, Zap, Box, TrendingUp, Database, ListPlus, Clock,
  Flag, Puzzle, Play, User, Calendar, Copy, Pause, Check, Eye, AlertTriangle, Wrench
} from "lucide-react";
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";

interface ProductionStep {
  id: string;
  name: string;
  progress: number;
  status: "En cours" | "En pause" | "Terminé" | "En attente";
  elapsedTime: number; // en heures
  operator: string;
  estimatedDuration: number; // en heures
  startTime?: Date;
  endTime?: Date;
  comments?: string;
}

interface ProductionOrder {
  id: string;
  product: string;
  globalProgress: number;
  status: "En cours" | "En pause" | "Terminé" | "En attente";
  lastUpdate: Date;
  steps: ProductionStep[];
  alert?: string;
}

const DUMMY_ORDERS: ProductionOrder[] = [
  {
    id: "OF-2023-001",
    product: "Pièce A",
    globalProgress: 65,
    status: "En cours",
    lastUpdate: new Date(Date.now() - 3600000), // il y a 1 heure
    steps: [
      {
        id: "1",
        name: "Découpe",
        progress: 100,
        status: "Terminé",
        elapsedTime: 2,
        operator: "Opérateur Jean",
        estimatedDuration: 2
      },
      {
        id: "2",
        name: "Perçage",
        progress: 80,
        status: "En cours",
        elapsedTime: 3,
        operator: "Opératrice Sophie",
        estimatedDuration: 2.5,
        startTime: new Date(Date.now() - 10800000), // il y a 3 heures
        comments: "Petit retard dû à un changement d'outil"
      },
      {
        id: "3",
        name: "Assemblage",
        progress: 0,
        status: "En attente",
        elapsedTime: 0,
        operator: "Équipe Alpha",
        estimatedDuration: 4
      }
    ],
    alert: "Délai dépassé pour l'étape Perçage"
  },
  {
    id: "OF-2023-002",
    product: "Assemblage X",
    globalProgress: 30,
    status: "En pause",
    lastUpdate: new Date(Date.now() - 7200000), // il y a 2 heures
    steps: [
      {
        id: "1",
        name: "Préparation",
        progress: 100,
        status: "Terminé",
        elapsedTime: 1,
        operator: "Opérateur Jean",
        estimatedDuration: 1
      },
      {
        id: "2",
        name: "Montage",
        progress: 30,
        status: "En pause",
        elapsedTime: 2,
        operator: "Équipe Alpha",
        estimatedDuration: 5,
        startTime: new Date(Date.now() - 14400000), // il y a 4 heures
        comments: "Pause technique - Problème d'alimentation sur la machine"
      }
    ]
  },
  {
    id: "OF-2023-003",
    product: "Composant Y",
    globalProgress: 100,
    status: "Terminé",
    lastUpdate: new Date(Date.now() - 86400000), // il y a 24 heures
    steps: [
      {
        id: "1",
        name: "Moulage",
        progress: 100,
        status: "Terminé",
        elapsedTime: 8,
        operator: "Opérateur Jean",
        estimatedDuration: 8
      },
      {
        id: "2",
        name: "Finition",
        progress: 100,
        status: "Terminé",
        elapsedTime: 4,
        operator: "Opératrice Sophie",
        estimatedDuration: 4
      }
    ]
  }
];

const ProductionTrackingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<ProductionOrder[]>(DUMMY_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);
  const [comment, setComment] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openOrderDetails = (order: ProductionOrder) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const updateOrderStatus = (orderId: string, newStatus: ProductionOrder["status"]) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          lastUpdate: new Date()
        };
      }
      return order;
    }));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        lastUpdate: new Date()
      });
    }
  };

  const completeCurrentStep = (orderId: string, stepId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedSteps = order.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              progress: 100,
              status: "Terminé",
              endTime: new Date()
            };
          }
          return step;
        });

        // Calculer le progrès global
        const totalSteps = updatedSteps.length;
        const completedSteps = updatedSteps.filter(step => step.status === "Terminé").length;
        const globalProgress = Math.round((completedSteps / totalSteps) * 100);

        // Mettre à jour le statut si nécessaire
        let status = order.status;
        if (globalProgress === 100) {
          status = "Terminé";
        } else if (status === "Terminé") {
          status = "En cours";
        }

        return {
          ...order,
          steps: updatedSteps,
          globalProgress,
          status,
          lastUpdate: new Date()
        };
      }
      return order;
    }));

    if (selectedOrder?.id === orderId) {
      const updatedSteps = selectedOrder.steps.map(step => {
        if (step.id === stepId) {
          return {
            ...step,
            progress: 100,
            status: "Terminé",
            endTime: new Date()
          };
        }
        return step;
      });

      const totalSteps = updatedSteps.length;
      const completedSteps = updatedSteps.filter(step => step.status === "Terminé").length;
      const globalProgress = Math.round((completedSteps / totalSteps) * 100);

      let status = selectedOrder.status;
      if (globalProgress === 100) {
        status = "Terminé";
      } else if (status === "Terminé") {
        status = "En cours";
      }

      setSelectedOrder({
        ...selectedOrder,
        steps: updatedSteps,
        globalProgress,
        status,
        lastUpdate: new Date()
      });
    }
  };

  const addCommentToStep = (orderId: string, stepId: string) => {
    if (!comment.trim()) return;

    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          steps: order.steps.map(step => {
            if (step.id === stepId) {
              return {
                ...step,
                comments: comment
              };
            }
            return step;
          }),
          lastUpdate: new Date()
        };
      }
      return order;
    }));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        steps: selectedOrder.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              comments: comment
            };
          }
          return step;
        }),
        lastUpdate: new Date()
      });
    }

    setComment("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "En pause":
        return "bg-yellow-100 text-yellow-800";
      case "Terminé":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <Header onToggleSidebar={toggleSidebar} />

        <main className="p-6 mt-16">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-blue-500" />
              <span>Suivi de la Production en Temps Réel</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code OF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avancement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière mise à jour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className={order.alert ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${order.globalProgress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">{order.globalProgress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.alert && (
                          <div className="mt-1 flex items-center text-xs text-red-600">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {order.alert}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.lastUpdate.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openOrderDetails(order)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" /> Détails
                          </button>
                          {order.status === "En cours" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "En pause")}
                              className="text-yellow-600 hover:text-yellow-900 flex items-center"
                            >
                              <Pause className="h-4 w-4 mr-1" /> Pause
                            </button>
                          )}
                          {order.status === "En pause" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "En cours")}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <Play className="h-4 w-4 mr-1" /> Reprendre
                            </button>
                          )}
                          {order.globalProgress === 100 && order.status !== "Terminé" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "Terminé")}
                              className="text-green-600 hover:text-green-900 flex items-center"
                            >
                              <Check className="h-4 w-4 mr-1" /> Terminer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal pour les détails de l'OF */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Détails de l'OF: {selectedOrder.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Produit: {selectedOrder.product} | Dernière mise à jour: {selectedOrder.lastUpdate.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={closeOrderDetails}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Fermer</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900">Progression globale: {selectedOrder.globalProgress}%</h4>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div className="space-y-6">
                      {selectedOrder.steps.map((step) => (
                        <div key={step.id} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-medium text-gray-900">{step.name}</h5>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(step.status)} mr-2`}>
                                  {step.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {step.elapsedTime}h écoulées / {step.estimatedDuration}h estimées
                                </span>
                                {step.elapsedTime > step.estimatedDuration && (
                                  <span className="ml-2 flex items-center text-xs text-red-600">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Délai dépassé
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                Opérateur: {step.operator}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{ width: `${step.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700">{step.progress}%</span>
                            </div>
                          </div>

                          {step.status === "En cours" && (
                            <div className="mt-3 flex justify-end">
                              <button
                                onClick={() => completeCurrentStep(selectedOrder.id, step.id)}
                                className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded flex items-center"
                              >
                                <Check className="h-3 w-3 mr-1" />
                                Marquer comme terminé
                              </button>
                            </div>
                          )}

                          {(step.status === "En pause" || step.comments) && (
                            <div className="mt-3 bg-yellow-50 p-3 rounded-md">
                              <div className="flex items-start">
                                <Wrench className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm text-yellow-800 font-medium">Commentaire:</p>
                                  <p className="text-sm text-yellow-700">{step.comments || "Aucun commentaire"}</p>
                                </div>
                              </div>
                              <div className="mt-2 flex">
                                <input
                                  type="text"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Ajouter un commentaire..."
                                  className="flex-1 text-xs border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => addCommentToStep(selectedOrder.id, step.id)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded-r-md"
                                >
                                  Ajouter
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {selectedOrder.alert && (
                      <div className="mt-4 p-3 bg-red-50 rounded-md flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Alerte:</p>
                          <p className="text-sm text-red-700">{selectedOrder.alert}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={closeOrderDetails}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded text-sm"
                      >
                        Fermer
                      </button>
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

export default ProductionTrackingPage;