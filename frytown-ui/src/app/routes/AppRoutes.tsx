import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Franchising from "../pages/Franchising/Franchising";
import Promotions from "../pages/Promotions/Promotions";
import Menu from "../pages/Menu/Menu";
import Account from "../pages/Account/Account";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
import ForgotPassword from "../pages/Account/ForgotPassword";

// Layout component for nested routes
const NestedLayout = () => (
  <div className="nested-route">
    <Outlet />
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Menu Routes */}
      <Route path="/menu" element={<NestedLayout />}>
        <Route index element={<Menu />} />
        <Route path="fries" element={<Menu initialTab="classic" />} />
        <Route path="classic" element={<Menu initialTab="classic" />} />
        <Route path="specialty" element={<Menu initialTab="specialty" />} />
        <Route path="build-your-fries" element={<Menu initialTab="build-your-fries" />} />
        <Route path="dips" element={<Menu initialTab="dips" />} />
        <Route path="drinks" element={<Menu initialTab="beverages" />} />
        <Route path="beverages" element={<Menu initialTab="beverages" />} />
      </Route>

      {/* Promotions Routes */}
      <Route path="/promotions" element={<NestedLayout />}>
        <Route index element={<Promotions />} />
        <Route path="combos" element={<Promotions initialTab="combos" />} />
        <Route path="offers" element={<Promotions initialTab="offers" />} />
      </Route>

      {/* Franchising Routes */}
      <Route path="/franchising" element={<NestedLayout />}>
        <Route index element={<Franchising />} />
        <Route path="why" element={<Franchising initialTab="why" />} />
        <Route path="investment" element={<Franchising initialTab="investment" />} />
        <Route path="apply" element={<Franchising initialTab="apply" />} />
      </Route>

      {/* Account Routes */}
      <Route path="/account" element={<NestedLayout />}>
        <Route index element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
