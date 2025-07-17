import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    title: "TRADITIONAL MANGO PICKLE",
    subtitle: "01",
    brand: "Pahur Homemade Pickle",
    description:
      "Tangy, spicy, and bursting with flavor, our mango pickle is made from handpicked raw mangoes and a blend of aromatic spices. Perfect to add a punch to your meals.",
    cta: "Discover Our Pickles",
    textColor: "text-yellow-800",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    image: "/images/mango-pickle.png",
    background: "/images/pickle-bg.jpg",
  },
  {
    id: 2,
    title: "NATURAL APPLE CIDER VINEGAR",
    subtitle: "02",
    brand: "Pahur Pure Vinegar",
    description:
      "Crafted from the finest apples, our apple cider vinegar is raw, unfiltered, and packed with natural goodness. Ideal for dressings, detox drinks, and healthy living.",
    cta: "Try Our Vinegar",
    textColor: "text-green-800",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    image: "/images/vinegar-bottle.png",
    background: "/images/vinegar-bg.jpg",
  },
  {
    id: 3,
    title: "FARM FRESH DESI GHEE",
    subtitle: "03",
    brand: "Pahur Pure Ghee",
    description:
      "Made from the milk of grass-fed cows, our desi ghee is rich, aromatic, and perfect for traditional cooking. Experience purity and taste in every spoonful.",
    cta: "Shop Pure Ghee",
    textColor: "text-orange-800",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    image: "/images/ghee-jar.png",
    background: "/images/ghee-bg.jpg",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const product = products[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-orange-50 font-sans">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id + "-bg"}
          initial={{ opacity: 0.8, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 1.5 } }}
          exit={{ opacity: 0.8, scale: 1.05, transition: { duration: 1.2 } }}
          className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-90"
          style={{ backgroundImage: `url(${product.background})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id + "-content"}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            exit={{
              y: -20,
              opacity: 0,
              transition: { duration: 0.5, ease: "easeIn" },
            }}
            className="w-full md:w-[80vw] max-w-xl bg-white/90 p-10 rounded-3xl shadow-2xl border border-orange-100 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-orange-600">
              {product.subtitle}
            </p>
            <h3 className="text-md font-bold text-gray-700 mb-1">
              {product.brand}
            </h3>
            <h1
              className={`text-4xl md:text-5xl font-extrabold ${product.textColor} mb-4`}
            >
              {product.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {product.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-white font-semibold shadow-md transition ${product.buttonColor}`}
            >
              {product.cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.id + "-img"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
              }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.5 } }}
              src={product.image}
              alt={product.title}
              className="max-h-[600px] h-[600px] object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
