import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  const isAuth = localStorage.getItem("adminToken");
  if (!isAuth) return <Navigate to="/admin/login" replace />;
  
  return (
    <div className="flex min-h-screen bg-[#0a0503] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AdminNavbar />
        {/* Meheta bg-white[cite: 20] saha text-gray-900 dunnama hama page ekema yata background eka sudu wewi */}
        <div className="p-8 flex-1 bg-white text-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}