import { useState, useEffect } from 'react';
import styles from '../../../app/pages/Home/Home.module.css';

const slides = [
  {
    id: 1,
    title: "Experience the Crunch",
    subtitle: "Try our signature crispy fried chicken today!",
    cta: "Order Now",
    ctaLink: "/menu",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Family Meals Deal",
    subtitle: "Feed the whole family with our special combos",
    cta: "View Combos",
    ctaLink: "/combos",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80"
  },
  {
    id: 3,
    title: "Limited Time Offer",
    subtitle: "20% off all family meals this weekend",
    cta: "Get Offer",
    ctaLink: "/offers",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
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
      {/* Slides */}
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
              <a 
                href={slide.ctaLink} 
                className={styles.heroSlideButton}
                aria-label={`${slide.cta} - ${slide.title}`}
              >
                {slide.cta}
                <span className={styles.arrowIcon}>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className={styles.heroDots}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${styles.heroDot} ${index === currentSlide ? styles.active : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`${styles.heroNav} ${styles.heroNavPrev}`}
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button 
        className={`${styles.heroNav} ${styles.heroNavNext}`}
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        →
      </button>
    </section>
  );
}
