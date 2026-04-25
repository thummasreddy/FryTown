import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../../context/useCart';
import styles from './Register.module.css';

const LAUNCH_INTEREST_STORAGE_KEY = 'frytown-launch-interest-v1';

type LaunchInterestForm = {
  fullName: string;
  email: string;
  phone: string;
};

const emptyForm: LaunchInterestForm = {
  fullName: '',
  email: '',
  phone: '',
};

function readStoredInterest(): LaunchInterestForm {
  if (typeof window === 'undefined') {
    return emptyForm;
  }

  try {
    const rawValue = window.localStorage.getItem(LAUNCH_INTEREST_STORAGE_KEY);

    if (!rawValue) {
      return emptyForm;
    }

    const parsedValue = JSON.parse(rawValue);

    return {
      fullName: typeof parsedValue?.fullName === 'string' ? parsedValue.fullName : '',
      email: typeof parsedValue?.email === 'string' ? parsedValue.email : '',
      phone: typeof parsedValue?.phone === 'string' ? parsedValue.phone : '',
    };
  } catch {
    return emptyForm;
  }
}

export default function Register() {
  const location = useLocation();
  const { cart } = useCart();
  const fromCart = (location.state as { fromCart?: boolean } | null)?.fromCart === true;
  const [formData, setFormData] = useState<LaunchInterestForm>(() => readStoredInterest());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) nextErrors.fullName = 'Name must be at least 3 characters';

    if (!formData.email) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Please enter a valid email address';

    if (!formData.phone) nextErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s-]{10,20}$/.test(formData.phone)) nextErrors.phone = 'Please enter a valid phone number';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.localStorage.setItem(LAUNCH_INTEREST_STORAGE_KEY, JSON.stringify(formData));

      setSubmitMessage(
        fromCart && cart.itemCount > 0
          ? 'Thanks. Your details and current cart are saved in this browser while online ordering is still in preview.'
          : 'Thanks. Your launch update request is saved in this browser while member accounts are still in preview.'
      );
    } catch {
      setSubmitMessage('We could not save your details in this browser. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = submitMessage.startsWith('Thanks.');

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Be First When FryTown Goes Live</h2>
          <p className={styles.heroSubtitle}>
            Join the launch updates list so you can hear when online ordering, member perks, and checkout are ready.
          </p>

          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Hear about launch-day offers and bundle drops</li>
            <li><FaCheckCircle /> Keep your current cart ready in this browser</li>
            <li><FaCheckCircle /> Know when member accounts and ordering open</li>
          </ul>

          <div className={styles.heroGlow} />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Join Launch Updates</h1>
            <p>
              {fromCart && cart.itemCount > 0
                ? `You currently have ${cart.itemCount} item${cart.itemCount === 1 ? '' : 's'} in your cart.`
                : 'Online accounts are still in preview for now.'}
            </p>
          </div>

          <div className={`${styles.statusBox} ${styles.previewNote}`}>
            {fromCart && cart.itemCount > 0
              ? 'Online checkout is coming soon. Leave your details here and we will keep this browser ready for launch.'
              : 'This preview saves your interest locally in this browser while the live signup flow is still being connected.'}
          </div>

          <form onSubmit={handleSubmit} className={styles.registerForm}>
            {submitMessage && (
              <div className={`${styles.statusBox} ${isSuccess ? styles.successBox : styles.errorBox}`}>
                {submitMessage}
              </div>
            )}

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className={`${styles.inputField} ${errors.fullName ? styles.inputError : ''}`}
                />
              </div>
              {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className={`${styles.inputField} ${errors.phone ? styles.inputError : ''}`}
                />
              </div>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Saving Your Interest...' : 'Save My Launch Updates'}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          </form>

          <div className={styles.loginLink}>
            Looking for sign-in? <Link to="/account/login">View the member preview</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
