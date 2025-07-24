import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define product type to match your product structure
export type ProductType = {
  id: number;
  name: string;
  description: string;
  Ingredients: string;
  price: number;
  weight: string;
  category: string;
  mainCategory: string;
  type: string;
  image: {
    main: string;
    images?: string[];
  };
};

// Define the context shape
type CartContextType = {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize cart from localStorage if exists
  const [cart, setCart] = useState<ProductType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const addToCart = (product: ProductType) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) return prevCart; // avoid duplicates
      return [...prevCart, product];
    });
  };

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
