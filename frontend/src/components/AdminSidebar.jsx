import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Home, UtensilsCrossed, ShoppingBag, Info, ChefHat, MessageSquare, User, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Home", path: "/admin/home", icon: Home },
    { name: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "About", path: "/admin/about", icon: Info },
    { name: "Chefs", path: "/admin/chefs", icon: ChefHat },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare }
  ];
  
  const handleLogout = () => { localStorage.removeItem("adminToken"); navigate("/admin/login"); };
  
  return (
    <aside className="w-[240px] bg-[#1C1917] text-gray-400 min-h-screen flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-[#F97316]"></span>
          <span className="font-display text-[18px] font-bold text-white">Flame <span className="text-[#F97316]">&</span> Crust</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => { 
          const Icon = link.icon; 
          return (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition " + (isActive ? "bg-white/5 text-[#F97316]" : "hover:bg-white/5 hover:text-white")}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-[#F97316]" : "text-gray-400"} />
                  {link.name}
                </>
              )}
            </NavLink>
          ); 
        })}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-1">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium w-full hover:bg-white/5 hover:text-white transition">
          <User size={18} />Profile
        </button>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium w-full text-red-400 hover:bg-red-500/10 transition">
          <LogOut size={18} />Logout
        </button>
      </div>
    </aside>
  );
}
