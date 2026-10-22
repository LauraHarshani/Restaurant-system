import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function FoodCard({ item }) {
  const { addToCart } = useCart();

  let badgeText = "";
  let badgeColor = "";
  
  if (item.available) {
    if (item.featured) {
      badgeText = "Most loved";
      badgeColor = "bg-[#D97736] text-white";
    } else if (item.category === "Burgers") {
      badgeText = "Spicy";
      badgeColor = "bg-[#D97736] text-white";
    } else if (item.category === "Pizza") {
      badgeText = "Chef's pick";
      badgeColor = "bg-[#1A1310] text-[#F5F2EB] border border-white/10";
    } else {
      badgeText = "New";
      badgeColor = "bg-[#1A1310] text-[#F5F2EB] border border-white/10";
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#120905] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,81,0,0.4)]"
    >
      <div className="group relative h-56 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        {item.available && badgeText && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md ${badgeColor}`}>
            {badgeText}
          </span>
        )}
        {!item.available && (
          <span className="absolute top-3 left-3 bg-gray-800/80 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
            Unavailable
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-4 h-12 text-lg font-bold text-white">{item.name}</h3>
        <p className="mb-4 line-clamp-2 min-h-8 text-xs text-[#A8A29E]">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-300">
            Rs.{Number(item.price).toFixed(2)}
          </span>
          
          {item.available ? (
            <button
              onClick={() => addToCart(item)}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#d12200] px-5 py-1.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(255,122,0,0.4)] active:scale-95"
            >
              + Add
            </button>
          ) : (
            <span className="text-gray-500 text-[11px] font-medium px-3 py-1.5 bg-white/5 rounded-md">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
