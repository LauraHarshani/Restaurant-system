import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ChefProvider } from "./context/ChefContext";
import { MenuProvider } from "./context/MenuContext";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Chefs from "./pages/Chefs";
import ChefDetails from "./pages/ChefDetails";
import Menu from "./pages/Menu";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
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
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/chefs" element={<Chefs />} />
                <Route path="/chefs/:id" element={<ChefDetails />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Menu />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />

              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/chefs" element={<ChefManagement />} />
                <Route path="/admin/chefs/add" element={<AddChef />} />
                <Route path="/admin/chefs/edit/:id" element={<AddChef />} />
                <Route path="/admin/menu" element={<MenuManagement />} />
                <Route path="/admin/menu/add" element={<AddDish />} />
                <Route path="/admin/menu/edit/:id" element={<AddDish />} />
                <Route path="/admin/orders" element={<OrderManagement />} />
                <Route path="/admin/orders/create" element={<CreateOrder />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </MenuProvider>
    </ChefProvider>
  );
}

export default App;
