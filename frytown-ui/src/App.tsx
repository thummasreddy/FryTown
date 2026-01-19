import Navbar from "./app/components/layout/Navbar/Navbar";
import AppRoutes from "./app/routes/AppRoutes";
import ScrollToTop from "./app/components/ui/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}
