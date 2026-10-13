import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#100202] text-white px-6 sm:px-12 pt-14 pb-6 font-sans border-t border-[#222]">
      {/* Top section with 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        
        {/* Column 1: Brand Logo and Description */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-2xl font-bold mb-4 font-logo">
            <span>🔥</span>
            <span>
              Flame <span className="text-[#ff6b00]">&Crust</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#b3b3b3]">
            Where urban fire meets gourmet craft. Born in flame, served with soul.
          </p>
        </div>

        {/* Column 2: Explore Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">EXPLORE</h4>
          <ul className="list-none flex flex-col gap-2 p-0 m-0">
            <li>
              <Link to="/" className="text-sm text-[#b3b3b3] hover:text-[#ff6b00] transition-colors duration-200">
                • Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-[#b3b3b3] hover:text-[#ff6b00] transition-colors duration-200">
                • About
              </Link>
            </li>
            <li>
              <Link to="/order" className="text-sm text-[#b3b3b3] hover:text-[#ff6b00] transition-colors duration-200">
                • Menu
              </Link>
            </li>
            <li>
              <Link to="/chefs" className="text-sm text-[#b3b3b3] hover:text-[#ff6b00] transition-colors duration-200">
                • Chefs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-[#b3b3b3] hover:text-[#ff6b00] transition-colors duration-200">
                • Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Visit Info */}
        <div className="flex flex-col gap-1.5">
          <h4 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">VISIT</h4>
          <p className="text-sm text-[#b3b3b3] m-0">123 Road</p>
          <p className="text-sm text-[#b3b3b3] m-0">Colombo 03.</p>
          <p className="text-sm text-[#b3b3b3] my-2">+94 11 234 5678</p>
          <p className="text-sm text-[#b3b3b3] m-0">hello@flameandcrust.lk</p>
        </div>

        {/* Column 4: Follow Us and Timing */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold tracking-widest text-white mb-2 uppercase">FOLLOW</h4>
          <div className="flex gap-3.5 mb-3">
            {/* Facebook Icon */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#261912] flex items-center justify-center text-white hover:bg-[#ff6b00] transition-colors duration-200"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            {/* Instagram Icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#261912] flex items-center justify-center text-white hover:bg-[#ff6b00] transition-colors duration-200"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* X (Twitter) Icon */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full bg-[#261912] flex items-center justify-center text-white hover:bg-[#ff6b00] transition-colors duration-200"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <p className="text-[13px] text-[#b3b3b3] m-0">Open daily · 12pm - 12am</p>
        </div>

      </div>

      {/* Divider Line */}
      <hr className="border-0 border-t border-[#261912] mb-5" />

      {/* Bottom Copyright Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[13px] text-[#888888] gap-2">
        <p className="m-0">© 2026 Flame & Crust. All rights reserved.</p>
        <p className="m-0">Crafted with fire.</p>
      </div>
    </footer>
  );
};

export default Footer;