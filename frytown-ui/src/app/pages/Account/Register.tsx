import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaPhone,
  FaUser,
} from 'react-icons/fa';
import { frytownApi, type AuthResponse } from '../../api/frytownApi';
import styles from './Register.module.css';

const AUTH_STORAGE_KEY = 'frytown-auth-v1';
const AUTH_SESSION_CHANGED_EVENT = 'frytown-auth-session-changed';

function saveAuthSession(auth: AuthResponse) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      id: auth.id,
      email: auth.email,
      name: auth.name,
      phone: auth.phone,
      token: auth.token,
      refreshToken: auth.refreshToken,
      role: auth.role,
      emailVerified: auth.emailVerified,
    })
  );
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('noScroll');
    document.body.classList.add('noScroll');

    return () => {
      document.documentElement.classList.remove('noScroll');
      document.body.classList.remove('noScroll');
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
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
    else if (formData.fullName.trim().length < 3) nextErrors.fullName = 'Name must be at least 3 characters';

    if (!formData.email) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Please enter a valid email address';

    if (!formData.phone) nextErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s-]{10,20}$/.test(formData.phone)) nextErrors.phone = 'Please enter a valid phone number';

    if (!formData.password) nextErrors.password = 'Password is required';
    else if (formData.password.length < 8) nextErrors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const authResponse = await frytownApi.register({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      saveAuthSession(authResponse);
      navigate('/', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setSubmitMessage(message || 'Could not create your account right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = submitMessage.startsWith('Account created');

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Join FryTown</h2>
          <p className={styles.heroSubtitle}>
            Create an account for faster checkout, saved favorites, and FryTown rewards.
          </p>

          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Exclusive offers and coupon drops</li>
            <li><FaCheckCircle /> Save addresses and reorder faster</li>
            <li><FaCheckCircle /> Earn points and redeem rewards</li>
          </ul>

          <div className={styles.heroGlow} />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Sign Up</h1>
          </div>

          <div className={styles.socialAuth}>
            <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
              <FaGoogle /> Sign up with Google
            </button>
            <button type="button" className={`${styles.socialButton} ${styles.facebookButton}`}>
              <FaFacebook /> Sign up with Facebook
            </button>
          </div>

          <div className={styles.divider}><span>or</span></div>

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
                  autoComplete="name"
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
                  autoComplete="email"
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
                  autoComplete="tel"
                />
              </div>
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password *"
                  className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
                  autoComplete="new-password"
                />
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              <div className={styles.passwordHint}>Use 8+ characters, include at least 1 number</div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password *"
                  className={`${styles.inputField} ${errors.confirmPassword ? styles.inputError : ''}`}
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          </form>

          <div className={styles.loginLink}>
            Already have an account? <Link to="/account/login">Log in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
