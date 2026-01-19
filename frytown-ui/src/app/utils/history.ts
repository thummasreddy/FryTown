import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// This will handle scroll to top on route changes
history.listen(() => {
  window.scrollTo(0, 0);
  
  // Additional scroll reset methods
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
});

export default history;
