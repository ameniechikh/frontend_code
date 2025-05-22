"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, loadCart } from "../../lib/cart";

const Commande = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart.length === 0) {
      router.push("/");
      return;
    }

    const calculatedTotal = savedCart.reduce((sum, item) => {
      const discountMultiplier = item.discount ? (1 - item.discount / 100) : 1;
      return sum + (item.price * discountMultiplier * item.quantity);
    }, 0);

    setCart(savedCart);
    setTotal(parseFloat(calculatedTotal.toFixed(2)));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Votre Commande</h1>

        {cart.map((item) => (
          <div key={item.id} className="border-b py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded" 
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.quantity} × {item.price}€
                    {item.discount && ` (-${item.discount}%)`}
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold">
                {(
                  item.price * 
                  (item.discount ? (1 - item.discount / 100) : 1) * 
                  item.quantity
                ).toFixed(2)}€
              </p>
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total :</h2>
            <p className="text-2xl font-bold text-blue-600">{total}€</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/client/home")}
          className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Passer  commande
        </button>
      </div>
    </div>
  );
};

export default Commande;