import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { NAV_ITEMS, type NavGroup } from "./navbar.data";
import brandLogo from "../../../assets/Brand_FryTown.png";
import MobileMenu from "./MobileMenu";
import Cart from "../../Cart/Cart";
import styles from "./Navbar.module.css";

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
    const onMouseDown = (event: MouseEvent) => {
      if (!ref.current || !(event.target instanceof Node)) return;
      if (!ref.current.contains(event.target)) handler();
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler]);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleHomeClick = (event: React.MouseEvent) => {
    if (location.pathname !== "/") {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.navShell}>
        <Link to="/" className={styles.brand} aria-label="Go to home" onClick={handleHomeClick}>
          <img className={styles.brandLogo} src={brandLogo} alt="" aria-hidden="true" />
        </Link>

        <button
          className={styles.hamburger}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <FaBars aria-hidden="true" />
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!hasChildren) {
    return (
      <li className={styles.navItem}>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""} ${item.label === "Account" ? styles.accountLink : ""}`
          }
          to={item.to || "#"}
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
        to={item.to || "#"}
        className={({ isActive }) =>
          `${styles.link} ${styles.linkBtn} ${isActive ? styles.active : ""} ${item.label === "Account" ? styles.accountLink : ""}`
        }
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          setOpen((value) => !value);
        }}
      >
        {item.label === "Account" ? (
          <>
            <UserIcon showText={false} />
            <FaChevronDown className={styles.dropdownArrow} aria-hidden="true" />
          </>
        ) : (
          <>
            {item.label}
            <FaChevronDown className={styles.dropdownArrow} aria-hidden="true" />
          </>
        )}
      </NavLink>

      {open && (
        <div className={styles.dropdown} role="menu" aria-label={`${item.label} submenu`}>
          {item.children!.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) => `${styles.dropdownLink} ${isActive ? styles.active : ""}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
}
