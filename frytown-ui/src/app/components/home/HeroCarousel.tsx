import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../../../app/pages/Home/Home.module.css';

const slides = [
  {
    id: 1,
    title: 'Signature Fries, Better Presented',
    subtitle: 'Guide guests into the strongest menu section instead of generic hero copy.',
    cta: 'Explore Classics',
    ctaLink: '/menu/classic',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Build Your Own Box',
    subtitle: 'The configurator now routes correctly and supports a cleaner cart journey.',
    cta: 'Build Now',
    ctaLink: '/menu/build-your-fries',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80',
  },
  {
    id: 3,
    title: 'Launch Offers That Convert',
    subtitle: 'Promotions now point to working routes with more credible launch-ready content.',
    cta: 'View Offers',
    ctaLink: '/promotions/offers',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
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
      aria-label="Featured promotions"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.heroSlides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.heroSlide} ${index === currentSlide ? styles.active : ''}`}
            aria-hidden={index !== currentSlide}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
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
