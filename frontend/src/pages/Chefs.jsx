import { useChefs } from "../context/ChefContext";
import ChefCard from "../components/ChefCard";
import { Link } from "react-router-dom";

export default function Chefs() {
  const { chefs } = useChefs();

  return (
    <div className="bg-[#120D0B] min-h-screen">
      <section className="relative flex min-h-[420px] justify-center overflow-hidden px-5 text-center sm:min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600"
          alt="Chefs Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B]/80 via-[#120D0B]/60 to-[#120D0B]"></div>
        
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 sm:pt-36">
          <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-wide text-[#F5F2EB] md:text-7xl">
            Our Chefs
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
            Meet the hands and hearts behind our wood-fired perfection.
          </p>
        </div>
      </section>

      <section className="bg-[#120D0B] pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] mb-3 uppercase">
                FIRE, CRAFT, PASSION
              </p>
              <h2 className="font-display text-4xl md:text-[44px] font-bold text-[#F5F2EB] leading-tight">
                A shared passion. A distinct craft.
              </h2>
            </div>
            <p className="text-[#A8A29E] text-[13px] max-w-[280px] md:text-right leading-relaxed">
              One kitchen. Three perspectives. Every plate, made with soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120D0B] pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-[#1A1310] rounded-2xl overflow-hidden grid md:grid-cols-2 border border-white/5">
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800"
                alt="Fire"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1310] hidden md:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1310] to-transparent md:hidden"></div>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center relative z-10">
              <p className="text-[#D97736] text-[10px] font-bold tracking-[0.25em] mb-3 uppercase">
                NO SHORTCUTS. JUST SOUL.
              </p>
              <h3 className="font-display text-3xl md:text-[32px] font-bold text-[#F5F2EB] mb-4 leading-tight">
                Great food starts long before the flame.
              </h3>
              <p className="text-[#A8A29E] mb-8 leading-relaxed text-[13px]">
                Heritage grains. Seasonal produce. Dough that ferments for 48 hours. Our chefs respect the ingredients, then let the fire do what only fire can.
              </p>
              <Link to="/menu" className="bg-[#D97736] hover:bg-[#c0692d] text-white text-[13px] font-medium px-6 py-2.5 rounded-lg transition w-fit">
                Explore our menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
