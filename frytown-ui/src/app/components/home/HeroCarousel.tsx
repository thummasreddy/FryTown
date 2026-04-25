import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../../../app/pages/Home/Home.module.css';

const slides = [
  {
    id: 1,
    title: 'Crispy Classics, Done Right',
    subtitle: 'Start with the signatures: classic fries, curly fries, waffle cuts, and craveable sides.',
    cta: 'Explore Classics',
    ctaLink: '/menu/classic',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Golden fries served hot and ready',
  },
  {
    id: 2,
    title: 'Build Your Perfect Fry Box',
    subtitle: 'Pick your size, choose your fry style, and finish with one or two bold flavors.',
    cta: 'Build Your Box',
    ctaLink: '/menu/build-your-fries',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
    alt: 'Loaded fries styled as a customizable meal',
  },
  {
    id: 3,
    title: 'Combos Worth Sharing',
    subtitle: 'Mix fries, drinks, and dips into easy bundles for lunch breaks, snack runs, and group orders.',
    cta: 'View Offers',
    ctaLink: '/promotions/offers',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'A tray of shareable snacks and drinks',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      className={styles.heroCarousel}
      aria-label="Featured FryTown highlights"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.heroSlides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''}`}
            aria-hidden={index !== currentSlide}
          >
            <img
              className={styles.heroSlideImage}
              src={slide.image}
              alt={slide.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className={styles.heroSlideContent}>
              <h1 className={styles.heroSlideTitle}>{slide.title}</h1>
              <p className={styles.heroSlideSubtitle}>{slide.subtitle}</p>
              <Link to={slide.ctaLink} className={styles.heroSlideButton} aria-label={`${slide.cta} - ${slide.title}`}>
                {slide.cta}
                <FaArrowRight className={styles.arrowIcon} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.heroDots}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`${styles.heroDot} ${index === currentSlide ? styles.active : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>

      <button
        type="button"
        className={`${styles.heroNav} ${styles.heroNavPrev}`}
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.heroNav} ${styles.heroNavNext}`}
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        <FaChevronRight aria-hidden="true" />
      </button>
    </section>
  );
}
