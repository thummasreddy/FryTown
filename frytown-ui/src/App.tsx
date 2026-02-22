import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "./app/components/layout/Navbar/Navbar";
import AppRoutes from "./app/routes/AppRoutes";
import { CartProvider } from "./app/context/CartContext";

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <Navbar />
      <AppRoutes />
    </CartProvider>
  );
}
