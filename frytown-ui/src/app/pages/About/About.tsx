
import { FaUtensils, FaMapMarkerAlt, FaAward, FaStar, FaRegStar, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>Potato Perfection</h1>
            <p className={styles.heroSubtitle}>Celebrating the Humble Potato in All Its Golden, Crispy Glory</p>
          </motion.div>
        </div>
      </section>

      {/* Our Heritage Section */}
      <section className={styles.section}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.sectionHeader}
        >
          <h2 className={styles.sectionTitle}>From Farm to Fryer</h2>
          <p className={styles.sectionSubtitle}>
            At FryTown, we're passionate about potatoes in all their glorious forms. Sourced from local farms, our potatoes are hand-selected for quality and freshness, 
            then transformed into crispy, golden perfection using traditional recipes with a modern twist. Every bite is a celebration of flavor, texture, and the simple joy of perfectly cooked potatoes.
          </p>
        </motion.div>

        <div className={styles.featureGrid}>
          <motion.div 
            whileHover={{ y: -10 }}
            className={styles.featureCard}
          >
            <div className={styles.iconWrapper}>
              <FaUtensils className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Potato Perfection</h3>
            <p className={styles.featureDescription}>From classic fries to innovative potato creations, each dish is crafted to highlight the natural flavor and perfect texture of our golden potatoes.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className={styles.featureCard}
          >
            <div className={styles.iconWrapper}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Farm Fresh</h3>
            <p className={styles.featureDescription}>We partner with local farmers to bring you the freshest, highest quality potatoes, ensuring every bite is packed with natural flavor and perfect texture.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className={styles.featureCard}
          >
            <div className={styles.iconWrapper}>
              <FaAward className={styles.icon} />
            </div>
            <h3 className={styles.featureTitle}>Golden Standard</h3>
            <p className={styles.featureDescription}>Our commitment to quality means every potato is perfectly cooked to a golden crisp, delivering the ultimate satisfaction in every bite.</p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className={styles.historySection}>
        <div className={styles.historyContainer}>
          <div className={styles.historyContent}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.historyText}
            >
              <span className={styles.sinceBadge}>Since 1995</span>
              <h2 className={styles.historyTitle}>A Golden <span className={styles.highlight}>Legacy</span> of Flavor</h2>
              <div className={styles.underline}></div>
              <p className={styles.historyDescription}>
                Our journey began with a simple love for perfectly cooked potatoes. What started as a small food cart in Hyderabad has grown into a beloved destination for potato lovers. We've taken the humble potato and transformed it into culinary art, combining traditional techniques with innovative flavors.
              </p>
              <p className={styles.historyDescription}>
                Each dish at FryTown tells a story of passion and perfection. From our signature crispy golden fries to our loaded potato creations, we've spent years perfecting every recipe. Our commitment to quality means we source only the finest potatoes and prepare them with the same care and attention we've had since day one.
              </p>
              <button className={styles.menuButton}>
                Explore Our Menu
                <FaArrowRight className={styles.buttonIcon} />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={styles.historyImage}
            >
              <div className={styles.imageOverlay}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* Testimonials Section */}
      <section className={styles.testimonialSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Testimonials</span>
          <h2 className={styles.sectionTitle}>Crispy <span className={styles.highlight}>Reviews</span></h2>
          <p className={styles.sectionSubtitle}>
            Don't just take our word for it. Here's what potato lovers are saying about their FryTown experience.
          </p>
        </div>
        
        <div className={styles.testimonialGrid}>
          {[
            { 
              quote: "The truffle fries are absolutely to die for! Perfectly crispy on the outside, fluffy on the inside, and the truffle oil is just the right amount.", 
              author: { name: "Priya K.", title: "Potato Connoisseur" },
              rating: 5
            },
            { 
              quote: "I've never had sweet potato fries this good! The perfect balance of sweet and savory with that irresistible crunch.", 
              author: { name: "Rahul M.", title: "Regular Customer" },
              rating: 5
            },
            { 
              quote: "The loaded potato skins are a meal in themselves! Generous toppings and the potatoes are cooked to perfection every time.", 
              author: { name: "Ananya S.", title: "Food Blogger" },
              rating: 5
            },
            { 
              quote: "As a potato enthusiast, I can confidently say FryTown serves the crispiest, most flavorful fries in the city. The seasoning is spot on!", 
              author: { name: "Vikram P.", title: "Potato Lover" },
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.testimonialCard}
            >
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  i < testimonial.rating ? 
                    <FaStar key={i} className="text-amber-400 inline-block mx-0.5" /> : 
                    <FaRegStar key={i} className="text-amber-400 inline-block mx-0.5" />
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.quote}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  {testimonial.author.name.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>{testimonial.author.name}</p>
                  <p className={styles.authorTitle}>{testimonial.author.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Craving <span className={styles.highlight}>Golden Goodness</span>?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join the FryTown family and experience potato perfection in every bite. Whether you're a classic fries lover or an adventurous foodie, we've got something to satisfy every craving.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              Order Online
              <FaShoppingCart className={styles.buttonIcon} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
