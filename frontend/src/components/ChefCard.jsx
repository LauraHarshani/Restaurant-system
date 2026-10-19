import { Link } from "react-router-dom";
import { ArrowRight, Clock, Flame } from "lucide-react";

export default function ChefCard({ chef }) {
  return (
    <div className="bg-[#120D0B] rounded-2xl overflow-hidden group flex flex-col border border-white/5">
      <div className="h-80 overflow-hidden relative">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
        />
      </div>

      <div className="p-7 flex flex-col flex-1">
        <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
          {chef.title}
        </p>
        <h3 className="text-white font-display text-[26px] font-bold mb-3 leading-none">{chef.name}</h3>
        <p className="text-[#A8A29E] text-[13px] mb-8 leading-relaxed flex-1 font-light">{chef.bio}</p>

        <div className="flex items-center gap-2.5 text-[#A8A29E] text-[11px] mb-3">
          <Clock size={13} className="text-gray-500" />
          <span>{chef.shift}</span>
        </div>

        <div className="flex items-center gap-2.5 text-[#A8A29E] text-[11px] mb-6">
          <Flame size={13} className="text-[#D97736]" />
          <span>{chef.specialty}</span>
        </div>

        <div className="pt-5 border-t border-white/10 mt-auto">
          <Link
            to={"/chefs/" + chef.id}
            className="text-[#D97736] text-[12px] font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all w-fit"
          >
            Meet the chef <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
