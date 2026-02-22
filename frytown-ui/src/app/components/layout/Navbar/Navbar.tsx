import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS, type NavGroup } from "./navbar.data";
import brandLogo from "../../../assets/Brand_FryTown.png";
import MobileMenu from "./MobileMenu";
import Cart from "../../Cart/Cart";
import styles from "./Navbar.module.css";

// User icon component with screen reader text
const UserIcon = ({ showText = true }: { showText?: boolean }) => (
  <div className={styles.userIconWrapper}>
    <svg 
      className={styles.userIcon} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    {showText && <span className={styles.visuallyHidden}>Account</span>}
  </div>
);

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current || !(e.target instanceof Node)) return;
      if (!ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler]);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.navShell}>
        <Link 
          to="/" 
          className={styles.brand} 
          aria-label="Go to home"
          onClick={handleHomeClick}
        >
          <img className={styles.brandLogo} src={brandLogo} alt="" aria-hidden="true" />
        </Link>

        <button
          className={styles.hamburger}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
        
        <Cart />
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function DesktopNavItem({ item }: { item: NavGroup }) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);

  useClickOutside(wrapRef, () => setOpen(false));

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!hasChildren) {
    return (
      <li className={styles.navItem}>
        <NavLink 
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''} ${item.label === 'Account' ? styles.accountLink : ''}`} 
          to={item.to || '#'}
          aria-label={item.label === "Account" ? "Account" : undefined}
          end
        >
          {item.label === "Account" ? <UserIcon showText={false} /> : item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className={styles.navItem} ref={wrapRef}>
      <NavLink
        to={item.to || '#'}
        className={({ isActive }) => `${styles.link} ${styles.linkBtn} ${isActive ? styles.active : ''} ${item.label === 'Account' ? styles.accountLink : ''}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {item.label === 'Account' ? (
          <>
            <UserIcon showText={false} />
            <span className={styles.dropdownArrow} aria-hidden="true">▾</span>
          </>
        ) : (
          <>
            {item.label} <span className={styles.dropdownArrow} aria-hidden="true">▾</span>
          </>
        )}
      </NavLink>

      {open && (
        <div className={styles.dropdown} role="menu" aria-label={`${item.label} submenu`}>
          {item.children!.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.active : ''}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {c.label}
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
}

