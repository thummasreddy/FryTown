import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../../assets/Brand_FryTown.png';

const actionLinks = [
  { name: 'Order Menu', to: '/menu/classic' },
  { name: 'Build Your Fries', to: '/menu/build-your-fries' },
  { name: 'Launch Offers', to: '/promotions/offers' },
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
    title: 'Brand',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Promotions', to: '/promotions/combos' },
      { name: 'Franchising', to: '/franchising/why' },
      { name: 'Account', to: '/account/register' },
    ],
  },
  {
    title: 'Launch Notes',
    links: [
      { name: 'Menu Structure', to: '/menu/classic' },
      { name: 'Offer Design', to: '/promotions/offers' },
      { name: 'Franchise Inquiry', to: '/franchising/apply' },
      { name: 'Register Interest', to: '/account/register' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo} aria-label="FryTown Home">
            <img src={logo} alt="FryTown Logo" className={styles.logoImage} />
          </Link>
          <p className={styles.slogan}>
            A fries-first brand with clearer navigation, stronger positioning, and a more launch-ready presentation.
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
