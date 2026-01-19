import { HeroCarousel } from '../../components/home/HeroCarousel';
import { SocialProof } from '../../components/home/SocialProof';
import Footer from '../../components/layout/Footer/Footer';
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
              Become a part of the FryTown franchise family and bring our delicious flavors to your community.
            </p>
            <a href="/franchising" className={styles.ctaButton}>
              Franchise Now
            </a>
          </div>
          <div className={styles.ctaImageContainer}>
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              height: '400px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <span style={{ color: '#9ca3af' }}>Franchise Opportunity Image</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} style={{ backgroundColor: '#f9fafb' }}>
        <div className={`${styles.ctaContent} ${styles.reverse} ${styles.animateFadeInUp}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>SHAKE UP YOUR TASTEBUDS</h2>
            <p className={styles.ctaSubtitle}>
              Discover our mouth-watering menu and experience the perfect blend of flavors.
            </p>
            <a href="/menu" className={styles.ctaButton}>
              Order Now
            </a>
          </div>
          <div className={styles.ctaImageContainer}>
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              height: '400px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <span style={{ color: '#9ca3af' }}>Menu Highlights Image</span>
            </div>
          </div>
        </div>
      </section>

      <SocialProof />
      <Footer />
    </main>
  );
}
