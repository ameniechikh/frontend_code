import React from "react";
import { useRouter } from "next/router";

const Commande = () => {
  const router = useRouter();
  const { cart, total } = router.query;
  const parsedCart = cart ? JSON.parse(cart as string) : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold">🛒 Confirmation de commande</h1>
        <div className="mt-4">
          {parsedCart.map((item: any, index: number) => (
            <p key={index} className="text-gray-700">
              {item.quantity}x {item.name} - {item.price * item.quantity}€
            </p>
          ))}
        </div>
        <p className="text-xl font-bold mt-4">Total : {total}€</p>
        <button
          onClick={() => router.push("/client/paiement")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Passer au paiement
        </button>
      </div>
    </div>
  );
};

export default Commande;
