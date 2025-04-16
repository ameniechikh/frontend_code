import { useState } from "react";
import { useRouter } from "next/router";

const AuthFournisseur = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    siret: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && !formData.acceptTerms) {
      alert("Vous devez accepter les CGU pour créer un compte.");
      return;
    }
    console.log("Formulaire soumis :", formData);
    router.push("/Fournisseur/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Bannière Industrielle */}
      <div
        className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center text-white p-10 rounded-l-3xl shadow-lg"
        style={{ backgroundImage: "url('/steel-factory.jpg')" }}
      >
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">🏭 SteelFlow Pro</h2>
        <p className="text-lg text-center max-w-md drop-shadow-md">
          Optimisez vos approvisionnements en acier avec notre plateforme intelligente et moderne.
        </p>
      </div>

      {/* Formulaire Auth */}
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full md:w-1/3 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {isSignup ? "Créer un compte Fournisseur" : "Connexion Fournisseur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Raison sociale</label>
                <input
                  type="text"
                  name="company"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">SIRET</label>
                <input
                  type="text"
                  name="siret"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-2xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {isSignup && (
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-sm text-gray-600">
                J'accepte les{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Conditions Générales d'Utilisation
                </a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition"
          >
            {isSignup ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            {isSignup ? "Déjà un compte ? Se connecter" : "Pas encore inscrit ? Créer un compte"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthFournisseur;
