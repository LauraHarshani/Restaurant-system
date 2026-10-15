import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Chefs from './pages/Chefs';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#1e1e1e] text-white font-serif selection:bg-[#ff6b00] selection:text-white">
        {/* Navbar*/}
        <Navbar />

        {/* Main Content*/}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chefs" element={<Chefs />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
          </Routes>
        </main>

        {/* Footer*/}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;