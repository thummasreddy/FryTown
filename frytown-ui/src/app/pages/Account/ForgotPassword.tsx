import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import styles from './Register.module.css';

export default function ForgotPassword() {
  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Account Recovery Opens with Member Accounts</h2>
          <p className={styles.heroSubtitle}>
            Password reset will be available once live sign-in launches alongside saved carts, offers, and member checkout.
          </p>
          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Reset links will work once live accounts are connected</li>
            <li><FaCheckCircle /> Your cart can still stay saved in this browser today</li>
            <li><FaCheckCircle /> Launch updates will tell you when recovery goes live</li>
          </ul>
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Password Reset Preview</h1>
            <p>The live reset flow is still being connected.</p>
          </div>

          <div className={`${styles.statusBox} ${styles.previewNote}`}>
            For now, use the launch updates page instead of expecting a real email reset flow. This keeps the experience honest while the account backend is still in preview.
          </div>

          <div className={styles.actionStack}>
            <Link to="/account/register" className={styles.submitButton}>
              Join Launch Updates
              <FaArrowRight className={styles.buttonIcon} />
            </Link>
            <Link to="/account/login" className={styles.secondaryAction}>
              Back to Member Preview
            </Link>
          </div>

          <div className={styles.loginLink}>
            Prefer to keep browsing? <Link to="/menu/classic">Head back to the menu</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
