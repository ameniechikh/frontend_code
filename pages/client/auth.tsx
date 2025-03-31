import { useState } from "react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert("Veuillez remplir tous les champs !");
        return;
      }
    } else {
      const requiredFields = [
        formData.firstName,
        formData.lastName,
        formData.address,
        formData.phoneNumber,
        formData.email,
        formData.password,
        formData.confirmPassword
      ];

      if (requiredFields.some(field => !field)) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }

      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        alert("Numéro de téléphone invalide (10 chiffres requis)");
        return;
      }
    }

  

    setMessage(isLogin ? "Connexion réussie !" : "Inscription réussie !");
    
    setTimeout(() => {
      router.push("/client/home");
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
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="\d{10}"
                  title="10 chiffres requis"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-gray-700">Confirmation</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            )}
          </div>

         

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        {isLogin && (
          <div className="text-right mt-2">
            <button
              onClick={() => alert("Un email de réinitialisation a été envoyé !")}
              className="text-blue-600 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.835 0 3.456.989 4.518 2.468l3.127-3.125A9.97 9.97 0 0012.545 2C7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10a9.94 9.94 0 00-1.818-5.761l-8.182 3.999z"/>
            </svg>
            Continuer avec Google
          </button>
          
          <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
            Continuer avec Facebook
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 text-sm hover:underline"
          >
            {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;