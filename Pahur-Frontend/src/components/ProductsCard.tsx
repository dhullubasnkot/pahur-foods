import React from "react";
import { Link } from "react-router-dom";

export type Product = {
  id: number; // changed from string to number
  name: string;
  price: number;
  category: string;
  description: string;
  Ingredients: string;
  rating: number;
  subcategory: string;
  image: {
    main: string;
    images: string[];
  };
};

interface ProductCardProps {
  product: Product;
}

const Badge: React.FC<
  React.PropsWithChildren<{
    className?: string;
    variant?: "secondary" | "outline";
  }>
> = ({ children, className = "", variant }) => {
  const base = "inline-block rounded px-2 py-1 text-xs font-semibold";
  let style = "";

  if (variant === "secondary") {
    style = "bg-orange-600 text-white"; // highlighted tag
  } else if (variant === "outline") {
    style = "border border-orange-400 text-orange-700"; // outlined subtle tag
  } else {
    style = "bg-orange-100 text-orange-700"; // fallback
  }

  return (
    <span
      className={`${base} ${style} ${className}`}
      role="status"
      aria-live="polite"
    >
      {children}
    </span>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200 rounded-md overflow-hidden">
      <Link
        to={`/products/${product.id}`}
        className="block"
        aria-label={`View details for ${product.name}`}
      >
        <div className="p-0">
          <div className="relative overflow-hidden rounded-t-md">
            <img
              src={product.image.main}
              alt={product.name}
              loading="lazy"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <Badge className="absolute top-3 right-3" variant="secondary">
              {product.category}
            </Badge>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>

            {product.subcategory && (
              <Badge variant="outline" className="mb-2 mr-2">
                {product.subcategory}
              </Badge>
            )}

            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-orange-600">
                ₹{product.price}
              </span>
              <span className="text-xs text-gray-400">per unit</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
