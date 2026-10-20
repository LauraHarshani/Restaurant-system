import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import FoodCard from "../components/FoodCard";
import { Search, UtensilsCrossed } from "lucide-react";

const homeFeaturedDishes = [
  {
    id: "home-featured-1",
    name: "The Blaze Classic Burger",
    description: "Flame-seared beef, melted cheddar, and our smoky house sauce.",
    price: 1900,
    category: "Burgers",
    image: "/Images/food 2.jpeg",
    available: true,
    featured: false,
  },
  {
    id: "home-featured-2",
    name: "Wood-Fired Glazed Wings",
    description: "Tender wings coated in a sticky, smoky signature glaze.",
    price: 1200,
    category: "Wings",
    image: "/Images/food 4.jpeg",
    available: true,
    featured: false,
  },
  {
    id: "home-featured-3",
    name: "Wood-Fired Supreme Pizza",
    description: "A crisp, blistered crust topped with our generous supreme mix.",
    price: 2500,
    category: "Pizza",
    image: "/Images/food 5.jpeg",
    available: true,
    featured: false,
  },
  {
    id: "home-featured-4",
    name: "The Volcano Double Burger",
    description: "Two juicy beef patties layered with bold, fiery flavor.",
    price: 2200,
    category: "Burgers",
    image: "/Images/food1.jpeg",
    available: true,
    featured: false,
  },
];

export default function Menu() {
  const { menuItems } = useMenu();
  const [activeCategory, setActiveCategory] = useState("All dishes");
  const [search, setSearch] = useState("");

  const categories = ["All dishes", "Burgers", "Pizza", "Wings"];

  const filtered = [...menuItems, ...homeFeaturedDishes].filter((item) => {
    const matchCat = activeCategory === "All dishes" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#120D0B] text-[#F5F2EB] min-h-screen">
      <section className="relative flex min-h-[420px] justify-center overflow-hidden px-5 text-center sm:min-h-[480px]">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <video
            src="/Videos/restaurant-background4.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#120D0B]" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 sm:pt-36">
          <h1 className="mb-4 font-display text-5xl font-bold leading-tight tracking-wide text-[#F5F2EB] md:text-7xl">
            From our flame to your table.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-200 sm:text-lg">
            Browse the menu, find your favourites and make it a feast. Freshly prepared. Always served.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#D97736]">
            <span className="w-1.5 h-1.5 bg-[#D97736] rounded-full animate-pulse"></span>
            <span>Open Daily: 12pm  11pm</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="font-display text-3xl font-bold flex items-center gap-3">
            <UtensilsCrossed size={24} className="text-[#D97736]" /> Our Menu
          </h2>
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1A1310] border border-white/10 text-white pl-11 pr-4 py-2.5 rounded-full text-[13px] focus:outline-none focus:border-[#D97736] transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  "px-5 py-2 rounded-full text-[13px] font-medium transition " +
                  (activeCategory === cat
                    ? "bg-[#D97736] text-white"
                    : "bg-transparent text-[#A8A29E] hover:text-white border border-transparent hover:border-white/20")
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-[#A8A29E] text-[12px] font-medium">
            All dishes  {filtered.length} favourites from the flame
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-[#1A1310]">
            <p className="text-[#A8A29E] text-lg mb-2">No dishes found.</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or category filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}
