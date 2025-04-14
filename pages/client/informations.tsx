import React, { useState } from "react";
import { useRouter } from "next/router";

const Informations = () => {
  const router = useRouter();
  const { cart, total, paymentMethod } = router.query;
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  // États pour le formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    gouvernorat: "",
    ville: "",
    codePostal: "",
    adresse: "",
    numeroCarte: "",
    dateExpiration: "",
    cvv: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation des données ici
    router.push({
      pathname: "/client/confirmation",
      query: { 
        cart: JSON.stringify(parsedCart),
        total,
        paymentMethod,
        ...formData 
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Informations de livraison et paiement</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Section Livraison */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📦 Informations de livraison</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Gouvernorat</label>
                <select
                  name="gouvernorat"
                  value={formData.gouvernorat}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="Tunis">Tunis</option>
                  <option value="Ariana">Ariana</option>
                  <option value="Ben Arous">Ben Arous</option>
                  {/* Ajoutez d'autres gouvernorats */}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Ville</label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Code Postal</label>
                <input
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Adresse complète</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section Paiement */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {paymentMethod === "CB" ? "💳 Informations de carte bancaire" : 
               paymentMethod === "PayPal" ? "🅿️ Connexion PayPal" : 
               "🏦 Informations de virement"}
            </h2>
            
            {paymentMethod === "CB" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-1">Numéro de carte</label>
                  <input
                    type="text"
                    name="numeroCarte"
                    value={formData.numeroCarte}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Date d'expiration</label>
                  <input
                    type="text"
                    name="dateExpiration"
                    value={formData.dateExpiration}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="MM/AA"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            )}
            
            {paymentMethod === "PayPal" && (
              <div className="text-center py-4">
                <p className="mb-4">Vous serez redirigé vers PayPal pour compléter votre paiement</p>
                <button 
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Se connecter à PayPal
                </button>
              </div>
            )}
            
            {paymentMethod === "Virement" && (
              <div className="bg-gray-50 p-4 rounded">
                <p className="mb-2">Veuillez effectuer un virement à :</p>
                <p className="mb-1"><strong>Banque :</strong> Votre Banque</p>
                <p className="mb-1"><strong>IBAN :</strong> TN59 1234 5678 9012 3456 7890</p>
                <p className="mb-1"><strong>BIC :</strong> BICXXXXXXX</p>
                <p className="mb-1"><strong>Titulaire :</strong> Votre Société</p>
                <p className="mt-2 text-sm">Votre commande sera traitée après réception du virement.</p>
              </div>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium"
          >
            Confirmer la commande
          </button>
        </form>
      </div>
    </div>
  );
};

export default Informations;