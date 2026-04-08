import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroImage from '../../assets/FryTown_Classic_Fries.png';
import StoryImage from '../../assets/FryTown_Curly_Fries.png';
import SignatureImage from '../../assets/FryTown_Waffle_Fries.png';
import BrandImage from '../../assets/Brand_FryTown.png';
import styles from './About.module.css';

const highlights = [
  {
    title: 'Focused menu',
    description: 'A concise fries-first menu makes the brand easy to understand and easy to order from.',
  },
  {
    title: 'Strong visual identity',
    description: 'The brand now leans into a clearer premium-fast-casual presentation instead of generic food-site patterns.',
  },
  {
    title: 'Launch-ready storytelling',
    description: 'The page speaks to guests, partners, and operators without broken imagery or filler copy.',
  },
];

const standards = [
  'Crisp-first fry prep and fast assembly',
  'Sauce pairings and beverage add-ons built for upsell',
  'Consistent packaging, signage, and menu naming',
  'A tighter brand voice across every public page',
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
          <h1>Built around one idea: fries should feel memorable, not generic.</h1>
          <p>
            FryTown is positioned as a specialist concept with stronger visual identity, tighter messaging,
            and a menu structure that is easier to scale and easier to buy from.
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
          <img src={HeroImage} alt="FryTown classic fries" />
        </motion.div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>What Changed</span>
          <h2>The site now presents a more disciplined brand story.</h2>
          <p>
            The earlier version mixed placeholder visuals, inconsistent messaging, and broken assets. This page
            now frames FryTown with clearer positioning and a more credible launch narrative.
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
          <span className={styles.sectionLabel}>Brand Story</span>
          <h2>A fries-first concept with sharper commercial potential.</h2>
          <p>
            The strongest restaurant brands usually win by doing a small number of things extremely well.
            FryTown works best when it leans into that principle: bold fries, smart pairings, and a menu that
            stays recognisable from the first glance.
          </p>
          <ul className={styles.standardList}>
            {standards.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.storyVisual}>
          <img src={StoryImage} alt="Curly fries from FryTown" />
        </div>
      </section>

      <section className={styles.signatureSection}>
        <div className={styles.signatureVisual}>
          <img src={SignatureImage} alt="FryTown waffle fries" />
        </div>
        <div className={styles.signatureCopy}>
          <span className={styles.sectionLabel}>Signature Experience</span>
          <h2>Better launch quality comes from consistency, not decoration.</h2>
          <p>
            That means stronger navigation, more believable content, cleaner visual hierarchy, and no dead-end
            routes pretending to be finished pages.
          </p>
          <div className={styles.statRow}>
            <div className={styles.statCard}>
              <strong>5</strong>
              <span>menu sections</span>
            </div>
            <div className={styles.statCard}>
              <strong>1</strong>
              <span>clear brand direction</span>
            </div>
            <div className={styles.statCard}>
              <strong>0</strong>
              <span>placeholder visuals left here</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCopy}>
          <img className={styles.brandMark} src={BrandImage} alt="FryTown brand logo" />
          <h2>Ready for the next round of improvements.</h2>
          <p>
            The site is stronger now, but before public launch it still needs real business inputs for contact,
            checkout, analytics, and franchise operations data.
          </p>
        </div>
        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} to="/promotions/offers">
            View offers
          </Link>
          <Link className={styles.secondaryButton} to="/account/register">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
