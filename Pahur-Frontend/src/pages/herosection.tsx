import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full lg:h-[80vh] xl:h-[80vh] h-[100vh] flex items-center justify-center  overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-16"
      >
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <video
            src="/video/pahurvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-[2rem]  w-full max-w-[550px] h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="hidden lg:flex justify-start mb-4">
            <img
              src="/pahurlogo.png"
              alt="Pahur Logo"
              width={150}
              height={75}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 leading-tight mb-6">
            What We Get in Pahur Foods
          </h1>

          <p className="text-gray-700 text-lg max-w-md mx-auto lg:mx-0 mb-8">
            Pure homemade taste made with love and tradition — from flavorful
            pickles to soul-refreshing chiya, Pahur Foods brings authentic
            Nepali flavors straight to your kitchen.
          </p>

          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-300"
          >
            Explore Products
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
//