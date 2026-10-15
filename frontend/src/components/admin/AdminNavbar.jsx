
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/home": "Home",
  "/admin/menu": "Menu",
  "/admin/orders": "Orders",
  "/admin/about": "About",
  "/admin/chefs": "Chefs",
  "/admin/messages": "Messages",
  "/admin/profile": "Profile",
};

export default function AdminNavbar() {
  const location = useLocation();

  const pageTitle =
    pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
      {/* Current page title */}
      <h1 className="text-xl font-bold text-[#1e1e1e]">
        {pageTitle}
      </h1>

      {/* Right-side actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-black transition hover:bg-gray-100"
        >
          <Bell size={25} strokeWidth={1.8} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-black ring-2 ring-white" />
        </button>

        <div className="h-10 border-l border-gray-200" />

        {/* Admin profile */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/admin/profile";
          }}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#160900] text-base font-semibold text-[#ff6b00]">
            AM
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-black">
              Admin
            </p>
            <p className="mt-0.5 text-xs text-gray-600">
              Administrator
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
