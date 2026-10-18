
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  House,
  Utensils,
  ShoppingBag,
  Info,
  ChefHat,
  MessageCircle,
  UserRound,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Home", path: "/admin/home", icon: House },
  { label: "Menu", path: "/admin/menu", icon: Utensils },
  { label: "Orders", path: "/admin/orders", icon: ShoppingBag },
  { label: "About", path: "/admin/about", icon: Info },
  { label: "Chefs", path: "/admin/chefs", icon: ChefHat },
  { label: "Messages", path: "/admin/messages", icon: MessageCircle },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("demoAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <aside className="flex min-h-screen w-[260px] shrink-0 flex-col bg-[#151515] px-3 py-5 text-white">
      {/* Brand */}
      <div className="flex h-[75px] items-start gap-2 px-3 pt-1">
        <span className="text-[30px] leading-none">🔥</span>
        <span className="font-logo text-[21px] font-bold tracking-tight">
          Flame <span className="text-[#ff6b00]">&amp;Crust</span>
        </span>
      </div>

      <div className="mx-2 mb-10 mt-2 border-t border-white/20" />

      {/* Navigation */}
      <nav className="flex-1 space-y-2" aria-label="Admin navigation">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 text-[17px] font-semibold transition-colors ${
                isActive
                  ? "bg-[#2b211b] text-[#ff6b00]"
                  : "text-[#a7a7a7] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={22} strokeWidth={1.9} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="mx-2 mb-1 border-t border-white/20" />

      <div className="space-y-2">
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl px-4 py-3 text-[17px] font-semibold transition-colors ${
              isActive
                ? "bg-[#2b211b] text-[#ff6b00]"
                : "text-white hover:bg-white/5"
            }`
          }
        >
          <UserRound size={22} />
          <span>Profile</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-[17px] font-semibold text-red-500 transition-colors hover:bg-red-500/10"
        >
          <LogOut size={22} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
