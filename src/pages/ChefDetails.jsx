import { useParams, Link } from "react-router-dom";
import { chefs, menuItems } from "../data/mockData";
import FoodCard from "../components/FoodCard";
import { ArrowLeft, Mail, MapPin, Flame } from "lucide-react";

export default function ChefDetails() {
  const { id } = useParams();
  const chef = chefs.find((c) => c.id === Number(id));

  if (!chef) {
    return (
      <div className="p-20 text-center">
        <p className="text-xl">Chef not found.</p>
        <Link to="/chefs" className="text-flame-orange mt-4 inline-block">
          Back to chefs
        </Link>
      </div>
    );
  }

  const specialties = menuItems.filter((item) => item.chef === chef.name);

  return (
    <div className="bg-flame-darker text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Link
          to="/chefs"
          className="text-gray-400 text-xs flex items-center gap-1 mb-8 hover:text-flame-orange transition"
        >
          Home / Chefs / <span className="text-white">{chef.name}</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <img
            src={chef.image}
            alt={chef.name}
            className="rounded-2xl w-full h-[500px] object-cover"
          />

          <div>
            <p className="text-flame-orange text-xs tracking-[0.3em] mb-3">
              {chef.title}
            </p>
            <h1 className="font-display text-5xl font-bold mb-4">{chef.name}</h1>
            <p className="text-flame-orange italic mb-6">
              A passion for fire. A respect for flavor.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">{chef.bio}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-xs">
                {chef.specialty}
              </span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-xs">
                {chef.specialty}
              </span>
              <span className="bg-gray-800 px-4 py-2 rounded-lg text-xs">
                {chef.shift}
              </span>
            </div>

            <Link
              to="/menu"
              className="bg-flame-orange hover:bg-flame-orange-dark text-white font-medium px-6 py-2.5 rounded-lg transition inline-flex items-center gap-2"
            >
              Discover his signature dishes
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            <div>
              <p className="text-flame-orange text-xs tracking-[0.3em] mb-3">
                IN THE OPEN KITCHEN
              </p>
              <h2 className="font-display text-4xl font-bold">The soul of the kitchen</h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-2xl md:text-3xl font-display italic text-gray-300 leading-relaxed">
                "Fire gives food its character. Our job is to know when to guide it  and when to let it speak."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-gray-800">
            {[
              { n: "01", t: "Respect the ingredient", d: "Heritage grains and ingredients sourced from the traditions of every plate." },
              { n: "02", t: "Trust the process", d: "Our doughs ferment for 48 hours. Good things take time, not shortcuts." },
              { n: "03", t: "Cook with character", d: "Oak, cherry and every wood brings their own voice to the flame." },
            ].map((item) => (
              <div key={item.n}>
                <p className="text-flame-orange text-xs mb-3">{item.n}</p>
                <h4 className="font-display text-lg font-bold text-white mb-2">{item.t}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-flame-orange text-xs tracking-[0.3em] mb-2">
                FROM ARJUN'S KITCHEN
              </p>
              <h2 className="font-display text-3xl font-bold">Signature dishes</h2>
            </div>
            <Link
              to="/menu"
              className="text-flame-orange text-sm border border-flame-orange px-4 py-2 rounded-lg hover:bg-flame-orange hover:text-white transition"
            >
              View full menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialties.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
