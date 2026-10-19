import { useParams, Link } from "react-router-dom";
import { useChefs } from "../context/ChefContext";
import { useMenu } from "../context/MenuContext";
import FoodCard from "../components/FoodCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ChefDetails() {
  const { id } = useParams();
  const { chefs } = useChefs();
  const { menuItems } = useMenu();
  const chef = chefs.find((c) => c.id === Number(id));

  if (!chef) {
    return (
      <div className="p-20 text-center bg-[#120D0B] min-h-screen text-white">
        <p className="text-xl">Chef not found.</p>
        <Link to="/chefs" className="text-[#D97736] mt-4 inline-block">Back to chefs</Link>
      </div>
    );
  }

  const specialties = menuItems.filter((item) => item.chef === chef.name);

  return (
    <div className="bg-[#120D0B] text-[#F5F2EB] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        <div className="flex items-center gap-2 text-[11px] text-[#A8A29E] mb-8 font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/chefs" className="hover:text-white transition">Chefs</Link>
          <span>/</span>
          <span className="text-[#D97736]">{chef.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative rounded-xl overflow-hidden group">
            <img
              src={chef.image}
              alt={chef.name}
              className="w-full h-[500px] md:h-[550px] object-cover object-top group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-[11px] text-white/90">
              <span className="text-[#D97736]"></span> Flame & Crust  Colombo 03
            </div>
          </div>

          <div>
            <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
              MEET THE {chef.title.toUpperCase()}
            </p>
            <h1 className="font-display text-5xl md:text-[64px] font-bold mb-4 leading-none">
              {chef.name}
            </h1>
            <p className="text-[#D97736] font-display italic text-lg md:text-xl mb-6">
              "A passion for fire. A respect for flavor."
            </p>
            
            <div className="space-y-4 text-[13px] md:text-sm text-[#A8A29E] leading-relaxed mb-8">
              <p>
                For {chef.name.split(" ")[0]}, cooking begins with curiosity and ends with connection. His kitchen brings together Sri Lankan warmth, seasonal ingredients and an unmistakable character of open flame.
              </p>
              <p>
                As {chef.title}, he guides our team from the first dough of the day to the last sear of the night. His approach is simple: source with care, build every sauce from scratch, and never rush a good thing.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-[11px] text-[#F5F2EB]">
                {chef.specialty}
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-[11px] text-[#F5F2EB]">
                48-hour ferment
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-[11px] text-[#F5F2EB]">
                Wood-fired signatures
              </span>
            </div>

            <Link
              to="/menu"
              className="bg-[#D97736] hover:bg-[#c0692d] text-white text-[13px] font-medium px-6 py-2.5 rounded-lg transition inline-flex items-center gap-2"
            >
              Discover his signature dishes
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#0F0D0C] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                IN THE OPEN KITCHEN
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                The soul of the kitchen
              </h2>
            </div>
            <div>
              <p className="font-display italic text-xl md:text-2xl text-[#A8A29E] leading-relaxed">
                "Fire gives food its character. Our job is to know when to guide it  and when to let it speak."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 pt-10 border-t border-white/10">
            <div>
              <p className="text-[#D97736] text-[11px] font-bold mb-3">01</p>
              <h4 className="font-bold text-[15px] text-[#F5F2EB] mb-3">Respect the ingredient</h4>
              <p className="text-[#A8A29E] text-[13px] leading-relaxed font-light">
                Heritage grains and heirloom produce form the foundation of every plate.
              </p>
            </div>
            <div>
              <p className="text-[#D97736] text-[11px] font-bold mb-3">02</p>
              <h4 className="font-bold text-[15px] text-[#F5F2EB] mb-3">Trust the process</h4>
              <p className="text-[#A8A29E] text-[13px] leading-relaxed font-light">
                Our dough ferments for 48 hours. Good things take time, not shortcuts.
              </p>
            </div>
            <div>
              <p className="text-[#D97736] text-[11px] font-bold mb-3">03</p>
              <h4 className="font-bold text-[15px] text-[#F5F2EB] mb-3">Cook with character</h4>
              <p className="text-[#A8A29E] text-[13px] leading-relaxed font-light">
                Oak, cherry and every wood brings their own voice to the flame.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
              FROM {chef.name.split(" ")[0].toUpperCase()}'S KITCHEN
            </p>
            <h2 className="font-display text-4xl font-bold">Signature dishes</h2>
          </div>
          <Link
            to="/menu"
            className="border border-white/20 text-[#F5F2EB] hover:bg-white hover:text-black text-[12px] px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            View full menu <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {specialties.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        <Link
          to="/chefs"
          className="text-[#A8A29E] hover:text-[#F5F2EB] text-[12px] font-medium flex items-center gap-2 transition w-fit"
        >
          <ArrowLeft size={14} /> Back to all chefs
        </Link>
      </div>
    </div>
  );
}
