import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductsData from "../data/data";

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const product = ProductsData[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ProductsData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.6 } }}
          className="relative z-10 container mx-auto px-6 py-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between h-full"
        >
          {/* Left Text Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <p className="text-orange-700 font-medium text-lg mb-2 uppercase tracking-wider">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-orange-900 leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-gray-700 text-lg mb-6 max-w-xl">
              {product.description}
            </p>

            <div className="text-xl font-semibold text-orange-800 mb-4">
              Rs. {product.price}
            </div>

            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
              <span className="text-gray-600">({product.rating})</span>
            </div>

            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg transition font-bold">
              Order Now
            </button>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center items-center"
          >
            <img
              src={product.image.main}
              alt={product.name}
              className="w-[300px] md:w-[400px] lg:w-[500px] h-auto object-contain rounded-3xl drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setIndex(
              (prev) => (prev - 1 + ProductsData.length) % ProductsData.length
            )
          }
          className="bg-white/70 hover:bg-white text-orange-600 font-bold px-5 py-2 rounded-full shadow"
        >
          Prev
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIndex((prev) => (prev + 1) % ProductsData.length)}
          className="bg-white/70 hover:bg-white text-orange-600 font-bold px-5 py-2 rounded-full shadow"
        >
          Next
        </motion.button>
      </div>
    </section>
  );
}
