import { useState } from "react";
import ProductsData from "../data/data";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function Pickel() {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? ProductsData : ProductsData.slice(0, 8);
  const PickelsData = displayedProducts.filter(
    (product) => product.category === "Pickles"
  );

  return (
    <div className="min-h-screen px-4 py-10 bg-orange-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-700">
            Top Pickles in the Town
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Fresh, spicy, and made with love — explore our delicious variety of
            homemade pickles.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PickelsData.map((product) => (
            <Link to={`/pickel/${product.id}`} key={product.id}>
              <div className="bg-white h-[380px] rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 group">
                <img
                  src={product.image.main}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition duration-300"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-orange-700">
                      {product.name}
                    </h3>
                    <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {product.subcategory || "Classic"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mt-3 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={
                          i < (product.rating ?? 4) ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating ?? 4}.0)
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-orange-600">
                      ${product.Price}
                    </span>
                    <button className="text-sm text-orange-700 hover:underline">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!showAll && ProductsData.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition"
            >
              See All Pickles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
