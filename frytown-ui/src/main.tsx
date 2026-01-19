import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "react-router-dom";
import { history } from "./app/utils/history";
import App from "./App";
import "./app/styles/globals.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element #root not found");
}

// Add a global scroll to top function
window.scrollToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

createRoot(rootEl).render(
  <StrictMode>
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  </StrictMode>
);
