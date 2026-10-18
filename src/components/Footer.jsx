import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0A0706] text-[#A8A29E] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl text-flame-orange">🔥</span>
            <span className="font-display text-xl font-bold text-white">
              Flame <span className="text-flame-orange">&</span> Crust
            </span>
          </div>
          <p className="text-[13px] leading-relaxed mb-6 font-light">
            Where urban fire meets gourmet craft. Born in flame, served with soul.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">EXPLORE</h4>
          <ul className="space-y-3 text-[13px]">
            <li><Link to="/" className="hover:text-flame-orange transition font-light">Home</Link></li>
            <li><Link to="/about" className="hover:text-flame-orange transition font-light">About</Link></li>
            <li><Link to="/menu" className="hover:text-flame-orange transition font-light">Menu</Link></li>
            <li><Link to="/chefs" className="hover:text-flame-orange transition font-light">Chefs</Link></li>
            <li><Link to="/contact" className="hover:text-flame-orange transition font-light">Contact</Link></li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">VISIT</h4>
          <ul className="space-y-3 text-[13px] font-light">
            <li>123 Food Street</li>
            <li>Colombo 03</li>
            <li>+94 11 234 5678</li>
            <li>hello@flameandcrust.lk</li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="text-[#F5F2EB] font-semibold mb-5 text-[11px] tracking-[0.2em]">FOLLOW</h4>
          <div className="flex gap-4 mb-6">
            {/* Exact SVG icons matching the design */}
            <a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-[#F5F2EB] hover:text-flame-orange transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#A8A29E] font-light">
            <Clock size={14} />
            <span>Open Daily: 12pm – 11pm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#78716C]">
        <span>© 2025 Flame & Crust. All rights reserved.</span>
        <span>Crafted with fire.</span>
      </div>
    </footer>
  );
}
