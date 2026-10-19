import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const links = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Menu", path: "/menu" }, { name: "Chefs", path: "/chefs" }, { name: "Contact", path: "/contact" }];

  return (
    <nav className="bg-flame-darker text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2"><span className="text-2xl"></span><span className="font-display text-xl font-bold">Flame <span className="text-flame-orange">&</span> Crust</span></Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (<NavLink key={link.name} to={link.path} className={({ isActive }) => "text-sm font-medium transition " + (isActive ? "text-flame-orange" : "text-gray-300 hover:text-white")}>{link.name}</NavLink>))}
        </div>
        <button className="relative p-2 hover:text-flame-orange transition">
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="absolute top-0 right-0 bg-flame-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
