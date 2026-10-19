import { Plus } from "lucide-react";
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
    <div className="bg-[#1A1310] rounded-xl overflow-hidden group border border-white/5 flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
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

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-white font-display text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-[#A8A29E] text-[12px] mb-4 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#F5F2EB] font-bold text-[15px]">
            Rs. {item.price}.00
          </span>
          
          {item.available ? (
            <button
              onClick={() => addToCart(item)}
              className="bg-[#D97736] hover:bg-[#c0692d] text-white text-[12px] font-medium px-4 py-1.5 rounded-lg transition active:scale-95 flex items-center gap-1"
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
    </div>
  );
}
