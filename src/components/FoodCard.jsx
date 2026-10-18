import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FoodCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-flame-dark rounded-2xl overflow-hidden group border border-white/5">
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        {item.featured && item.available && (
          <span className="absolute top-3 left-3 bg-[#D97736] text-white text-[11px] px-3 py-1 rounded-md font-medium">
            Most loved
          </span>
        )}
        {!item.available && (
          <span className="absolute top-3 left-3 bg-gray-700 text-gray-300 text-[11px] px-3 py-1 rounded-md font-medium">
            Unavailable
          </span>
        )}
      </div>

      <div className="p-6">
        <p className="text-[#D97736] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
          {item.category}
        </p>
        <h3 className="text-white font-display text-[22px] font-bold mb-2">
          {item.name}
        </h3>
        <p className="text-[#A8A29E] text-[13px] mb-6 font-light">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[#F5F2EB] font-medium">
            Rs. {item.price}.00
          </span>
          
          {item.available ? (
            <button
              onClick={() => addToCart(item)}
              className="bg-[#D97736] hover:bg-[#c0692d] text-white p-2.5 rounded-lg transition active:scale-95"
              title="Add to cart"
            >
              <Plus size={18} />
            </button>
          ) : (
            <span className="text-gray-500 text-xs font-medium px-3 py-1 bg-white/5 rounded-md">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
