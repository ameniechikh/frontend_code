import { useState } from "react";
import { useRouter } from "next/router";
import { Lock, User, QrCode } from "lucide-react";
import axios from "axios";

const Login = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [captcha, setCaptcha] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (attempts >= 3) {
      setCaptcha(true);
      return;
    }

    try {
      const response = await axios.post("/api/login", { matricule, password });
      if (response.status === 200) {
        router.push("/Magasinie/DashboardStock");
      }
    } catch (err) {
      setAttempts((prev) => prev + 1);
      setError("Matricule ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Matricule</label>
            <div className="flex items-center border rounded-md p-2">
              <User size={20} className="text-gray-500" />
              <input
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                className="ml-2 flex-1 border-none focus:ring-0"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <div className="flex items-center border rounded-md p-2">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-2 flex-1 border-none focus:ring-0"
                required
              />
            </div>
          </div>

          {captcha && (
            <div className="mb-4">
              <p className="text-red-500">Veuillez résoudre le CAPTCHA.</p>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-blue-500 flex items-center justify-center">
            <QrCode size={20} className="mr-2" /> Se connecter avec QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
