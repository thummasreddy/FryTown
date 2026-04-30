import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../../assets/Brand_FryTown.png';

const actionLinks = [
  { name: 'See the Menu', to: '/menu/classic' },
  { name: 'Build Your Fries', to: '/menu/build-your-fries' },
  { name: 'View Offers', to: '/promotions/offers' },
];

const footerLinks = [
  {
    title: 'Menu',
    links: [
      { name: 'Classic Fries', to: '/menu/classic' },
      { name: 'Specialty Fries', to: '/menu/specialty' },
      { name: 'Drinks', to: '/menu/drinks' },
      { name: 'Dips', to: '/menu/dips' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Promotions', to: '/promotions/combos' },
      { name: 'Franchising', to: '/franchising/why' },
      { name: 'Sign Up', to: '/account/register' },
    ],
  },
  {
    title: 'Plan Ahead',
    links: [
      { name: 'Build Your Fries', to: '/menu/build-your-fries' },
      { name: 'Current Offers', to: '/promotions/offers' },
      { name: 'Login', to: '/account/login' },
      { name: 'Franchise Info', to: '/franchising/apply' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo} aria-label="FryTown Home">
            <img
              src={logo}
              alt="FryTown Logo"
              className={styles.logoImage}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className={styles.slogan}>
            Crispy fries, bold flavors, and easy add-ons for snack runs, combo meals, and shareable cravings.
          </p>
          <div className={styles.socialIcons}>
            {actionLinks.map((link) => (
              <Link key={link.name} to={link.to} className={styles.socialLink}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title} className={styles.linksSection}>
            <h3>{section.title}</h3>
            <ul className={styles.linksList}>
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.to}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.copyright}>
        <p>Copyright {new Date().getFullYear()} FryTown. All rights reserved.</p>
      </div>
    </footer>
  );
}
