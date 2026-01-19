// Extend the Window interface to include our custom scrollToTop function
declare global {
  interface Window {
    scrollToTop: () => void;
  }
}

export {}; // This file needs to be a module
