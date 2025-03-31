// lib/cart.ts
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discount?: number;
    category?: string;
    rating?: number;
    description?: string;
  }
  
  export const saveCart = (cart: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
  export const loadCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };