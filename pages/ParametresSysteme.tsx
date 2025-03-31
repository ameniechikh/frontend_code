"use client";

import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const ParametresSysteme = () => {
  // États pour la gestion des paramètres
  const [language, setLanguage] = useState("fr");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("EUR");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isFeatureEnabled, setIsFeatureEnabled] = useState(true);

  const handleSaveSettings = () => {
    alert("Paramètres enregistrés avec succès !");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
        {/* Header */}
        <Header />

        {/* Contenu de la page */}
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">🛠 Paramètres du Système</h2>

          {/* Section Paramètres Généraux */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Paramètres Généraux</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Langue */}
              <div className="flex items-center justify-between">
                <label htmlFor="language" className="text-gray-700">Langue</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                  <option value="ar">Arabe</option>
                </select>
              </div>

              {/* Fuseau horaire */}
              <div className="flex items-center justify-between">
                <label htmlFor="timezone" className="text-gray-700">Fuseau Horaire</label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="UTC">UTC</option>
                  <option value="CET">CET</option>
                  <option value="EST">EST</option>
                </select>
              </div>

              {/* Devise */}
              <div className="flex items-center justify-between">
                <label htmlFor="currency" className="text-gray-700">Devise</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                  <option value="TND">Dinar Tunisien (د.ت)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Sécurité */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Sécurité</h3>
            <div className="space-y-4">
              {/* Authentification à deux facteurs */}
              <div className="flex justify-between items-center">
                <label htmlFor="2fa" className="text-gray-700">Authentification à Deux Facteurs</label>
                <input
                  type="checkbox"
                  id="2fa"
                  checked={is2FAEnabled}
                  onChange={() => setIs2FAEnabled(!is2FAEnabled)}
                  className="p-2"
                />
              </div>

              {/* Activer/Désactiver fonctionnalité */}
              <div className="flex justify-between items-center">
                <label htmlFor="feature" className="text-gray-700">Activer fonctionnalité spécifique</label>
                <input
                  type="checkbox"
                  id="feature"
                  checked={isFeatureEnabled}
                  onChange={() => setIsFeatureEnabled(!isFeatureEnabled)}
                  className="p-2"
                />
              </div>
            </div>
          </div>

          {/* Section Mises à jour */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Mises à Jour Système</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Dernière mise à jour : 2025-03-30</span>
              <button
                onClick={() => alert("Mise à jour effectuée avec succès !")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Vérifier les Mises à Jour
              </button>
            </div>
          </div>

          {/* Bouton Enregistrer */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Enregistrer les Paramètres
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ParametresSysteme;
