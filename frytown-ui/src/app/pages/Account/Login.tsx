import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import styles from './Register.module.css';

const LAUNCH_INTEREST_STORAGE_KEY = 'frytown-launch-interest-v1';

export default function Login() {
  const [savedName] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    try {
      const rawValue = window.localStorage.getItem(LAUNCH_INTEREST_STORAGE_KEY);

      if (!rawValue) {
        return '';
      }

      const parsedValue = JSON.parse(rawValue);

      if (typeof parsedValue?.fullName === 'string') {
        return parsedValue.fullName;
      }
    } catch {
      // Ignore storage read failures and keep the page usable.
    }

    return '';
  });

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Member Accounts Are Almost Ready</h2>
          <p className={styles.heroSubtitle}>
            We are still finishing the live sign-in flow for saved carts, launch offers, and faster checkout.
          </p>

          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Save favorites and addresses once accounts launch</li>
            <li><FaCheckCircle /> Unlock launch-only offers and rewards</li>
            <li><FaCheckCircle /> Move from cart to checkout faster</li>
          </ul>

          <div className={styles.heroGlow} />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Member Sign-In Coming Soon</h1>
            <p>Use the launch updates page to stay in the loop while online accounts are still in preview.</p>
          </div>

          <div className={`${styles.statusBox} ${styles.previewNote}`}>
            Online sign-in is not live yet. For now, you can browse the menu, save your cart in this browser, and join launch updates.
          </div>

          {savedName && (
            <div className={`${styles.statusBox} ${styles.successBox}`}>
              {savedName}, you are already saved for launch updates in this browser.
            </div>
          )}

          <div className={styles.actionStack}>
            <Link to="/account/register" className={styles.submitButton}>
              Join Launch Updates
              <FaArrowRight className={styles.buttonIcon} />
            </Link>
            <Link to="/menu/classic" className={styles.secondaryAction}>
              Browse the Menu
            </Link>
            <Link to="/account/forgot-password" className={styles.secondaryAction}>
              Password Reset Preview
            </Link>
          </div>

          <div className={styles.loginLink}>
            Want the live sign-in flow first? <Link to="/account/register">Leave your details here</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
