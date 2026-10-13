import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component[cite: 20]
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home'; // Import Home page[cite: 20]
import About from './pages/About'; // Import About page[cite: 20]
import Chefs from './pages/Chefs'; // Import Chefs page[cite: 20]
import Order from './pages/Order'; // Import Order page[cite: 20]
import Contact from './pages/Contact'; // Import Contact page[cite: 20]

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is placed outside Routes so it appears on every page[cite: 20] */}
      <Navbar /> 
      
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<Home />} />[cite: 20]
        <Route path="/about" element={<About />} />[cite: 20]
        <Route path="/chefs" element={<Chefs />} />[cite: 20]
        <Route path="/order" element={<Order />} />[cite: 20]
        <Route path="/contact" element={<Contact />} />[cite: 20]
      </Routes>

      {/* Footer is placed outside Routes so it appears on every page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;