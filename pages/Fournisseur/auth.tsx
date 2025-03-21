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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Bannière Industrielle */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center bg-gray-900 text-white p-10"
           style={{ backgroundImage: "url('/steel-factory.jpg')" }}>
        <h2 className="text-3xl font-bold mb-4">🏭 SteelFlow Pro</h2>
        <p className="text-lg">Optimisez vos approvisionnements en acier avec une plateforme intelligente.</p>
      </div>

      {/* Formulaire */}
      <div className="bg-white p-8 shadow-lg rounded w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Créer un compte Fournisseur" : "Connexion Fournisseur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium">Raison sociale</label>
                <input type="text" name="company" onChange={handleChange} required
                       className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">SIRET</label>
                <input type="text" name="siret" onChange={handleChange} required
                       className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Téléphone</label>
                <input type="text" name="phone" onChange={handleChange} required
                       className="w-full p-2 border rounded" />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" onChange={handleChange} required
                   className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input type="password" name="password" onChange={handleChange} required
                   className="w-full p-2 border rounded" />
          </div>

          {isSignup && (
            <div className="flex items-center">
              <input type="checkbox" name="acceptTerms" onChange={handleChange} className="mr-2" />
              <label className="text-sm">J'accepte les <a href="#" className="text-blue-500">Conditions Générales d'Utilisation</a></label>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isSignup ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500">Mot de passe oublié ?</a>
        </div>

        <div className="text-center mt-4">
          <button onClick={() => setIsSignup(!isSignup)} className="text-sm text-gray-600">
            {isSignup ? "Déjà un compte ? Se connecter" : "Pas encore inscrit ? Créer un compte"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthFournisseur;
