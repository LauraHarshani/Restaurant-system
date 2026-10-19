import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { ChefProvider } from "./context/ChefContext";
import { MenuProvider } from "./context/MenuContext";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Customer & Public Pages 
import Home from './pages/Home';
import About from './pages/About';
import Chefs from './pages/Chefs';
import ChefDetails from './pages/ChefDetails';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAbout from './pages/admin/AdminAbout';
import AdminMessages from './pages/admin/AdminMessages';
import AdminContact from './pages/admin/AdminContact';
import ChefManagement from "./pages/admin/ChefManagement";
import AddChef from "./pages/admin/AddChef";
import MenuManagement from "./pages/admin/MenuManagement";
import AddDish from "./pages/admin/AddDish";
import OrderManagement from "./pages/admin/OrderManagement";
import CreateOrder from "./pages/admin/CreateOrder";


function App() {
  return (
    <ChefProvider>
      <MenuProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin Login */}
              <Route path='/admin/login' element={<AdminLogin/>}/>
              {/* Customer Layout */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/chefs" element={<Chefs />} />
                <Route path="/chefs/:id" element={<ChefDetails />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Order />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
              </Route>

              {/* Admin Layout */}
              <Route path='/admin' element={<AdminLayout/>}>
                <Route path='dashboard' element={<AdminDashboard/>}/>
                <Route path='home' element={<AdminHome/>}/>
                <Route path='about' element={<AdminAbout/>}/>
                <Route path='messages' element={<AdminMessages/>}/>
                <Route path='edit-contact' element={<AdminContact/>}/>
                <Route path='chefs' element={<ChefManagement/>}/>
                <Route path='chefs/add' element={<AddChef/>}/>
                <Route path='chefs/edit/:id' element={<AddChef/>}/>
                <Route path='menu' element={<MenuManagement/>}/>
                <Route path='menu/add' element={<AddDish/>}/>
                <Route path='menu/edit/:id' element={<AddDish/>}/>
                <Route path='orders' element={<OrderManagement/>}/>
                <Route path='orders/create' element={<CreateOrder/>}/>
              </Route>

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </MenuProvider>
    </ChefProvider>
  );
}

export default App;