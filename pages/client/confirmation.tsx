import React from "react";
import { useRouter } from "next/router";

const Confirmation = () => {
  const router = useRouter();
  const { paymentMethod, total } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Paiement réussi !</h1>
        <p className="mt-4 text-gray-700">
          Merci pour votre achat. Votre paiement de <strong>{total}€</strong> a été effectué avec succès via{" "}
          <strong>{paymentMethod}</strong>.
        </p>
        <button
          onClick={() => router.push("/client/home")}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
