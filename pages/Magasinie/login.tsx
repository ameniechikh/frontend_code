"use client";

import { useState, useEffect } from "react";
import { Lock, User, Smartphone, AlertCircle } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_ATTEMPTS = 3;
  const LOCK_TIMEOUT = 300000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) {
      setErrorMessage("Compte verrouillé");
      return;
    }

    const isValid = username === "admin" && password === "admin123";
    if (!isValid) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setTimeout(() => setIsLocked(false), LOCK_TIMEOUT);
        setErrorMessage("Compte verrouillé après 3 échecs");
      } else {
        setErrorMessage(`Identifiants incorrects (${MAX_ATTEMPTS - newAttempts} restantes)`);
      }
      return;
    }

    setShow2FA(true);
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode === "123456") {
      window.location.href = "/Magasinie/DashboardStock";
    } else {
      setErrorMessage("Code incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-900 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-gradient-to-r animate-gradient-x from-blue-500 via-purple-500 to-pink-500 border-4 border-black shadow-2xl rounded-full p-10 w-[430px] h-[430px] flex flex-col justify-center items-center relative transition-all duration-1000">
        <div className="w-full mt-4">
          {!show2FA ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute top-3 left-3 text-blue-900" />
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 py-2 w-full rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute top-3 left-3 text-blue-900" />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 py-2 w-full rounded-full border border-blue-300 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {errorMessage && (
                <div className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLocked}
                className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition"
              >
                Connexion
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-4">
              <div className="text-center">
                <Smartphone className="mx-auto text-blue-800" size={30} />
                <p className="text-gray-700 mt-2">Entrez le code 2FA</p>
              </div>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="text-center text-xl w-full border border-blue-300 py-2 rounded-full focus:ring-2 focus:ring-blue-600 outline-none"
              />
              {errorMessage && (
                <div className="text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-full hover:bg-blue-900 transition"
              >
                Vérifier
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
