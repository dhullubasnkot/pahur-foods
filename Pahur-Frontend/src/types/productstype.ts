export interface Product {
  id: number; // unique product ID
  name: string; // product name
  weight: number;
  price: number; // product price in Rs
  category: string; // main category, e.g., "Pickles", "Ghee"
  subcategory?: string; // optional subcategory, e.g., "Piro", "Regular"
  description: string; // product description
  Ingredients: string; // ingredients list as a string
  rating?: number; // optional rating, default 4 if missing
  image: {
    main: string; // main image URL/path
    images?: string[]; // optional array of additional images
  };
}
