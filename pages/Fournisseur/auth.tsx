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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && !formData.acceptTerms) {
      alert("Vous devez accepter les CGU pour créer un compte.");
      return;
    }
    console.log("Formulaire soumis :", formData);
    router.push("/Fournisseur/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lime-100">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-lime-200 p-10">
        <img
          src="/vel.jpg"
          alt="Person working on a laptop"
          className="w-3/4 h-3/4 object-contain"
        />
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full md:w-1/2 max-w-md flex flex-col justify-center h-screen">
        <div className="flex justify-center mb-6">
          
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignup ? "Create account" : "Connexion Fournisseur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="company"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prenom</label>
                <input
                  type="text"
                  name="siret"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
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
                By creating an account you agree to SteelFlow Pro's{" "}
                <a href="#" className="text-lime-600 hover:underline">
                  Terms of Services & Privacy Policy
                </a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className={`w-full ${
              isSignup ? "bg-lime-600 hover:bg-lime-700" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-semibold py-3 rounded-lg transition`}
          >
            {isSignup ? "Create account" : "Se connecter"}
          </button>
        </form>

        {isSignup ? (
          <div className="text-center mt-2">
            <p className="text-xs text-gray-600">
              Have an account?{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-lime-600 hover:underline text-xs"
              >
                Log in
              </button>
            </p>
          </div>
        ) : (
          <div className="text-center mt-2">
            <a href="#" className="text-xs text-lime-600 hover:underline">
              Mot de passe oublié ?
            </a>
            <div className="mt-1">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-xs text-gray-600 hover:text-lime-600"
              >
                Pas encore inscrit ? Créer un compte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFournisseur;