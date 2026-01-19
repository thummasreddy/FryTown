import { FaInstagram, FaHeart } from 'react-icons/fa';
import styles from './SocialProof.module.css';

export function SocialProof() {
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', alt: 'Delicious burger', likes: '1.2k' },
    { id: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', alt: 'Happy customer', likes: '856' },
    { id: 3, image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927', alt: 'Tasty fries', likes: '2.3k' },
    { id: 4, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', alt: 'Pizza time', likes: '1.8k' },
    { id: 5, image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc', alt: 'Family dinner', likes: '1.5k' },
    { id: 6, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', alt: 'BBQ special', likes: '2.1k' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.subtitle}>Community Love</span>
          <h2 className={styles.title}>#FlavorTheMoment</h2>
          <p className={styles.description}>
            Join our community of food lovers! Share your FryTown moments with us and get featured.
          </p>
          
          <a 
            href="https://instagram.com/explore/tags/flavorthemoment" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.instagramButton}
          >
            <FaInstagram className={styles.instagramIcon} />
            Follow @FryTownEats
          </a>
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
                    <p className={styles.imageAuthor}>by @foodlover{post.id}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>Join thousands of foodies sharing their #FlavorTheMoment</p>
          <p>Tag us <span className={styles.footerHighlight}>@FryTownEats</span> for a chance to be featured!</p>
        </footer>
      </div>
    </section>
  );
}
