import { Link } from 'react-router-dom'; // Using Link for footer navigation links

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Top section with 4 columns */}
      <div style={styles.topContainer}>
        
        {/* Column 1: Brand Logo and Description */}
        <div style={styles.brandColumn}>
          <div style={styles.logoContainer}>
            <span>🔥</span>
            <span style={styles.logoText}>
              Flame <span style={styles.logoOrange}>&Crust</span>
            </span>
          </div>
          <p style={styles.brandDescription}>
            Where urban fire meets gourmet craft. Born in flame, served with soul.
          </p>
        </div>

        {/* Column 2: Explore Links */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>EXPLORE</h4>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.footerLink}>• Home</Link></li>
            <li><Link to="/about" style={styles.footerLink}>• About</Link></li>
            <li><Link to="/order" style={styles.footerLink}>• Menu</Link></li>
            <li><Link to="/chefs" style={styles.footerLink}>• Chefs</Link></li>
            <li><Link to="/contact" style={styles.footerLink}>• Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Visit Info */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>VISIT</h4>
          <p style={styles.text}>123 Road</p>
          <p style={styles.text}>Colombo 03.</p>
          <p style={styles.textSpacing}>+94 11 234 5678</p>
          <p style={styles.text}>hello@flameandcrust.lk</p>
        </div>

        {/* Column 4: Follow Us and Timing */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>FOLLOW</h4>
          <div style={styles.socialIcons}>
            {/* Facebook Icon */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.iconCircle}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            {/* Instagram Icon */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.iconCircle}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* X (Twitter) Icon */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.iconCircle}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          <p style={styles.timingText}>Open daily · 12pm - 12am</p>
        </div>

      </div>

      {/* Divider Line */}
      <hr style={styles.divider} />

      {/* Bottom Copyright Section */}
      <div style={styles.bottomContainer}>
        <p style={styles.copyrightText}>© 2026 Flame & Crust. All rights reserved.</p>
        <p style={styles.craftText}>Crafted with fire.</p>
      </div>
    </footer>
  );
};

// Styles Section for the Footer matching exact Figma design
const styles = {
  footer: {
    backgroundColor: '#100202', // Exact background color code from Figma design
    color: '#ffffff',
    padding: '60px 50px 20px 50px',
    fontFamily: '"Playfair Display", Georgia, serif',
    borderTop: '1px solid #222'
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '40px'
  },
  brandColumn: {
    maxWidth: '300px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  logoOrange: {
    color: '#ff6b00'
  },
  brandDescription: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#b3b3b3'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  columnTitle: {
    fontSize: '14px',
    letterSpacing: '1px',
    marginBottom: '10px',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  linkList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: 0
  },
  footerLink: {
    content: 'none',
    color: '#b3b3b3',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s'
  },
  text: {
    fontSize: '14px',
    color: '#b3b3b3',
    margin: 0
  },
  textSpacing: {
    fontSize: '14px',
    color: '#b3b3b3',
    margin: '10px 0'
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px'
  },
  iconCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#261912', // Styled circular background for icons
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'background-color 0.3s'
  },
  timingText: {
    fontSize: '13px',
    color: '#b3b3b3'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #261912',
    marginBottom: '20px'
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#888888'
  },
  copyrightText: {
    margin: 0
  },
  craftText: {
    margin: 0
  }
};

export default Footer;