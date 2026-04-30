import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaEnvelope, FaFacebook, FaGoogle, FaLock } from 'react-icons/fa';
import { frytownApi, type AuthResponse } from '../../api/frytownApi';
import styles from './Register.module.css';

const AUTH_STORAGE_KEY = 'frytown-auth-v1';
const REMEMBER_EMAIL_KEY = 'frytown-remember-email';

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
}

function readRememberedEmail() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(REMEMBER_EMAIL_KEY) ?? '';
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: readRememberedEmail(),
    password: '',
    rememberMe: Boolean(readRememberedEmail()),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (errors.submit) setErrors((prev) => ({ ...prev, submit: '' }));
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.email) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) nextErrors.email = 'Please enter a valid email address';

    if (!formData.password) nextErrors.password = 'Password is required';
    else if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const authResponse = await frytownApi.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      saveAuthSession(authResponse);

      if (formData.rememberMe) {
        window.localStorage.setItem(REMEMBER_EMAIL_KEY, formData.email.trim());
      } else {
        window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      setSubmitMessage(`Welcome back${authResponse.name ? `, ${authResponse.name}` : ''}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setErrors({
        submit: message || 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Welcome Back</h2>
          <p className={styles.heroSubtitle}>
            Log in to access your account, track orders, and manage your FryTown rewards.
          </p>

          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Track your orders in real time</li>
            <li><FaCheckCircle /> Save your favorite menu items</li>
            <li><FaCheckCircle /> Get personalized offers and rewards</li>
          </ul>

          <div className={styles.heroGlow} />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Login</h1>
          </div>

          <div className={styles.socialAuth}>
            <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
              <FaGoogle /> Continue with Google
            </button>
            <button type="button" className={`${styles.socialButton} ${styles.facebookButton}`}>
              <FaFacebook /> Continue with Facebook
            </button>
          </div>

          <div className={styles.divider}><span>or</span></div>

          <form onSubmit={handleSubmit} className={styles.registerForm}>
            {submitMessage && (
              <div className={`${styles.statusBox} ${styles.successBox}`}>
                {submitMessage}
              </div>
            )}

            {errors.submit && <div className={`${styles.statusBox} ${styles.errorBox}`}>{errors.submit}</div>}

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
                  autoComplete="username"
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password *"
                  className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              <div className={styles.rememberForgot}>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Remember me
                </label>
                <Link to="/account/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Log In'}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          </form>

          <div className={styles.loginLink}>
            Don't have an account? <Link to="/account/register">Sign up</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
