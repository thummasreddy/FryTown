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
            <h2 className={styles.ctaTitle}>JOIN OUR FAMILY</h2>
            <p className={styles.ctaSubtitle}>
              Present FryTown as a sharper, easier-to-scale concept with cleaner storytelling and stronger launch intent.
            </p>
            <Link to="/franchising/why" className={styles.ctaButton}>
              Franchise Now
            </Link>
          </div>
          <div className={styles.ctaImageContainer}>
            <div className={styles.mediaCard}>
              <img className={styles.mediaLogo} src={brandLogo} alt="FryTown brand mark" />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.ctaSection} ${styles.altSection}`}>
        <div className={`${styles.ctaContent} ${styles.reverse} ${styles.animateFadeInUp}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>SHAKE UP YOUR TASTEBUDS</h2>
            <p className={styles.ctaSubtitle}>
              Discover the improved menu flow across classics, specialty fries, add-ons, and promotions.
            </p>
            <Link to="/menu/classic" className={styles.ctaButton}>
              Order Now
            </Link>
          </div>
          <div className={styles.ctaImageContainer}>
            <div className={styles.mediaCard}>
              <img className={styles.mediaImage} src={waffleFries} alt="FryTown waffle fries" />
            </div>
          </div>
        </div>
      </section>

      <SocialProof />
      <Footer />
    </main>
  );
}
