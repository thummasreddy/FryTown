import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Franchising from "../pages/Franchising/Franchising";
import Promotions from "../pages/Promotions/Promotions";
import Menu from "../pages/Menu/Menu";
import Account from "../pages/Account/Account";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/franchising" element={<Franchising />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/menu" element={<Menu />} />

      <Route path="/account" element={<Account />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/account/register" element={<Register />} />
    </Routes>
  );
}
