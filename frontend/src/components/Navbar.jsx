import { NavLink } from 'react-router-dom'; // Using NavLink for active state styling

const Navbar = () => {
  // Function to dynamically change color based on the active route
  const navLinkStyle = ({ isActive }) => {
    return {
      ...styles.link,
      color: isActive ? '#ff6b00' : '#ffffff', // Orange if active, otherwise white
    };
  };

  return (
    <nav style={styles.nav}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <span style={styles.fireIcon}>🔥</span>
        <span style={styles.logoText}>
          Flame <span style={styles.logoOrange}>&Crust</span>
        </span>
      </div>

      {/* Links Section */}
      <div style={styles.linksContainer}>
        <NavLink to="/" style={navLinkStyle}>Home</NavLink>
        <NavLink to="/about" style={navLinkStyle}>About</NavLink>
        <NavLink to="/order" style={navLinkStyle}>Menu</NavLink> 
        <NavLink to="/chefs" style={navLinkStyle}>Chefs</NavLink>
        <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
      </div>

      {/* Cart Section */}
      <div style={styles.cartContainer}>
        <button style={styles.cartButton}>🛒</button>
      </div>
    </nav>
  );
};

// Styles Section
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between', // Distributes space evenly between Logo, Links, and Cart
    alignItems: 'center',
    padding: '25px 50px',
    backgroundColor: 'transparent', // Always transparent as requested
    position: 'fixed', // Keeps it fixed at the top seamlessly over the hero section
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000, // Ensures navbar stays on top of all page content
    boxSizing: 'border-box'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    // Classic serif font family to match the design
    fontFamily: '"Playfair Display", Georgia, serif' 
  },
  logoOrange: {
    color: '#ff6b00' // Orange color for the '&Crust' part
  },
  linksContainer: {
    display: 'flex',
    gap: '70px', // Increased spacing for a balanced look in the middle
  },
  link: {
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    // Font family for the menu links
    fontFamily: '"Playfair Display", Georgia, serif',
    transition: 'color 0.3s ease' // Smooth transition effect for color changes
  },
  cartButton: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    padding: '10px 12px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Navbar;