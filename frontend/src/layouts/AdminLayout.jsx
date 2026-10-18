import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    // Prevent the whole page from scrolling by setting full screen height and hiding overflow
    <div className="flex h-screen overflow-hidden bg-[#f6f6f6] font-sans text-gray-900">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminNavbar />

        {/* Allow only this main content section to scroll vertically */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}