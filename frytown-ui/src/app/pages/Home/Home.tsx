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
              <img 
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Franchise Opportunity" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
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
              width: '100%',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" 
                alt="Delicious Menu Highlights" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  backgroundColor: '#f3f4f6'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1504674900247-087703934569?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80';
                }}
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
