import { useState } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Simule la vérification du captcha
  const handleCaptchaCheck = () => {
    setCaptchaVerified(true);
  };

  // Gestion de la connexion/inscription
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (!captchaVerified) {
      alert("Veuillez vérifier le captcha !");
      return;
    }

    setMessage(isLogin ? "Connexion réussie !" : "Inscription réussie !");
    
    setTimeout(() => {
      router.push("/client/home"); // Redirige vers la boutique après connexion
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        {message && <p className="text-green-600 text-center">{message}</p>}
        
        <form onSubmit={handleAuth} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Captcha Anti-Robot */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="captcha"
              checked={captchaVerified}
              onChange={handleCaptchaCheck}
            />
            <label htmlFor="captcha" className="text-gray-700">
              Je ne suis pas un robot
            </label>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        {/* Mot de passe oublié */}
        {isLogin && (
          <div className="text-right mt-2">
            <button
              onClick={() => alert("Un email de réinitialisation a été envoyé !")}
              className="text-blue-600 text-sm"
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}

        {/* Connexion via Google et Facebook */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            Continuer avec Google
          </button>
          <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
            Continuer avec Facebook
          </button>
        </div>

        {/* Basculer entre Connexion et Inscription */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 text-sm"
          >
            {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
