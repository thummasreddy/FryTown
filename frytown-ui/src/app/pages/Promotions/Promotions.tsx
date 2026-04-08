import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import OriginalFries from '../../assets/Original_French_Fries.png';
import CurlyFries from '../../assets/Curly_Fries.png';
import WaffleFries from '../../assets/Waffle French Fries.png';
import MangoLemonade from '../../assets/Mango_lemonade.png';
import CocaCola from '../../assets/Coca-Cola.png';
import CheeseDip from '../../assets/Cheese Dip.png';
import styles from './Promotions.module.css';

type PromoTab = 'combos' | 'offers';

interface CountdownTimer {
  hours: number;
  minutes: number;
  seconds: number;
}

interface PromoCard {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  badge: string;
}

interface PromotionsProps {
  initialTab?: PromoTab;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const getPromoTabFromPath = (pathname: string): PromoTab | null => {
  const slug = pathname.split('/').pop() ?? '';

  if (slug === 'combos' || slug === 'offers') {
    return slug;
  }

  return null;
};

const comboCards: PromoCard[] = [
  {
    id: 'family-feast',
    name: 'Family Feast',
    description: 'Two regular fries, four drinks, and two signature dips for group sharing.',
    price: 299,
    compareAt: 360,
    image: OriginalFries,
    badge: 'Best Value',
  },
  {
    id: 'after-school-box',
    name: 'After School Box',
    description: 'Curly fries, two lemonades, and a cheese dip built for quick pickup.',
    price: 219,
    compareAt: 270,
    image: CurlyFries,
    badge: 'Popular',
  },
  {
    id: 'weekend-crunch',
    name: 'Weekend Crunch',
    description: 'Waffle fries, Coke, mango lemonade, and a dip trio for weekend orders.',
    price: 259,
    compareAt: 315,
    image: WaffleFries,
    badge: 'Limited Run',
  },
];

const offerCards: PromoCard[] = [
  {
    id: 'mango-combo-upgrade',
    name: 'Mango Upgrade',
    description: 'Add mango lemonade to any fries order at a promotional bundle price.',
    price: 45,
    compareAt: 65,
    image: MangoLemonade,
    badge: 'Bundle',
  },
  {
    id: 'drink-pairing',
    name: 'Double Drink Pairing',
    description: 'Pair two canned drinks with any combo for less than individual pricing.',
    price: 69,
    compareAt: 80,
    image: CocaCola,
    badge: 'Today Only',
  },
  {
    id: 'dip-flight',
    name: 'Dip Flight',
    description: 'Cheese, garlic mayo, and mint chutney at a bundled sampling price.',
    price: 49,
    compareAt: 60,
    image: CheeseDip,
    badge: 'Fan Favorite',
  },
];

export default function Promotions({ initialTab = 'combos' }: PromotionsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const activeTab = getPromoTabFromPath(location.pathname) ?? initialTab;
  const [countdown, setCountdown] = useState<CountdownTimer>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;

        if (totalSeconds <= 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        const nextTotal = totalSeconds - 1;
        return {
          hours: Math.floor(nextTotal / 3600),
          minutes: Math.floor((nextTotal % 3600) / 60),
          seconds: nextTotal % 60,
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const handleTabChange = (tab: PromoTab) => {
    navigate(`/promotions/${tab}`);
  };

  const handleAddToCart = (item: PromoCard) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      type: 'regular',
    });
  };

  const cards = activeTab === 'combos' ? comboCards : offerCards;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>Launch Offers</span>
          <h1 className={styles.heroTitle}>Promotions built for quick decisions and higher basket size.</h1>
          <p className={styles.heroText}>
            Bundle high-performing fries, beverages, and dips into clear offers that feel premium without
            looking gimmicky.
          </p>
          <div className={styles.heroMeta}>
            <div className={styles.heroStat}>
              <strong>3</strong>
              <span>featured bundles</span>
            </div>
            <div className={styles.heroStat}>
              <strong>Daily</strong>
              <span>offer rotation</span>
            </div>
            <div className={styles.heroStat}>
              <strong>Fast</strong>
              <span>cart-ready pricing</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.tabList}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'combos' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('combos')}
        >
          Meal Combos
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'offers' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('offers')}
        >
          Add-On Offers
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{activeTab === 'combos' ? 'Featured combos' : 'Short-window offers'}</h2>
            <p className={styles.intro}>
              {activeTab === 'combos'
                ? 'These bundles are positioned for group ordering, lunch rush, and family purchase intent.'
                : 'These promotions are designed to lift average order value without slowing checkout.'}
            </p>
          </div>
          <div className={styles.countdown}>
            <span className={styles.countdownLabel}>Offer refresh in</span>
            <div className={styles.countdownValues}>
              <span>{String(countdown.hours).padStart(2, '0')}h</span>
              <span>{String(countdown.minutes).padStart(2, '0')}m</span>
              <span>{String(countdown.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          {cards.map((card) => (
            <article key={card.id} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <span className={styles.cardTag}>{card.badge}</span>
                <img className={styles.cardImage} src={card.image} alt={card.name} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.name}</h3>
                <p className={styles.cardText}>{card.description}</p>
                <div className={styles.priceRow}>
                  <div>
                    <span className={styles.price}>{formatPrice(card.price)}</span>
                    {card.compareAt && <span className={styles.oldPrice}>{formatPrice(card.compareAt)}</span>}
                  </div>
                  <button type="button" className={styles.actionButton} onClick={() => handleAddToCart(card)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className={styles.highlightPanel}>
        <h2>What still needs product work before launch</h2>
        <ul className={styles.highlightList}>
          <li>Promotion eligibility rules should eventually come from CMS or backend data instead of hardcoded copy.</li>
          <li>Checkout needs a real promo application flow so pricing logic stays consistent across cart and payment.</li>
          <li>Analytics events should be added for promo impressions, clicks, and cart conversions.</li>
        </ul>
      </aside>
    </main>
  );
}
