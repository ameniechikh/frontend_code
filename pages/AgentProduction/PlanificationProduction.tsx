"use client";

import React, { useState } from "react";
import {
  Layout, Package, ClipboardList, Truck, FileText, AlertCircle,
  PlusCircle, Zap, Box, TrendingUp, Database, ListPlus, Clock,
  Flag, Puzzle, Play, User, Calendar, Copy
} from "lucide-react";
import Sidebar from "../../componentProduction/Sidebar";
import Header from "../../componentProduction/Header";
import GanttChart from "../../components/Production/GanttChart"; // Assurez-vous de créer ce composant

interface ProductionStep {
  id: string;
  name: string;
  estimatedDuration: number; // en heures ou jours
  machineAssigned: string;
  operatorResponsible: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  startDatePlanned: Date | null;
  priority: "Haute" | "Moyenne" | "Basse";
  steps: ProductionStep[];
}

const initialProductionOrder: ProductionOrder = {
  id: "", // Sera généré
  product: "",
  quantity: 1,
  startDatePlanned: new Date(),
  priority: "Moyenne",
  steps: [],
};

const initialStep: ProductionStep = {
  id: "", // Sera généré
  name: "",
  estimatedDuration: 1,
  machineAssigned: "",
  operatorResponsible: "",
  startDate: null,
  endDate: null,
};

const DUMMY_PRODUCTS = ["Pièce A", "Pièce B", "Assemblage X", "Composant Y"];
const DUMMY_MACHINES = ["Machine 1", "Machine 2", "Ligne d'assemblage A"];
const DUMMY_OPERATORS = ["Opérateur Jean", "Opératrice Sophie", "Équipe Alpha"];

const ProductionPlanningPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [productionOrder, setProductionOrder] = useState<ProductionOrder>(initialProductionOrder);
  const [newStep, setNewStep] = useState<ProductionStep>(initialStep);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductionOrder({ ...productionOrder, [name]: value });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setProductionOrder({ ...productionOrder, [name]: date });
  };

  const handleStepInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStep({ ...newStep, [name]: value });
  };

  const handleStepDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStep({ ...newStep, [name]: parseInt(value) || 1 });
  };

  const addStep = () => {
    if (newStep.name && newStep.estimatedDuration > 0) {
      setProductionOrder({
        ...productionOrder,
        steps: [...productionOrder.steps, { ...newStep, id: Date.now().toString() }],
      });
      setNewStep(initialStep);
    } else {
      alert("Veuillez renseigner le nom et la durée de l'étape.");
    }
  };

  const removeStep = (id: string) => {
    setProductionOrder({
      ...productionOrder,
      steps: productionOrder.steps.filter((step) => step.id !== id),
    });
  };

  const planProductionOrder = () => {
    if (productionOrder.product && productionOrder.quantity > 0 && productionOrder.startDatePlanned) {
      const newOrder = { ...productionOrder, id: Date.now().toString() };
      setProductionOrders([...productionOrders, newOrder]);
      setProductionOrder(initialProductionOrder);
    } else {
      alert("Veuillez renseigner le produit, la quantité et la date de début prévue.");
    }
  };

  const duplicateProductionOrder = () => {
    if (productionOrder.id) {
      const newOrder = { ...productionOrder, id: Date.now().toString() };
      setProductionOrders([...productionOrders, newOrder]);
    } else {
      alert("Veuillez d'abord planifier un ordre de fabrication pour le dupliquer.");
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
              <ListPlus className="h-5 w-5 text-blue-500" />
              <span>Création d'un Ordre de Fabrication (OF)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2">
                  Produit à fabriquer
                </label>
                <select
                  id="product"
                  name="product"
                  value={productionOrder.product}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Sélectionner un produit</option>
                  {DUMMY_PRODUCTS.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                  Quantité à produire
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={productionOrder.quantity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="startDatePlanned" className="block text-gray-700 text-sm font-bold mb-2">
                  Date de début prévue
                </label>
                <input
                  type="date"
                  id="startDatePlanned"
                  name="startDatePlanned"
                  value={productionOrder.startDatePlanned ? productionOrder.startDatePlanned.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange("startDatePlanned", e.target.value ? new Date(e.target.value) : null)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
                  Priorité
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={productionOrder.priority}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
                </select>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Puzzle className="h-5 w-5 text-yellow-500" />
                <span>Planification des étapes</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label htmlFor="stepName" className="block text-gray-700 text-sm font-bold mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="stepName"
                    name="name"
                    value={newStep.name}
                    onChange={handleStepInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nom de l'étape"
                  />
                </div>
                <div>
                  <label htmlFor="stepDuration" className="block text-gray-700 text-sm font-bold mb-2">
                    Durée estimée (heures)
                  </label>
                  <input
                    type="number"
                    id="stepDuration"
                    name="estimatedDuration"
                    value={newStep.estimatedDuration}
                    onChange={handleStepDurationChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="stepMachine" className="block text-gray-700 text-sm font-bold mb-2">
                    Machine assignée
                  </label>
                  <select
                    id="stepMachine"
                    name="machineAssigned"
                    value={newStep.machineAssigned}
                    onChange={handleStepInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Sélectionner une machine</option>
                    {DUMMY_MACHINES.map((machine) => (
                      <option key={machine} value={machine}>
                        {machine}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="stepOperator" className="block text-gray-700 text-sm font-bold mb-2">
                    Opérateur responsable
                  </label>
                  <select
                    id="stepOperator"
                    name="operatorResponsible"
                    value={newStep.operatorResponsible}
                    onChange={handleStepInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Sélectionner un opérateur</option>
                    {DUMMY_OPERATORS.map((operator) => (
                      <option key={operator} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end justify-center">
                  <button
                    type="button"
                    onClick={addStep}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ajouter Étape
                  </button>
                </div>
              </div>

              {productionOrder.steps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-700 mb-2">Étapes planifiées:</h4>
                  <ul>
                    {productionOrder.steps.map((step) => (
                      <li key={step.id} className="bg-gray-50 rounded-md p-3 mb-2 flex items-center justify-between">
                        <div>
                          <strong>{step.name}</strong> ({step.estimatedDuration}h) - {step.machineAssigned}, {step.operatorResponsible}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStep(step.id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={planProductionOrder}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <Play className="h-4 w-4 inline-block mr-2" />
                Planifier
              </button>
              {productionOrder.id && (
                <button
                  type="button"
                  onClick={duplicateProductionOrder}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <Copy className="h-4 w-4 inline-block mr-2" />
                  Dupliquer
                </button>
              )}
            </div>
          </div>

          {productionOrders.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <span>Vue Gantt</span>
              </h2>
              {/* <GanttChart productionOrders={productionOrders} /> */}
              <p className="text-gray-600">
                (Le composant Vue Gantt sera implémenté ici pour afficher les ordres de fabrication sur une timeline.)
              </p>
              {productionOrders.map((order) => (
                <div key={order.id} className="mb-4 p-4 border rounded-md">
                  <h3 className="font-semibold">{order.product} - Quantité: {order.quantity}</h3>
                  <p className="text-sm text-gray-700">Date de début prévue: {order.startDatePlanned?.toLocaleDateString()}</p>
                  <p className={`text-sm font-bold ${order.priority === 'Haute' ? 'text-red-500' : order.priority === 'Moyenne' ? 'text-orange-500' : 'text-green-500'}`}>
                    Priorité: {order.priority}
                  </p>
                  {order.steps.map((step) => (
                    <div key={step.id} className="ml-4 mt-2 p-2 border-l-2 border-gray-300">
                      <p className="text-sm">{step.name} ({step.estimatedDuration}h)</p>
                      <p className="text-xs text-gray-500">Machine: {step.machineAssigned}, Opérateur: {step.operatorResponsible}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductionPlanningPage;