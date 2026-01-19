import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">FryTown</h3>
            <p className="text-gray-400 mb-6">
              Serving up crispy, delicious meals since 2023. Join us for an unforgettable flavor experience!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  to={social.url}
                  aria-label={social.name}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon 
                    icon={
                      social.icon === 'facebook' ? faFacebook :
                      social.icon === 'twitter' ? faTwitter :
                      social.icon === 'instagram' ? faInstagram :
                      faYoutube
                    } 
                    className="text-2xl"
                  />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.to} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} FryTown. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
