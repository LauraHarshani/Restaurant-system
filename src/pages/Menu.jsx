import { useState } from "react";
import { menuItems } from "../data/mockData";
import FoodCard from "../components/FoodCard";
import { Search } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All dishes");
  const [search, setSearch] = useState("");

  const categories = ["All dishes", "Burgers", "Pizza", "Wings"];

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "All dishes" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-flame-darker text-white min-h-screen">
      <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600"
          alt="Menu"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-6">
          <p className="text-flame-orange text-xs tracking-[0.3em] mb-3">
            WOOD-FIRED  FLAME-GRILLED
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            From our flame to your table.
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Browse the menu, find your favourites and make it a feast. Freshly prepared. Always served.
          </p>
          <p className="text-flame-orange text-sm mt-4">Open Daily: 12pm  11pm</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="font-display text-3xl font-bold">Our Menu</h2>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-flame-orange w-64"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                "px-5 py-2 rounded-full text-sm transition " +
                (activeCategory === cat
                  ? "bg-flame-orange text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-xs mb-6">All dishes  4 favourites from the flame</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-20">No dishes found.</p>
        )}
      </section>
    </div>
  );
}
