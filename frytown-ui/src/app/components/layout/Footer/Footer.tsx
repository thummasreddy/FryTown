import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import logo from '../../../assets/Brand_FryTown.png';

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', url: '#' },
  { name: 'Twitter', icon: 'twitter', url: '#' },
  { name: 'Instagram', icon: 'instagram', url: '#' },
  { name: 'Youtube', icon: 'youtube', url: '#' },
];

const footerLinks = [
  {
    title: 'Menu',
    links: [
      { name: 'Burgers', to: '/menu/burgers' },
      { name: 'Sides', to: '/menu/sides' },
      { name: 'Drinks', to: '/menu/drinks' },
      { name: 'Desserts', to: '/menu/desserts' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', to: '/about' },
      { name: 'Careers', to: '/careers' },
      { name: 'Contact', to: '/contact' },
      { name: 'Locations', to: '/locations' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQs', to: '/faq' },
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
      { name: 'Accessibility', to: '/accessibility' },
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
            />
          </Link>
          <p className={styles.slogan}>
            Serving up crispy, delicious meals since 2023. Join us for an unforgettable flavor experience!
          </p>
          <div className={styles.socialIcons}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={`Follow us on ${social.name}`}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon 
                  icon={
                    social.icon === 'facebook' ? faFacebook :
                    social.icon === 'twitter' ? faTwitter :
                    social.icon === 'instagram' ? faInstagram :
                    faYoutube
                  } 
                />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title} className={styles.linksSection}>
            <h3>{section.title}</h3>
            <ul className={styles.linksList}>
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.to}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} FryTown. All rights reserved.</p>
      </div>
    </footer>
  );
}
