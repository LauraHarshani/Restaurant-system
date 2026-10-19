import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden bg-[#120D0B]">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600" alt="Restaurant" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120D0B]/80 via-[#120D0B]/50 to-[#120D0B]"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto mt-10">
          <p className="text-flame-orange text-[10px] font-bold tracking-[0.3em] mb-4 uppercase">THE PEOPLE BEHIND THE FLAME</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#F5F2EB] mb-6 leading-tight">Where fire meets <span className="text-flame-orange">flavor</span></h1>
          <p className="text-[#A8A29E] text-lg mb-8">Meet the hands and hearts behind our wood-fired perfection.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/menu" className="bg-[#D97736] hover:bg-[#c0692d] text-white text-[13px] font-medium px-6 py-2.5 rounded-lg transition">Explore our menu</Link>
            <Link to="/chefs" className="border border-white/20 text-[#F5F2EB] hover:bg-white hover:text-black text-[13px] font-medium px-6 py-2.5 rounded-lg transition">Meet the chefs</Link>
          </div>
        </div>
      </section>
      <section className="bg-[#120D0B] pb-24 pt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-[#1A1310] rounded-2xl overflow-hidden grid md:grid-cols-2 border border-white/5">
            <div className="relative h-64 md:h-auto"><img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800" alt="Fire" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1310] hidden md:block"></div><div className="absolute inset-0 bg-gradient-to-t from-[#1A1310] to-transparent md:hidden"></div></div>
            <div className="p-10 md:p-14 flex flex-col justify-center relative z-10">
              <p className="text-flame-orange text-[10px] font-bold tracking-[0.25em] mb-3 uppercase">NO SHORTCUTS. JUST SOUL.</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F2EB] mb-4 leading-tight">Great food starts long before the flame.</h2>
              <p className="text-[#A8A29E] mb-8 leading-relaxed text-[13px]">Heritage grains. Seasonal produce. Dough that ferments for 48 hours. Our chefs respect the ingredients, then let the fire do what only fire can.</p>
              <Link to="/menu" className="bg-[#D97736] hover:bg-[#c0692d] text-white text-[13px] font-medium px-6 py-2.5 rounded-lg transition w-fit flex items-center gap-2">Explore our menu <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
