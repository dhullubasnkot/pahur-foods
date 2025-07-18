import { useParams, Link } from "react-router-dom";
import ProductsData from "../data/data";
import { useState, useEffect } from "react";

type ProductType = {
  id: number;
  name: string;
  description: string;
  Ingredients: string;
  price: number;
  category: string;
  image: {
    main: string;
    images: string[];
  };
};

export default function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const foundProduct = ProductsData.find(
      (item) => item.id === parseInt(id || "0")
    );
    setProduct(foundProduct ?? null);
    setActiveImg(foundProduct?.image.main || "");
  }, [id]);

  if (!product) {
    return <p className="text-center mt-20 text-red-500">Pickle not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-4 mt-4">
            {product.image.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  activeImg === img ? "border-orange-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-700 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="mb-2 text-sm text-gray-500">
              <strong>Ingredients:</strong> {product.Ingredients}
            </p>

            <div className="mt-4 mb-2 flex items-center gap-3">
              <span className="text-3xl font-bold text-orange-600">
                Rs. {product.price}
              </span>
              <span className="text-gray-500 line-through">
                Rs. {product.price + 20}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded-full">
                Save Rs. 20
              </span>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition">
                🛒 Add to Cart
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                🧾 Buy Now
              </button>
            </div>
          </div>
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-5 space-y-3 text-sm text-gray-700">
            <div>
              <strong>Delivery:</strong> Rs. 100 inside town (24–48 hours)
            </div>
            <div>
              <strong>Payment Methods:</strong> eSewa, Khalti, Cash on Delivery
            </div>
            <div>
              <strong>Return Policy:</strong> Within 3 days if sealed
            </div>
            <div>
              <strong>Seller:</strong> Grandma’s Homemade Pickles
            </div>
            <div>
              <strong>Customer Support:</strong>{" "}
              <a
                href="tel:+9779800000000"
                className="text-orange-600 underline"
              >
                9800000000
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-lg font-semibold text-gray-800">Similar Items</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {ProductsData.filter(
            (item) =>
              item.category === product.category && item.id !== product.id
          )
            .slice(0, 4)
            .map((item) => (
              <Link to={`/products/${item.id}`} key={item.id}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
                  <img
                    src={item.image.main}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition duration-300"
                  />
                  <h3 className="text-lg font-semibold text-orange-700 mt-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <span className="text-orange-600 font-bold mt-2 block">
                    Rs. {item.price}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
