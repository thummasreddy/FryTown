import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import classicFries from '../../assets/FryTown_Classic_Fries.png';
import curlyFries from '../../assets/FryTown_Curly_Fries.png';
import waffleFries from '../../assets/FryTown_Waffle_Fries.png';
import wedges from '../../assets/FryTown_Potato_Wedges.png';
import taterTots from '../../assets/FryTown_Tater_tots.png';
import sweetPotato from '../../assets/FryTown_Sweet_Potato_Fries.png';
import styles from './SocialProof.module.css';

export function SocialProof() {
  const posts = [
    { id: 1, image: classicFries, alt: 'Classic fries', likes: 'Top pick' },
    { id: 2, image: curlyFries, alt: 'Curly fries', likes: 'Most shared' },
    { id: 3, image: waffleFries, alt: 'Waffle fries', likes: 'Combo ready' },
    { id: 4, image: wedges, alt: 'Potato wedges', likes: 'New look' },
    { id: 5, image: taterTots, alt: 'Tater tots', likes: 'Snack hit' },
    { id: 6, image: sweetPotato, alt: 'Sweet potato fries', likes: 'Seasonal' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.subtitle}>Guest Signals</span>
          <h2 className={styles.title}>#FlavorTheMoment</h2>
          <p className={styles.description}>
            This section now reinforces the actual FryTown offer instead of showing unrelated food imagery.
          </p>

          <Link to="/promotions/offers" className={styles.instagramButton}>
            See launch offers
          </Link>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.gridItem}>
              <div className={styles.imageContainer}>
                <img src={post.image} alt={post.alt} className={styles.image} loading="lazy" />
                <div className={styles.overlay}>
                  <div className={styles.likeCount}>
                    <div className={styles.likeBadge}>
                      <FaHeart className={styles.likeIcon} />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <div className={styles.imageInfo}>
                    <p className={styles.imageTitle}>{post.alt}</p>
                    <p className={styles.imageAuthor}>FryTown favorite {post.id}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>Use this area later for live reviews, social proof, or delivery-platform ratings.</p>
          <p>For now it acts as branded proof instead of misleading placeholder content.</p>
        </footer>
      </div>
    </section>
  );
}
