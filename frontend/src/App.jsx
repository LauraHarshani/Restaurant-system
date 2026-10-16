import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from './pages/Home';
import About from './pages/About';
import Chefs from './pages/Chefs';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAbout from './pages/admin/AdminAbout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Admin Login*/}
        <Route path='/admin/login' element={<AdminLogin/>}/>

        {/*Customer Layout*/}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
        </Route>

        {/*Admin Layout*/}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='home' element={<AdminHome/>}/>
          <Route path='about' element={<AdminAbout/>}/>
        </Route>

      </Routes>
        
    </BrowserRouter>
  );
}

export default App;