"use client";

import { useState, useEffect } from "react";
import { Lock, User, Smartphone, QrCode, AlertCircle } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  // États du formulaire
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Configuration sécurité
  const MAX_ATTEMPTS = 3;
  const LOCK_TIMEOUT = 300000; // 5 minutes

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setErrorMessage("Compte temporairement verrouillé");
      return;
    }

    // Simulation de vérification des identifiants
    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), LOCK_TIMEOUT);
        setErrorMessage("Compte verrouillé après 3 tentatives échouées");
      } else {
        setErrorMessage(`Identifiants incorrects (${MAX_ATTEMPTS - newAttempts} tentatives restantes)`);
      }
      return;
    }

    // Activer le 2FA si nécessaire
    setShow2FA(true);
  };

  // Gestion du 2FA
  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérification du code 2FA
    if (twoFactorCode === "123456") { // Remplacer par appel API
      // Redirection vers le dashboard
      window.location.href = "/Commercial/CreationDevis";
    } else {
      setErrorMessage("Code de vérification incorrect");
    }
  };

  // Simulation vérification credentials
  const verifyCredentials = async (u: string, p: string) => {
    // Remplacer par appel API réel
    return u === "admin" && p === "admin123";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* En-tête */}
        <div className="bg-gray-800 p-6 text-center">
          <Image
            src="/logo6.png"
            alt="Logo Entreprise"
            width={120}
            height={40}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold text-white mt-4">Connexion Sécurisée</h1>
        </div>

        <div className="p-8">
          {!show2FA ? (
            // Formulaire principal
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="nom@entreprise.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-5 w-5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLocked}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                Se connecter
              </button>

              {/* Méthodes alternatives */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Image
                      src="/ldap-icon.png"
                      alt="LDAP"
                      width={20}
                      height={20}
                    />
                    <span>LDAP/AD</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <QrCode className="h-5 w-5 text-blue-600" />
                    <span>QR Code</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // Formulaire 2FA
            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div className="text-center">
                <Smartphone className="mx-auto h-12 w-12 text-blue-600" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  Vérification en deux étapes
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Entrez le code à 6 chiffres envoyé à votre appareil
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code de vérification
                </label>
                <input
                  type="number"
                  required
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-xl"
                  placeholder="000000"
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-5 w-5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Vérifier
              </button>
            </form>
          )}
        </div>

        {/* Pied de page */}
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            © 2024 Votre Entreprise. Tous droits réservés.
            <br />
            <a href="#" className="text-blue-600 hover:underline">
              Politique de sécurité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;