import React, { useState } from "react";
import { useRouter } from "next/router";

const Paiement = () => {
  const router = useRouter();
  const { cart, total } = router.query;
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Veuillez sélectionner un mode de paiement.");
      return;
    }

    // Simulation du paiement (dans un vrai projet, intégrer une API de paiement)
    setTimeout(() => {
      router.push({
        pathname: "/client/confirmation",
        query: { paymentMethod, total },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold text-center">💳 Paiement</h1>

        {/* Résumé de la commande */}
        <div className="mt-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Résumé de la commande</h2>
          {parsedCart.map((item: any, index: number) => (
            <p key={index} className="text-gray-700">
              {item.quantity}x {item.name} - {item.price * item.quantity}€
            </p>
          ))}
          <p className="text-xl font-bold mt-4">Total : {total}€</p>
        </div>

        {/* Sélection du mode de paiement */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Mode de paiement</h2>
          <div className="mt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="CB"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Carte Bancaire (Visa, Mastercard)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer mt-2">
              <input
                type="radio"
                name="payment"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🅿️ PayPal</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer mt-2">
              <input
                type="radio"
                name="payment"
                value="Virement"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>🏦 Virement Bancaire</span>
            </label>
          </div>
        </div>

        {/* Bouton Valider Paiement */}
        <button
          onClick={handlePayment}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Valider et Payer
        </button>
      </div>
    </div>
  );
};

export default Paiement;
