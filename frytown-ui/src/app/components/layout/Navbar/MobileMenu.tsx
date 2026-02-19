import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from './navbar.data';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles['mobile-menu-overlay']} onClick={onClose}>
      <div className={styles['mobile-menu']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['close-button']} onClick={onClose}>
          ×
        </button>
        <nav className={styles['mobile-nav']}>
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className={styles['nav-group']}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `${styles['nav-link']} ${styles['main-link']} ${isActive ? styles.active : ''}`
                  }
                  onClick={onClose}
                >
                  {item.label}
                </NavLink>
              ) : (
                <div className={`${styles['nav-link']} ${styles['main-link']}`}>{item.label}</div>
              )}
              {item.children && (
                <div className={styles['sub-nav']}>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to!}
                      className={({ isActive }) => 
                        `${styles['nav-link']} ${styles['sub-link']} ${isActive ? styles.active : ''}`
                      }
                      onClick={onClose}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}