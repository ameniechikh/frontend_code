import { useState } from "react";
import { useRouter } from "next/navigation"; // Utilise next/navigation au lieu de next/router
import axios from "axios";

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
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setMessage("Veuillez remplir tous les champs !");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/login/client", {
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem("token", response.data.token); // Stocker le token
        setMessage("Connexion réussie !");
        setTimeout(() => router.push("/shop"), 1500); // Rediriger vers /shop
      } catch (err: any) {
        setMessage(err.response?.data?.error || "Erreur lors de la connexion");
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
        setMessage("Veuillez remplir tous les champs !");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage("Les mots de passe ne correspondent pas !");
        return;
      }

      if (!/^\d{8}$/.test(formData.phoneNumber)) { // Ajusté à 8 chiffres
        setMessage("Numéro de téléphone invalide (8 chiffres requis, par exemple : 22345678)");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/register", {
          email: formData.email,
          password: formData.password,
          phone: formData.phoneNumber,
          name: `${formData.firstName} ${formData.lastName}`.trim()
        });
        setMessage("Inscription réussie !");
        setTimeout(() => router.push("/login"), 1500); // Rediriger vers /login après inscription
      } catch (err: any) {
        setMessage(err.response?.data?.error || "Erreur lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        {message && <p className="text-center mb-4 text-red-600">{message}</p>}
        
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
                  pattern="^\d{8}$"
                  title="8 chiffres requis (par exemple : 0612345678)"
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