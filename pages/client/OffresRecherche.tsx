"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import { CartItem, saveCart, loadCart } from "../../lib/cart";

const products = [
  { 
    id: 1, 
    name: "Fer à Béton 12mm", 
    price: 120, 
    discount: 10, 
    category: "Acier", 
    rating: 4.5, 
    image: "/Fer à Béton.jpg",
    description: "Barre d'acier haute résistance pour constructions en béton armé" 
  },
  { 
    id: 2, 
    name: "Plaque Acier 2m²", 
    price: 250, 
    discount: 15, 
    category: "Plaques", 
    rating: 4.2, 
    image: "/Plaque Acier.jpg",
    description: "Plaque d'acier laminé à chaud pour structures métalliques" 
  },
  { 
    id: 3, 
    name: "Tôle Galvanisée 1.5mm", 
    price: 180, 
    discount: 0, 
    category: "Tôles", 
    rating: 4.7, 
    image: "/Tôle Galvanisée.jpg",
    description: "Tôle anticorrosion pour toiture et bardage industriel" 
  },
];

const OffresRecherche = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    discountOnly: false
  });
  const [cart, setCart] = useState<CartItem[]>(loadCart());
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = !filters.price || product.price <= Number(filters.price);
    const matchesRating = !filters.rating || product.rating >= Number(filters.rating);
    const matchesDiscount = !filters.discountOnly || product.discount > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDiscount;
  });

  const handleAddToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      const newCart = existing 
        ? prevCart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
      setShowCartModal(true);
      return newCart;
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if(newQuantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // CORRECTION APPLIQUÉE ICI
  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => 
          total + (item.price * (1 - (item.discount || 0) / 100) * item.quantity),
        0
      )
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed left-0 top-0 h-full w-64 z-50">
        <Sidebar />
      </div>

      <div className="ml-64">
        <div className="fixed top-0 w-[calc(100%-16rem)] bg-white z-30 shadow-sm">
          <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        </div>

        <div className="pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                🔍 Recherche de Produits Métallurgiques
              </h1>

              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <select
                  className="p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">Toutes catégories</option>
                  <option value="Acier">Acier</option>
                  <option value="Plaques">Plaques</option>
                  <option value="Tôles">Tôles</option>
                </select>

                <select
                  className="p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  value={filters.price}
                  onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                >
                  <option value="">Prix maximum</option>
                  <option value="100">100€</option>
                  <option value="200">200€</option>
                  <option value="300">300€</option>
                </select>

                <select
                  className="p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                >
                  <option value="">Note minimum</option>
                  <option value="3">3★</option>
                  <option value="4">4★</option>
                  <option value="4.5">4.5★</option>
                </select>

                <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                    checked={filters.discountOnly}
                    onChange={(e) => setFilters({ ...filters, discountOnly: e.target.checked })}
                  />
                  <span className="text-gray-700">Promotions uniquement</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="p-4 relative">
                      {product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                          -{product.discount}%
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 line-through">{product.price}€</span>
                        <span className="text-2xl font-bold text-red-600">
                          {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>⭐ {product.rating}</span>
                        <span>{product.category}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Votre Panier</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500">Votre panier est vide</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-500">
                          {(item.price * (1 - (item.discount || 0) / 100)).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 ml-4 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 text-xl font-bold text-right">
                  Total: {calculateTotal()}€
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowCartModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Continuer mes achats
                  </button>
                  <button
                    onClick={() => router.push("/client/commande")}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Commander ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OffresRecherche;