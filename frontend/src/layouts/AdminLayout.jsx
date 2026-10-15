
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f6f6] font-sans text-gray-900">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar />

        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
