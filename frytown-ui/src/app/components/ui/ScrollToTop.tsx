import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that handles scrolling to the top of the page on route changes.
 * Should be placed inside the Router component but outside of any Routes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try multiple methods to ensure scrolling works
    const scrollToTop = () => {
      // Method 1: Standard scroll
      window.scrollTo(0, 0);
      
      // Method 2: Smooth scroll for browsers that support it
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
      
      // Method 3: For older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 4: Scroll the main content area if it exists
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    };

    // Small timeout to ensure DOM is updated
    const timer = setTimeout(scrollToTop, 10);
    
    // Also try scrolling when the component mounts
    scrollToTop();
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
