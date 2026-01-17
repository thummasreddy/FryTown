import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_ITEMS, NavGroup } from "./navbar.data";

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) handler();
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

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="Go to home">
          FryTown
        </Link>

        <button
          className="hamburger"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true">☰</span>
        </button>

        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      </div>

      <MobileMenu open={mobileOpen} />
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
      <li className="nav-item">
        <NavLink className={({ isActive }) => (isActive ? "link active" : "link")} to={item.to!}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="nav-item" ref={wrapRef}>
      <button
        type="button"
        className="link link-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label} <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="dropdown" role="menu" aria-label={`${item.label} submenu`}>
          {item.children!.map((c) => (
            <NavLink
              key={c.to}
              to={c.to}
              className="dropdown-link"
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

function MobileMenu({ open }: { open: boolean }) {
  const items = useMemo(() => NAV_ITEMS, []);

  return (
    <div id="mobile-menu" className={open ? "mobile open" : "mobile"} aria-hidden={!open}>
      <nav aria-label="Mobile primary">
        <ul className="mobile-list">
          {items.map((item) => (
            <MobileNavItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileNavItem({ item }: { item: NavGroup }) {
  const hasChildren = !!item.children?.length;
  const [expanded, setExpanded] = useState(false);

  if (!hasChildren) {
    return (
      <li className="mobile-item">
        <NavLink className="mobile-link" to={item.to!}>
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="mobile-item">
      <button
        type="button"
        className="mobile-link mobile-accordion"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>{item.label}</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>

      {expanded && (
        <ul className="mobile-sub">
          {item.children!.map((c) => (
            <li key={c.to}>
              <NavLink className="mobile-sublink" to={c.to}>
                {c.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
