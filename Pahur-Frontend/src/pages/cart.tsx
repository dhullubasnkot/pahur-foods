import { useCart } from "../context/cartcontext";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your <span className="text-teal-500">Cart</span>
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md flex flex-col items-center"
            >
              <img
                src={item.image?.main}
                alt={item.name}
                className="h-32 w-32 object-contain"
              />
              <h1 className="text-lg font-medium mt-2">{item.name}</h1>
              <p className="text-red-500 text-xl font-bold">Rs. {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Cart };
//