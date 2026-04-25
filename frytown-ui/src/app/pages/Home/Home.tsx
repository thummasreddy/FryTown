import { Link } from 'react-router-dom';
import { HeroCarousel } from '../../components/home/HeroCarousel';
import { SocialProof } from '../../components/home/SocialProof';
import Footer from '../../components/layout/Footer/Footer';
import brandLogo from '../../assets/Brand_FryTown.png';
import waffleFries from '../../assets/FryTown_Waffle_Fries.png';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <HeroCarousel />

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaContent} ${styles.animateFadeInUp}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>FRIES FIRST, FLAVOR FORWARD</h2>
            <p className={styles.ctaSubtitle}>
              Explore crispy classics, loaded favorites, and easy add-ons built for quick cravings and shareable orders.
            </p>
            <Link to="/menu/classic" className={styles.ctaButton}>
              See the Menu
            </Link>
          </div>
          <div className={styles.ctaImageContainer}>
            <div className={styles.mediaCard}>
              <img
                className={styles.mediaLogo}
                src={brandLogo}
                alt="FryTown brand mark"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.ctaSection} ${styles.altSection}`}>
        <div className={`${styles.ctaContent} ${styles.reverse} ${styles.animateFadeInUp}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>BRING FRYTOWN TO YOUR CITY</h2>
            <p className={styles.ctaSubtitle}>
              Review the concept, guest appeal, and early partnership details if you are exploring future locations.
            </p>
            <Link to="/franchising/why" className={styles.ctaButton}>
              Explore Franchising
            </Link>
          </div>
          <div className={styles.ctaImageContainer}>
            <div className={styles.mediaCard}>
              <img
                className={styles.mediaImage}
                src={waffleFries}
                alt="FryTown waffle fries"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <SocialProof />
      <Footer />
    </main>
  );
}
