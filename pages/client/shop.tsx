import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const products = [
  { id: 1, name: "Fer à Béton 12mm", price: 120, image: "/Fer à Béton.jpg" },
  { id: 2, name: "Plaque Acier 2m²", price: 250, image: "/Plaque Acier.jpg" },
  { id: 3, name: "Tôle Galvanisée 1.5mm", price: 180, image: "/Tôle Galvanisée.jpg" },
  { id: 4, name: "Tube Carré 40x40", price: 220, image: "/Tube Carré.jpg" },
  { id: 5, name: "Poutrelle IPN 200", price: 500, image: "/Poutrelle IPN.ipg.jpg" },
  { id: 6, name: "Bobine Fil d’Acier 1.2mm", price: 75, image: "/Bobine Fil d’Acier.jpg" },
];


const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(cart.map((item) => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    router.push({
      pathname: "/client/commande",
      query: { cart: JSON.stringify(cart), total: getTotalPrice() }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* Contenu Principal */}
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Contenu Principal avec Scroll */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto flex">
          {/* Liste des produits */}
          <div className="w-3/4 pr-6">
            <h1 className="text-2xl font-bold mb-4">Boutique</h1>
            <p>Bienvenue dans la boutique en ligne !</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 shadow rounded">
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-600">Prix: {product.price}€</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Panier (Chariot) */}
          <div className="w-1/4 bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">🛒 Panier</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600 mt-2">Votre panier est vide.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="border-b py-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Prix: {item.price}€</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500">🗑</button>
                    </div>
                  </div>
                ))}
                <p className="text-lg font-bold mt-4">Total: {getTotalPrice()}€</p>
                <button
                  onClick={proceedToCheckout}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                >
                  Passer commande
                </button>
              </>
            )}
          </div>
        </main>

        {/* Footer Fixé en Bas */}
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
