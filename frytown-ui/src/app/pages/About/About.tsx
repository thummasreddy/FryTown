import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroImage from '../../assets/FryTown_Classic_Fries.png';
import StoryImage from '../../assets/FryTown_Curly_Fries.png';
import SignatureImage from '../../assets/FryTown_Waffle_Fries.png';
import BrandImage from '../../assets/Brand_FryTown.png';
import styles from './About.module.css';

const highlights = [
  {
    title: 'Easy to order',
    description: 'A focused menu keeps first visits simple while still giving regulars plenty of variety.',
  },
  {
    title: 'Built for mix-and-match cravings',
    description: 'Fries, dips, drinks, and specialty trays work together naturally for solo orders and group bundles.',
  },
  {
    title: 'Memorable by design',
    description: 'From the name to the visuals, FryTown aims to feel playful, bold, and instantly recognizable.',
  },
];

const standards = [
  'Classic fries, curly fries, wedges, tots, sweet potato fries, and waffle cuts',
  'Dip pairings and drinks that make add-ons feel easy',
  'Menu names and categories guests can scan quickly',
  'A warm brand style built around comfort, crunch, and color',
];

export default function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroCopy}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>About FryTown</span>
          <h1>A fries-first brand built for quick cravings and repeat visits.</h1>
          <p>
            FryTown keeps the menu focused on crispy favorites, loaded upgrades, and easy add-ons so the experience feels simple from the first click.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/menu/classic">
              Explore menu
            </Link>
            <Link className={styles.secondaryButton} to="/franchising/why">
              Franchise overview
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src={HeroImage}
            alt="FryTown classic fries"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>Why FryTown</span>
          <h2>A focused menu leaves more room for flavor.</h2>
          <p>
            Instead of trying to do everything, FryTown leans into the combinations guests reach for most: crisp fries, bold toppings, easy dips, and drinks that round out the order.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyText}>
          <span className={styles.sectionLabel}>Our Approach</span>
          <h2>One category, plenty of ways to crave it.</h2>
          <p>
            FryTown works best when every part of the menu supports the same idea: hot fries, easy pairings, and just enough variety to keep the experience fun without making it confusing.
          </p>
          <ul className={styles.standardList}>
            {standards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.storyVisual}>
          <img
            src={StoryImage}
            alt="Curly fries from FryTown"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className={styles.signatureSection}>
        <div className={styles.signatureVisual}>
          <img
            src={SignatureImage}
            alt="FryTown waffle fries"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.signatureCopy}>
          <span className={styles.sectionLabel}>What You Can Expect</span>
          <h2>Fast decisions, strong flavors, and plenty of variety.</h2>
          <p>
            Whether you are ordering for one or building a shareable combo, FryTown is designed to feel clear, upbeat, and satisfying from the hero section to the final add-on.
          </p>
          <div className={styles.statRow}>
            <div className={styles.statCard}>
              <strong>5</strong>
              <span>menu sections</span>
            </div>
            <div className={styles.statCard}>
              <strong>7</strong>
              <span>fry styles</span>
            </div>
            <div className={styles.statCard}>
              <strong>6</strong>
              <span>signature dips</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <img
            className={styles.brandMark}
            src={BrandImage}
            alt="FryTown brand logo"
            loading="lazy"
            decoding="async"
          />
          <h2>Ready to plan your FryTown run?</h2>
          <p>
            Start with the menu, build your own box, or check the latest bundles while online ordering moves toward launch.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} to="/promotions/offers">
            View offers
          </Link>
          <Link className={styles.secondaryButton} to="/account/register">
            Join launch updates
          </Link>
        </div>
      </section>
    </main>
  );
}
