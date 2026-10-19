import { Clock, Share2, Camera, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0A0706] text-[#A8A29E] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div><div className="flex items-center gap-2 mb-4"><span className="text-2xl text-flame-orange"></span><span className="font-display text-xl font-bold text-white">Flame <span className="text-flame-orange">&</span> Crust</span></div><p className="text-[13px] leading-relaxed mb-6 font-light">Where urban fire meets gourmet craft. Born in flame, served with soul.</p></div>
        <div><h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">EXPLORE</h4><ul className="space-y-3 text-[13px]"><li><Link to="/" className="hover:text-flame-orange transition font-light">Home</Link></li><li><Link to="/about" className="hover:text-flame-orange transition font-light">About</Link></li><li><Link to="/menu" className="hover:text-flame-orange transition font-light">Menu</Link></li><li><Link to="/chefs" className="hover:text-flame-orange transition font-light">Chefs</Link></li><li><Link to="/contact" className="hover:text-flame-orange transition font-light">Contact</Link></li></ul></div>
        <div><h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">VISIT</h4><ul className="space-y-3 text-[13px] font-light"><li>123 Food Street</li><li>Colombo 03</li><li>+94 11 234 5678</li><li>hello@flameandcrust.lk</li></ul></div>
        <div><h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">FOLLOW</h4><div className="flex gap-4 mb-6"><a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition"><Share2 size={18} /></a><a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition"><Camera size={18} /></a><a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition"><Send size={18} /></a></div><div className="flex items-center gap-2 text-[13px] text-[#A8A29E] font-light"><Clock size={14} /><span>Open Daily: 12pm  11pm</span></div></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#78716C]"><span> 2025 Flame & Crust. All rights reserved.</span><span>Crafted with fire.</span></div>
    </footer>
  );
}
