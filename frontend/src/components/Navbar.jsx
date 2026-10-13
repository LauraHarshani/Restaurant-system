import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  // Function to dynamically style active route
  const navLinkClass = ({ isActive }) =>
    `no-underline text-base font-bold font-serif transition-colors duration-300 ${
      isActive ? 'text-[#ff6b00]' : 'text-white hover:text-[#ff6b00]'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-[50px] py-[22px] bg-[#1e1e1e]/50 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-[28px] font-bold text-white font-logo">
        <span>🔥</span>
        <span>
          Flame <span className="text-[#ff6b00]">&Crust</span>
        </span>
      </div>

      {/* Links Section */}
      <div className="flex items-center gap-6 md:gap-[70px]">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/order" className={navLinkClass}>Menu</NavLink>
        <NavLink to="/chefs" className={navLinkClass}>Chefs</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      </div>

      {/* Cart Section */}
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Shopping Cart"
          className="text-white hover:text-[#ff6b00] cursor-pointer hover:scale-110 transition-all duration-200"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;