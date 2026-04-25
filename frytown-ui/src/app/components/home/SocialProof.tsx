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
    { id: 3, image: waffleFries, alt: 'Waffle fries', likes: 'Dip favorite' },
    { id: 4, image: wedges, alt: 'Potato wedges', likes: 'Crisp bite' },
    { id: 5, image: taterTots, alt: 'Tater tots', likes: 'Snack hit' },
    { id: 6, image: sweetPotato, alt: 'Sweet potato fries', likes: 'Sweet pick' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.subtitle}>Guest Favorites</span>
          <h2 className={styles.title}>Most-Loved Picks</h2>
          <p className={styles.description}>
            A quick look at the fries, tots, and sides guests are most likely to come back for.
          </p>

          <Link to="/menu/specialty" className={styles.instagramButton}>
            Explore Popular Picks
          </Link>
        </header>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.gridItem}>
              <div className={styles.imageContainer}>
                <img
                  src={post.image}
                  alt={post.alt}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                />
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
          <p>From classic cuts to crisp sides, these are the menu anchors that keep FryTown easy to crave.</p>
          <p>Pair them with dips and drinks to build your own go-to order.</p>
        </footer>
      </div>
    </section>
  );
}
