import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const isAuth = localStorage.getItem("adminToken");
  if (!isAuth) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AdminHeader />
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
