"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import { CartItem, saveCart, loadCart } from "../../lib/cart";

const products = [
  { 
    id: 1, 
    name: "Fer à Béton 12mm", 
    price: 120, 
    image: "/Fer à Béton.jpg", 
    description: "Barre d'acier pour renforcement du béton - Diamètre 12mm",
    category: "Acier",
    rating: 4.5
  },
  { 
    id: 2, 
    name: "Plaque Acier 2m²", 
    price: 250, 
    image: "/Plaque Acier.jpg", 
    description: "Plaque d'acier laminé à chaud - Épaisseur 5mm",
    category: "Plaques",
    rating: 4.2
  },
  { 
    id: 3, 
    name: "Tôle Galvanisée 1.5mm", 
    price: 180, 
    image: "/Tôle Galvanisée.jpg", 
    description: "Tôle anti-corrosion pour toiture et bardage",
    category: "Tôles",
    rating: 4.7
  },
];

const Shop = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(loadCart());
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);

  // Gestion du panier
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (product: CartItem) => {
    const existing = cart.find(item => item.id === product.id);
    const newCart = existing 
      ? cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    updateCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    updateCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Contenu principal */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header onToggle={() => setIsSidebarOpen(!isSidebarOpen)} cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />

        {/* Corps de la page */}
        <div className="p-6">
          <div className="flex gap-6">
            {/* Liste des produits */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6 text-blue-600">Nos Produits Métallurgiques</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-500">{product.category}</span>
                        <div className="flex items-center text-yellow-500">
                          {"★".repeat(Math.floor(product.rating))}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}€</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Ajouter
                        </button>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panier */}
            <div className="w-96 bg-white rounded-xl shadow-md p-4 h-fit sticky top-6">
              <h2 className="text-2xl font-bold mb-4">🛒 Votre Panier</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="border-b py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-500 text-sm">{item.price}€ × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Total:</span>
                      <span className="text-xl font-bold text-blue-600">{calculateTotal()}€</span>
                    </div>
                    <button
                      onClick={() => router.push("/client/commande")}
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Commander ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal des détails du produit */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {selectedProduct.category}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    {"★".repeat(Math.floor(selectedProduct.rating))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <p className="text-3xl font-bold text-blue-600 mb-6">{selectedProduct.price}€</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;