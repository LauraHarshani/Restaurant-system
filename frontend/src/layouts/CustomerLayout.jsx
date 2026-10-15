
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1e1e1e] font-sans text-white selection:bg-[#ff6b00] selection:text-white">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
