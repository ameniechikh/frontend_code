import React from "react";
import { useRouter } from "next/router";

const Confirmation = () => {
  const router = useRouter();
  const { 
    cart, 
    total, 
    paymentMethod,
    nom,
    prenom,
    gouvernorat,
    ville,
    codePostal,
    adresse
  } = router.query;

  const parsedCart = cart ? JSON.parse(cart as string) : [];
  const paymentIcons = {
    CB: "💳",
    PayPal: "🅿️",
    Virement: "🏦"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">✅ Commande Confirmée</h1>

        <div className="text-center mb-8">
          <p className="text-lg text-green-600 font-semibold">
            Merci pour votre achat, {prenom} {nom} !
          </p>
          <p className="text-gray-600 mt-2">
            Votre commande a bien été enregistrée.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Détails de la commande */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Détails de la commande</h2>
            
            {parsedCart.map((item: any, index: number) => (
              <div key={index} className="flex justify-between mb-2">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>
                  {(item.price * item.quantity).toFixed(2)}€
                </span>
              </div>
            ))}

            <div className="mt-4 pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Moyen de paiement :</span>
                <span className="text-lg">
                  {paymentIcons[paymentMethod as keyof typeof paymentIcons]} {paymentMethod}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total payé :</span>
                <span className="text-xl font-bold text-green-600">
                  {total}€
                </span>
              </div>
            </div>
          </div>

          {/* Adresse de livraison */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Adresse de livraison</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">{prenom} {nom}</p>
              <p>{adresse}</p>
              <p>{codePostal} {ville}</p>
              <p>{gouvernorat}</p>
            </div>

            {paymentMethod === "Virement" && (
              <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Instructions pour virement</h3>
                <p className="text-sm text-yellow-700">
                  Veuillez effectuer le virement dans les 24h pour valider votre commande.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => router.push("/client/home")}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Confirmation;